import { deleteObject, getDelta, upsertObject } from "../base/collection";
import { AuthConnector } from "../connectors/AuthConnector";

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

export interface ModelSynchronizerConfig {
  toObject?: {
    [objectFieldName: string]: string | ((source: any) => any);
  };
  toSource?: {
    [sourceFieldName: string]: string | ((model: any) => any);
  };
}

export interface ModelSynchronizerProps extends ModelSynchronizerConfig {
  collection: string;
  model: string;
}

export abstract class ModelSynchronizer<T> {
  collection: string;
  model: string;
  toObject?: {
    [objectFieldName: string]: string | ((source: any) => any);
  };
  toSource?: {
    [sourceFieldName: string]: string | ((model: any) => any);
  };

  constructor(props: ModelSynchronizerProps) {
    this.collection = props.collection;
    this.model = props.model;
    this.toObject = { ...this.getDefaultToObject(), ...props.toObject };
    this.toSource = { ...this.getDefaultToSource(), ...props.toSource };
  }

  abstract getConnector(): AuthConnector;
  abstract getDefaultToObject(): {
    [objectFieldName: string]: string | ((source: any) => any);
  };
  abstract getDefaultToSource(): {
    [sourceFieldName: string]: string | ((model: any) => any);
  };
  abstract list(): Promise<Array<FullObjectProps<T>>>;
  abstract get(id: string): Promise<FullObjectProps<T>>;
  abstract create(obj: CreateObjectProps<T>): Promise<string>;
  abstract update(obj: UpdateObjectProps<T>): Promise<void>;
  abstract delete(id: string): Promise<void>;

  getSourceFields() {
    return this.toSource ? Object.keys(this.toSource) : [];
  }

  getObjectFields() {
    return this.toObject ? Object.keys(this.toObject) : [];
  }

  mapToObject(source: any) {
    const object: any = {};

    if (this.toObject) {
      for (const [objectFieldName, transform] of Object.entries(
        this.toObject
      )) {
        if (typeof transform === "string") {
          object[objectFieldName] = source[transform];
        } else {
          object[objectFieldName] = transform(source);
        }
      }
    }

    return object;
  }

  mapToSource(object: any) {
    const source: any = {};

    if (this.toSource) {
      for (const [sourceFieldName, transform] of Object.entries(
        this.toSource
      )) {
        if (typeof transform === "string") {
          source[sourceFieldName] = object[transform];
        } else {
          source[sourceFieldName] = transform(object);
        }
      }
    }

    return source;
  }

  async sync() {
    console.log("ready to sync model", this.model);
    const authData = this.getConnector().getAuthData();
    if (!authData) {
      throw new Error("Must have auth to sync");
    }
    console.log("authData", authData);
    const objects = await this.list();
    for (const obj of objects) {
      if (obj.isDeleted) {
        await this.delete(obj.id);
      } else {
        console.log("obj", obj);
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

      for (const change of delta.changes) {
        if (change.operation === "CREATE") {
          const newObjectId = await this.create({
            data: change.data,
          });

          const newObject = await this.get(newObjectId);

          await upsertObject({
            collection: this.collection,
            model: this.model,
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
