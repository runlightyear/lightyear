import {
  deleteObject,
  getDelta,
  getLastUpdatedObject,
  getSync,
  upsertObject,
  upsertObjectBatch,
} from "../base/collection";
import { AuthConnector } from "../connectors/AuthConnector";
import { get } from "lodash";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ObjectId = string;

export interface CreateObjectProps<T> {
  data: T;
}

export interface UpdateObjectProps<T> extends CreateObjectProps<T> {
  id: ObjectId;
}

export interface FullObjectProps<T> extends UpdateObjectProps<T> {
  updatedAt: string;
  isDeleted?: boolean;
}

export interface ModelSynchronizerProps {
  connector: AuthConnector;
  collection: string;
  model: string;
  toObjectMeta?: {
    [objectFieldName: string]: string | ((external: any) => any);
  };
  toObjectData?: {
    [objectFieldName: string]: string | ((external: any) => any);
  };
  fromObjectMeta?: {
    [externalFieldName: string]: string | ((object: any) => any);
  };
  fromObjectData?: {
    [externalFieldName: string]: string | ((object: any) => any);
  };
}

export abstract class ModelSynchronizer<T> {
  connector: AuthConnector;
  collection: string;
  model: string;
  toObjectMeta?: {
    [objectFieldName: string]: string | ((source: any) => any);
  };
  toObjectData?: {
    [objectFieldName: string]: string | ((source: any) => any);
  };
  fromObjectMeta?: {
    [sourceFieldName: string]: string | ((model: any) => any);
  };
  fromObjectData?: {
    [sourceFieldName: string]: string | ((model: any) => any);
  };

  constructor(props: ModelSynchronizerProps) {
    this.connector = props.connector;
    this.collection = props.collection;
    this.model = props.model;
    this.toObjectMeta = { ...this.getToObjectMeta(), ...props.toObjectMeta };
    this.toObjectData = { ...this.getToObjectData(), ...props.toObjectData };
    this.fromObjectMeta = {
      ...this.getFromObjectMeta(),
      ...props.fromObjectMeta,
    };
    this.fromObjectData = {
      ...this.getFromObjectData(),
      ...props.fromObjectData,
    };
  }

  abstract getToObjectMeta(): any;
  abstract getToObjectData(): any;
  abstract getFromObjectMeta(): any;
  abstract getFromObjectData(): any;

  abstract list(props: {
    syncType: "FULL" | "INCREMENTAL";
    lastUpdatedAt?: string;
    cursor?: string;
  }): Promise<{ objects: Array<FullObjectProps<T>>; cursor?: string }>;
  abstract get(id: string): Promise<FullObjectProps<T>>;
  abstract create(obj: CreateObjectProps<T>): Promise<string>;
  abstract update(obj: UpdateObjectProps<T>): Promise<void>;
  abstract delete(id: string): Promise<void>;

  getExternalKeys() {
    return [
      ...(this.fromObjectMeta ? Object.keys(this.fromObjectMeta) : []),
      ...(this.fromObjectData ? Object.keys(this.fromObjectData) : []),
    ];
  }

  getObjectKeys() {
    return this.toObjectData ? Object.keys(this.toObjectData) : [];
  }

  mapToObject(source: any) {
    const object: any = { data: {} };

    if (this.toObjectMeta) {
      for (const [objectFieldName, transform] of Object.entries(
        this.toObjectMeta
      )) {
        if (typeof transform === "function") {
          object[objectFieldName] = transform(source);
        } else {
          object[objectFieldName] = get(source, transform);
        }
      }
    }

    if (this.toObjectData) {
      for (const [objectFieldName, transform] of Object.entries(
        this.toObjectData
      )) {
        if (typeof transform === "function") {
          object.data[objectFieldName] = transform(source);
        } else {
          object.data[objectFieldName] = get(source, transform);
        }
      }
    }

    return object;
  }

