import { deleteObject, getDelta, upsertObject } from "../base/collection";
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
  toObject?: {
    [objectFieldName: string]: string | ((external: any) => any);
  };
  toObjectData?: {
    [objectFieldName: string]: string | ((external: any) => any);
  };
  fromObject?: {
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
  toObject?: {
    [objectFieldName: string]: string | ((source: any) => any);
  };
  toObjectData?: {
    [objectFieldName: string]: string | ((source: any) => any);
  };
  fromObject?: {
    [sourceFieldName: string]: string | ((model: any) => any);
  };
  fromObjectData?: {
    [sourceFieldName: string]: string | ((model: any) => any);
  };

  constructor(props: ModelSynchronizerProps) {
    this.connector = props.connector;
    this.collection = props.collection;
    this.model = props.model;
    this.toObject = { ...this.getToObject(), ...props.toObject };
    this.toObjectData = { ...this.getToObjectData(), ...props.toObjectData };
    this.fromObject = { ...this.getFromObject(), ...props.fromObject };
    this.fromObjectData = {
      ...this.getFromObjectData(),
      ...props.fromObjectData,
    };
  }

  abstract getToObject(): any;
  abstract getToObjectData(): any;
  abstract getFromObject(): any;
  abstract getFromObjectData(): any;

  abstract list(): Promise<Array<FullObjectProps<T>>>;
  abstract get(id: string): Promise<FullObjectProps<T>>;
  abstract create(obj: CreateObjectProps<T>): Promise<string>;
  abstract update(obj: UpdateObjectProps<T>): Promise<void>;
  abstract delete(id: string): Promise<void>;

  getExternalKeys() {
    return [
      ...(this.fromObject ? Object.keys(this.fromObject) : []),
      ...(this.fromObjectData ? Object.keys(this.fromObjectData) : []),
    ];
  }

  getObjectKeys() {
    return this.toObjectData ? Object.keys(this.toObjectData) : [];
  }

  mapToObject(source: any) {
    const object: any = { data: {} };

    if (this.toObject) {
      for (const [objectFieldName, transform] of Object.entries(
        this.toObject
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

  async sync() {
    console.log("Syncing objects", this.collection, this.model);
    const authData = this.connector.getAuthData();
    if (!authData) {
      throw new Error("Must have auth to sync");
    }
    const objects = await this.list();

    console.log("objects", objects);

    for (const obj of objects) {
      if (obj.isDeleted) {
        await this.delete(obj.id);
      } else {
        await upsertObject({
          collection: this.collection,
          model: this.model,
          app: authData.appName ?? undefined,
          customApp: authData.customAppName ?? undefined,
          managedUserExternalId: authData.managedUser?.externalId ?? null,
          externalId: obj.id,
          externalUpdatedAt: obj.updatedAt,
          data: obj.data,
        });
      }
    }

    console.log("Processing delta");
    let more;
    do {
      const delta = await getDelta({
        collection: this.collection,
        managedUserExternalId: authData.managedUser?.externalId ?? null,
        customApp: authData.customAppName,
        model: this.model,
      });
      more = delta.more;

      console.log("delta", delta);
      // return;

      for (const change of delta.changes) {
        if (change.operation === "CREATE") {
          const newObjectId = await this.create({
            data: change.data,
          });

          const newObject = await this.get(newObjectId);

          await upsertObject({
            collection: this.collection,
            model: this.model,
            app: authData.appName ?? undefined,
            customApp: authData.customAppName ?? undefined,
            managedUserExternalId: authData.managedUser?.externalId ?? null,
            externalId: newObject.id,
            externalUpdatedAt: newObject.updatedAt,
            data: newObject.data,
          });
        } else if (change.operation === "UPDATE") {
          await this.update({
            id: change.objectId,
            data: change.data,
          });

          const updatedObject = await this.get(change.objectId);

          await upsertObject({
            collection: this.collection,
            model: this.model,
            app: authData.appName ?? undefined,
            customApp: authData.customAppName ?? undefined,
            managedUserExternalId: authData.managedUser?.externalId ?? null,
            externalId: updatedObject.id,
            externalUpdatedAt: updatedObject.updatedAt,
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
    } while (more);
  }
}
