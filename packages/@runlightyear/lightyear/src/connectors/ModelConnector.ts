import {
  getSync,
  pauseSync,
  retrieveDelta,
  updateSync,
  upsertObjectBatch,
} from "../base/collection";
import { AuthConnector } from "../connectors/AuthConnector";
import { isTimeLimitExceeded } from "../base/time";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ObjectId = string;
export type ExternalId = string;

export interface ObjectMeta {
  id: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface BaseObjectData {
  [key: string]: unknown;
}

export interface BaseObject {
  id: string;
  updatedAt: string;
  isDeleted: boolean;
  data: BaseObjectData;
}

export interface BaseExternalData {
  [key: string]: unknown;
}

export interface BaseExternal {
  id: string;
  data: BaseExternalData;
}

export interface Object<ObjectData extends { [key: string]: unknown }> {
  id: string;
  updatedAt: string;
  isDeleted: boolean;
  data: ObjectData;
}

export interface ListProps {
  syncType: "FULL" | "INCREMENTAL";
  lastExternalId?: string;
  lastExternalUpdatedAt?: string;
  cursor?: string;
}

export type ObjectList<Object> = Promise<{
  objects: Array<Object>;
  cursor?: string;
}>;

export interface ReadProps {
  id: string;
}

export interface CreateBatchPropsChange<ObjectData> {
  changeId: string;
  data: ObjectData;
}

export interface CreateBatchProps<ObjectData> {
  changes: Array<CreateBatchPropsChange<ObjectData>>;
}

export interface UpdateBatchPropsChange<ObjectData> {
  changeId: string;
  externalId: ExternalId;
  data: ObjectData;
}

export interface UpdateBatchProps<ObjectData> {
  changes: Array<UpdateBatchPropsChange<ObjectData>>;
}

export interface DeleteBatchPropsChange {
  changeId: string;
  externalId: ExternalId;
}

export interface DeleteBatchProps {
  changes: Array<DeleteBatchPropsChange>;
}

// export interface FullObjectProps<Object extends BaseObject>
//   extends UpdateProps<Object> {
//   updatedAt: string;
//   isDeleted?: boolean;
// }

export interface ModelConnectorProps {
  connector: AuthConnector;
  collectionName: string;
  modelName: string;
}

export abstract class ModelConnector<
  ModelObjectData extends { [key: string]: unknown } = any,
  ModelExternalData extends { [key: string]: unknown } = any,
  ModelExternal = unknown,
  ModelListResponse = unknown
> {
  connector: AuthConnector;
  collectionName: string;
  modelName: string;

  constructor(props: ModelConnectorProps) {
    this.connector = props.connector;
    this.collectionName = props.collectionName;
    this.modelName = props.modelName;
  }

  abstract getNoun(): string;
  getPluralNoun(): string {
    return this.getNoun() + "s";
  }

  abstract list(props: ListProps): Promise<ObjectList<Object<ModelObjectData>>>;
  abstract createBatch(props: CreateBatchProps<ModelObjectData>): Promise<void>;
  abstract updateBatch(props: UpdateBatchProps<ModelObjectData>): Promise<void>;
  abstract deleteBatch(props: DeleteBatchProps): Promise<void>;

  abstract validateListResponse(response: unknown): ModelListResponse;
  abstract mapExternalToObject(
    external: ModelExternal
  ): Object<ModelObjectData>;
  abstract mapObjectDataToExternalData(
    data: ModelObjectData
  ): ModelExternalData;

  async sync(
    syncId: string,
    direction: "pull" | "push" | "bidirectional" = "bidirectional"
  ) {
    const authData = this.connector.getAuthData();
    if (!authData) {
      throw new Error("Must have auth to sync");
    }
    if (!authData.managedUser) {
      throw new Error("Must have managed user to sync");
    }
    const managedUserId = authData.managedUser.externalId;

    const syncResponse = await getSync({ syncId });

    const { type: syncType, modelStatuses, lastBatch } = syncResponse;
    let cursor =
      this.modelName === lastBatch?.modelName ? lastBatch?.cursor : undefined;

    let lastExternalId = modelStatuses[this.modelName]?.lastExternalId ?? null;
    let lastExternalUpdatedAt =
      modelStatuses[this.modelName]?.lastExternalUpdatedAt ?? null;

    const currentDirection = syncResponse.currentDirection;

    let objects;
    let listCounter = 0;

    if (
      (direction === "pull" || direction === "bidirectional") &&
      currentDirection !== "PUSH"
    ) {
      console.info(`Pulling model: ${this.modelName}`);

      await updateSync({
        syncId,
        currentDirection: "PULL",
      });

      do {
        if (isTimeLimitExceeded()) {
          await pauseSync(syncId);
          throw "RERUN";
        }

        console.debug("lastExternalId", lastExternalId);
        console.debug("lastUpdatedAt", lastExternalUpdatedAt);
        console.debug("cursor", cursor);

        const listResponse = await this.list({
          syncType,
          lastExternalId,
          lastExternalUpdatedAt,
          cursor,
        });
        objects = listResponse.objects;
        cursor = listResponse.cursor;

        if (objects.length === 0) {
          console.info("Nothing to upsert");
          break;
        } else {
          await upsertObjectBatch({
            collectionName: this.collectionName,
            syncId,
            modelName: this.modelName,
            app: authData.appName ?? undefined,
            customApp: authData.customAppName ?? undefined,
            objects: objects.map((obj) => ({
              managedUserId,
              externalId: obj.id,
              externalUpdatedAt: obj.updatedAt,
              data: obj.data,
            })),
            cursor,
            async: true,
          });
          console.info("Upserted batch");
          listCounter += objects.length;
          console.info("Objects processed:", listCounter);

          lastExternalId = objects[objects.length - 1].id;
          lastExternalUpdatedAt = objects[objects.length - 1].updatedAt;
        }
      } while (cursor);
    }

    if (direction === "push" || direction === "bidirectional") {
      console.info(`Pushing model: ${this.modelName}`);

      await updateSync({
        syncId,
        currentDirection: "PUSH",
      });

      let more;
      let changeCounter = 0;
      do {
        if (isTimeLimitExceeded()) {
          await pauseSync(syncId);
          throw "RERUN";
        }

        const delta = await retrieveDelta<ModelObjectData>({
          collectionName: this.collectionName,
          syncId,
          modelName: this.modelName,
        });

        console.debug("Delta:", delta);

        if (delta.changes.length === 0) {
          console.info("Nothing more to push");
          break;
        }

        if (delta.operation === "CREATE") {
          await this.createBatch({ changes: delta.changes });
        } else if (delta.operation === "UPDATE") {
          await this.updateBatch({ changes: delta.changes });
        } else if (delta.operation === "DELETE") {
          await this.deleteBatch({ changes: delta.changes });
        }

        changeCounter += delta.changes.length;
        console.info("Changes processed:", changeCounter);
      } while (true);
    }
  }
}
