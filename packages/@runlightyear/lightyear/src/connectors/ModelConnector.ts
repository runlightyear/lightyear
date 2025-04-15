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

export interface BaseObject {
  id: string;
  updatedAt: string;
  isDeleted: boolean;
  data: {
    [key: string]: unknown;
  };
}

export interface BaseExternal {
  id: string;
  data: {
    [key: string]: unknown;
  };
}

export interface ListProps {
  syncType: "FULL" | "INCREMENTAL";
  lastExternalId?: string;
  lastUpdatedAt?: string;
  cursor?: string;
}

export type ObjectList<Object extends BaseObject> = Promise<{
  objects: Array<Object>;
  cursor?: string;
}>;

export interface ReadProps {
  id: string;
}

export interface CreateBatchProps<Object extends BaseObject> {
  changes: Array<{ changeId: string; object: Object }>;
}

export interface UpdateBatchProps<Object extends BaseObject> {
  changes: Array<{ changeId: string; externalId: ExternalId; object: Object }>;
}

export interface DeleteBatchProps {
  changes: Array<{ changeId: string; externalId: ExternalId }>;
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
  ModelObject extends BaseObject = BaseObject,
  ModelListResponse = unknown,
  ModelExternal = unknown
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

  abstract list(props: ListProps): Promise<ObjectList<ModelObject>>;
  abstract createBatch(props: CreateBatchProps<ModelObject>): Promise<void>;
  abstract updateBatch(props: UpdateBatchProps<ModelObject>): Promise<void>;
  abstract deleteBatch(props: DeleteBatchProps): Promise<void>;

  abstract validateListResponse(response: unknown): ModelListResponse;
  abstract mapExternalToObject(external: ModelExternal): ModelObject;

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

    let lastExternalId =
      modelStatuses[this.modelName]?.lastLocalObjectId ?? null;
    let lastUpdatedAt =
      modelStatuses[this.modelName]?.lastLocalUpdatedAt ?? null;

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

        console.info("lastExternalId", lastExternalId);
        console.info("lastUpdatedAt", lastUpdatedAt);
        console.info("cursor", cursor);

        const listResponse = await this.list({
          syncType,
          lastExternalId,
          lastUpdatedAt,
          cursor,
        });
        objects = listResponse.objects;
        cursor = listResponse.cursor;

        if (objects.length === 0) {
          console.info("Nothing to upsert");
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
          lastUpdatedAt = objects[objects.length - 1].updatedAt;
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

        const delta = await retrieveDelta({
          collectionName: this.collectionName,
          syncId,
          modelName: this.modelName,
        });

        console.debug("Delta:", delta);

        if (delta.changes.length === 0) {
          console.info("Nothing more to push");
          break;
        }

        if (delta.changes[0].operation === "CREATE") {
          await this.createBatch(delta.changes);
        } else if (delta.changes[0].operation === "UPDATE") {
          await this.updateBatch(delta.changes);
        } else if (delta.changes[0].operation === "DELETE") {
          await this.deleteBatch(delta.changes);
        }

        changeCounter += delta.changes.length;
        console.info("Changes processed:", changeCounter);
      } while (true);
    }
  }
}