  mapFromObject(object: any) {
    const external: any = {};

    if (this.fromObjectData) {
      for (const [sourceFieldName, transform] of Object.entries(
        this.fromObjectData
      )) {
        if (typeof transform === "function") {
          external[sourceFieldName] = transform(object.data);
        } else {
          external[sourceFieldName] = get(object.data, transform);
        }
      }
    }

    return external;
  }

  async sync(syncId: string) {
    const authData = this.connector.getAuthData();
    if (!authData) {
      throw new Error("Must have auth to sync");
    }
    if (!authData.managedUser) {
      throw new Error("Must have managed user to sync");
    }
    const managedUserId = authData.managedUser.externalId;

    const syncResponse = await getSync({ collection: this.collection, syncId });

    const { type: syncType, modelStatuses } = syncResponse;

    let lastUpdatedAt =
      modelStatuses[this.model]?.lastExternalUpdatedAt ?? null;

    let objects;
    let cursor = undefined;

    let listCounter = 0;

    do {
      const listResponse: {
        objects: Array<FullObjectProps<T>>;
        cursor?: string;
      } = await this.list({ syncType, lastUpdatedAt, cursor });
      objects = listResponse.objects;
      cursor = listResponse.cursor;

      // for (const obj of objects) {
      //   if (obj.isDeleted) {
      //     await this.delete(obj.id);
      //   } else {
      // console.log("Skipping upsert for now");
      if (objects.length === 0) {
        console.info("Nothing to upsert");
      } else {
        await upsertObjectBatch({
          collection: this.collection,
          syncId,
          model: this.model,
          app: authData.appName ?? undefined,
          customApp: authData.customAppName ?? undefined,
          objects: objects.map((obj) => ({
            managedUserId,
            localObjectId: obj.id,
            localUpdatedAt: obj.updatedAt,
            data: obj.data,
          })),
          async: true,
        });
        console.info("Upserted batch");
        // lastUpdatedAt = obj.updatedAt;
        // console.log("lastUpdatedAt", lastUpdatedAt);
        listCounter += objects.length;
        console.info("Objects processed:", listCounter);
        // }
        // }
      }
    } while (cursor);

    console.info("Processing delta");
    let more;
    let changeCounter = 0;
    do {
      const delta = await getDelta({
        collection: this.collection,
        managedUserExternalId: authData.managedUser?.externalId ?? null,
        app: authData.appName,
        customApp: authData.customAppName,
        model: this.model,
      });
      more = delta.more;

      console.debug("Delta:", delta);

      for (const change of delta.changes) {
        if (change.operation === "CREATE") {
          const newObjectId = await this.create({
            data: change.data,
          });

          const newObject = await this.get(newObjectId);

          await upsertObject({
            collection: this.collection,
            syncId,
            model: this.model,
            app: authData.appName ?? undefined,
            customApp: authData.customAppName ?? undefined,
            objectId: change.objectId,
            managedUserId: authData.managedUser?.externalId ?? null,
            localObjectId: newObject.id,
            localUpdatedAt: newObject.updatedAt,
            data: newObject.data,
          });
        } else if (change.operation === "UPDATE") {
          await this.update({
            id: change.localObjectId,
            data: change.data,
          });

          const updatedObject = await this.get(change.localObjectId);

          await upsertObject({
            collection: this.collection,
            syncId,
            model: this.model,
            app: authData.appName ?? undefined,
            customApp: authData.customAppName ?? undefined,
            managedUserId: authData.managedUser?.externalId ?? null,
            localObjectId: updatedObject.id,
            localUpdatedAt: updatedObject.updatedAt,
            data: updatedObject.data,
          });
          // } else if (change.operation === "DELETE") {
          //   await this.delete(change.objectId);
          //   await deleteObject({
          //     collection: this.collection,
          //     model: this.model,
          //     externalId: change.objectId,
          //   });
        }
      }

      changeCounter += delta.changes.length;
      console.info("Changes processed:", changeCounter);
    } while (more);
  }
}
