import {
  getSync,
  pauseSync,
  retrieveDelta,
  updateSync,
  upsertObjectBatch,
  confirmChange,
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
  httpRequestId?: string;
}>;

export interface ReadProps {
  id: string;
}

export interface CreateProps<ObjectData = any> {
  changeId: string;
  data: ObjectData;
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

export interface UpdateProps<ObjectData = any> {
  changeId: string;
  externalId: ExternalId;
  data: ObjectData;
}

export interface DeleteProps {
  changeId: string;
  externalId: ExternalId;
}

export type ListFn<ObjectData> = (
  props: ListProps
) => Promise<ObjectList<ObjectData>>;

export type CreateFn<ObjectData> = (props: CreateProps<ObjectData>) => Promise<{
  externalId: string;
  externalUpdatedAt: string | null;
  httpRequestId?: string;
}>;

export type CreateBatchFn<ObjectData> = (
  props: CreateBatchProps<ObjectData>
) => Promise<void>;

export type UpdateFn<ObjectData> = (
  props: UpdateProps<ObjectData>
) => Promise<{ externalUpdatedAt: string | null; httpRequestId?: string }>;

export type UpdateBatchFn<ObjectData> = (
  props: UpdateBatchProps<ObjectData>
) => Promise<void>;

export type DeleteFn = (props: DeleteProps) => Promise<void | {
  httpRequestId?: string;
}>;

export type DeleteBatchFn = (props: DeleteBatchProps) => Promise<void>;

export type ValidateFn<ModelListResponse> = (
  response: unknown
) => Promise<ModelListResponse>;

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
  ModelExternal = any,
  ModelListResponse = any
> {
  connector: AuthConnector;
  collectionName: string;
  modelName: string;

  constructor(props: ModelConnectorProps) {
    this.connector = props.connector;
    this.collectionName = props.collectionName;
    this.modelName = props.modelName;
  }

  // abstract getNoun(): string;
  // getPluralNoun(): string {
  //   return this.getNoun() + "s";
  // }

  // abstract list(props: ListProps): Promise<ObjectList<Object<ModelObjectData>>>;
  // abstract createBatch(props: CreateBatchProps<ModelObjectData>): Promise<void>;
  // abstract updateBatch(props: UpdateBatchProps<ModelObjectData>): Promise<void>;
  // abstract deleteBatch(props: DeleteBatchProps): Promise<void>;

  list: ListFn<ModelObjectData> | null = null;
  create: CreateFn<ModelObjectData> | null = null;
  update: UpdateFn<ModelObjectData> | null = null;
  delete: DeleteFn | null = null;
  createBatch: CreateBatchFn<ModelObjectData> | null = null;
  updateBatch: UpdateBatchFn<ModelObjectData> | null = null;
  deleteBatch: DeleteBatchFn | null = null;

  // abstract validateListResponse(response: unknown): ModelListResponse;
  validateListResponse: ValidateFn<ModelListResponse> | null = null;

  // abstract mapExternalToObject(
  //   external: ModelExternal
  // ): Object<ModelObjectData>;
  // abstract mapObjectDataToExternalData(
  //   data: ModelObjectData
  // ): ModelExternalData;

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

        if (!this.list) {
          throw new Error("List function not implemented");
        }

        const listResponse = await this.list({
          syncType,
          lastExternalId,
          lastExternalUpdatedAt,
          cursor,
        });

        const listHttpRequestId = listResponse.httpRequestId;

        if (this.validateListResponse) {
          await this.validateListResponse(listResponse);
        }

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
              externalId: obj.id as string,
              externalUpdatedAt: obj.updatedAt as string,
              data: obj.data as any,
              httpRequestId: listHttpRequestId,
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
          if (this.createBatch) {
            await this.createBatch({ changes: delta.changes });
          } else if (this.create) {
            for (const change of delta.changes) {
              try {
                const { externalId, externalUpdatedAt, httpRequestId } =
                  await this.create({
                    changeId: change.changeId,
                    data: change.data,
                  });

                console.warn(
                  "about to confirm change with httpRequestId",
                  httpRequestId
                );

                await confirmChange({
                  changeId: change.changeId,
                  externalId,
                  externalUpdatedAt,
                  httpRequestId,
                });
              } catch (error) {
                await confirmChange({
                  changeId: change.changeId,
                  error: error instanceof Error ? error.message : String(error),
                });
              }
            }
          } else {
            throw new Error("Create batch function not implemented");
          }
        } else if (delta.operation === "UPDATE") {
          if (this.updateBatch) {
            await this.updateBatch({ changes: delta.changes });
          } else if (this.update) {
            for (const change of delta.changes) {
              try {
                const { externalUpdatedAt, httpRequestId } = await this.update({
                  changeId: change.changeId,
                  externalId: change.externalId,
                  data: change.data,
                });

                console.warn(
                  "about to confirm change with httpRequestId",
                  httpRequestId
                );

                await confirmChange({
                  changeId: change.changeId,
                  externalId: change.externalId,
                  externalUpdatedAt,
                  httpRequestId,
                });
              } catch (error) {
                await confirmChange({
                  changeId: change.changeId,
                  error: error instanceof Error ? error.message : String(error),
                });
              }
            }
          } else {
            throw new Error("Update batch function not implemented");
          }
        } else if (delta.operation === "DELETE") {
          if (this.deleteBatch) {
            await this.deleteBatch({ changes: delta.changes });
          } else if (this.delete) {
            for (const change of delta.changes) {
              try {
                const result = await this.delete({
                  changeId: change.changeId,
                  externalId: change.externalId,
                });
                const httpRequestId =
                  result &&
                  typeof result === "object" &&
                  "httpRequestId" in result
                    ? result.httpRequestId
                    : undefined;

                console.warn(
                  "about to confirm change with httpRequestId",
                  httpRequestId
                );

                await confirmChange({
                  changeId: change.changeId,
                  externalId: change.externalId,
                  externalUpdatedAt: undefined,
                  httpRequestId,
                });
              } catch (error) {
                await confirmChange({
                  changeId: change.changeId,
                  error: error instanceof Error ? error.message : String(error),
                });
              }
            }
          } else {
            throw new Error("Delete batch function not implemented");
          }
        }

        changeCounter += delta.changes.length;
        console.info("Changes processed:", changeCounter);
      } while (true);
    }
  }
}
