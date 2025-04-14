import {
  getSync,
  pauseSync,
  retrieveDelta,
  updateSync,
  upsertObjectBatch,
} from "../base/collection";
import { AuthConnector } from "../connectors/AuthConnector";
import { get } from "lodash";
import { isTimeLimitExceeded } from "../base/time";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ObjectId = string;
export type ExternalId = string;

export interface BaseObject {
  id: string;
  externalId: ExternalId;
  updatedAt: string;
  isDeleted: boolean;
  data: {
    [key: string]: unknown;
  };
}

export interface BaseExternal {
  externalId: ExternalId;
  data: {
    [key: string]: unknown;
  };
}

export interface ListObjectProps {
  syncType: "FULL" | "INCREMENTAL";
  lastExternalId?: string;
  lastUpdatedAt?: string;
  cursor?: string;
}

export type ListObjectResponse<Object extends BaseObject> = Promise<{
  objects: Array<Object>;
  cursor?: string;
}>;

export interface GetObjectProps {
  id: string;
}

export type GetObjectResponse<Object extends BaseObject> = Promise<Object>;

export interface CreateObjectProps<Object extends BaseObject> {
  changeId: string;
  object: Object;
}

export interface CreateObjectBatchProps<Object extends BaseObject> {
  changes: Array<CreateObjectProps<Object>>;
}

export interface UpdateObjectProps<Object extends BaseObject>
  extends CreateObjectProps<Object> {
  externalId: ExternalId;
}

export interface UpdateObjectBatchProps<Object extends BaseObject> {
  changes: Array<UpdateObjectProps<Object>>;
}

export interface DeleteObjectProps {
  externalId: ExternalId;
}

export interface DeleteObjectBatchProps {
  changes: Array<DeleteObjectProps>;
}

export interface FullObjectProps<Object extends BaseObject>
  extends UpdateObjectProps<Object> {
  updatedAt: string;
  isDeleted?: boolean;
}

export interface ModelConnectorProps {
  connector: AuthConnector;
  collectionName: string;
  modelName: string;
}

export abstract class ModelConnector<
  Object extends BaseObject = BaseObject,
  External extends BaseExternal = BaseExternal,
  ListResponse = unknown,
  GetResponse = unknown
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

  abstract validateListResponse(response: unknown): ListResponse;
  abstract getObjectsFromListResponse(response: ListResponse): Array<Object>;
  abstract validateGetResponse(response: unknown): GetResponse;
  abstract getObjectFromGetResponse(response: GetResponse): Object;

  abstract list(props: ListObjectProps): Promise<ListObjectResponse<Object>>;
  abstract get(props: GetObjectProps): Promise<GetObjectResponse<Object>>;
  abstract create(props: CreateObjectProps<Object>): Promise<void>;
  abstract createBatch(props: CreateObjectBatchProps<Object>): Promise<void>;
  abstract update(props: UpdateObjectProps<Object>): Promise<void>;
  abstract updateBatch(props: UpdateObjectBatchProps<Object>): Promise<void>;
  abstract delete(props: DeleteObjectProps): Promise<void>;
  abstract deleteBatch(props: DeleteObjectBatchProps): Promise<void>;

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
              externalId: obj.externalId,
              externalUpdatedAt: obj.updatedAt,
              data: obj.data,
            })),
            cursor,
            async: true,
          });
          console.info("Upserted batch");
          listCounter += objects.length;
          console.info("Objects processed:", listCounter);

          lastExternalId = objects[objects.length - 1].externalId;
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
