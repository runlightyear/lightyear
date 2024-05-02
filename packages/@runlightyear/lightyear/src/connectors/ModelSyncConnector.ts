import { SyncConnectorProps } from "./SyncConnector";
import { deleteObject, getDelta, upsertObject } from "../base/collection";

export interface ModelSyncConnectorProps extends SyncConnectorProps {
  collection: string;
  model: string;
  customApp: string;
  managedUserExternalId: string;
  overwrite?: boolean;
}

export abstract class ModelSyncConnector {
  collection: string;
  model: string;
  customApp: string;
  managedUserExternalId: string;
  overwrite: boolean = false;

  constructor(props: ModelSyncConnectorProps) {
    const { collection, model, customApp, managedUserExternalId } = props;
    this.collection = collection;
    this.model = model;
    this.customApp = customApp;
    this.managedUserExternalId = managedUserExternalId;
    this.overwrite = props.overwrite ?? false;
  }

  abstract listObjects({ since }?: { since: string }): Promise<unknown[]>;
  abstract getObject({ id }: { id: string }): Promise<unknown>;
  abstract createObject({ data }: { data: unknown }): Promise<string>;
  abstract updateObject({
    id,
    data,
  }: {
    id: string;
    data: unknown;
  }): Promise<void>;
  abstract deleteObject({ id }: { id: string }): Promise<unknown>;
  abstract listRemainingIds(): Promise<string[]>;
  abstract getObjectId(object: unknown): string;
  abstract getObjectUpdatedAt(object: unknown): string;
  abstract isObjectDeleted(object: unknown): boolean;
  abstract toModelData(sourceObject: unknown): unknown;
  abstract toSourceData(modelObject: unknown): unknown;

  async fullSync() {
    console.info("Starting full sync for", this.collection, this.model);
    const objects = await this.listObjects();

    for (const sourceObject of objects) {
      if (!this.isObjectDeleted(sourceObject)) {
        await upsertObject({
          collection: this.collection,
          model: this.model,
          customApp: this.customApp,
          managedUserExternalId: this.managedUserExternalId,
          externalId: this.getObjectId(sourceObject),
          externalUpdatedAt: this.getObjectUpdatedAt(sourceObject),
          data: this.toModelData(sourceObject),
          overwrite: this.overwrite,
        });
        console.log(
          "Upserted object",
          this.getObjectId(sourceObject),
          sourceObject
        );
      } else {
        await deleteObject({
          collection: this.collection,
          model: this.model,
          customApp: this.customApp,
          managedUserExternalId: this.managedUserExternalId,
          externalId: this.getObjectId(sourceObject),
        });
        console.log(
          "Deleted object",
          this.getObjectId(sourceObject),
          sourceObject
        );
      }
    }

    const delta = await getDelta({
      collection: this.collection,
      model: this.model,
      customApp: this.customApp,
      managedUserExternalId: this.managedUserExternalId,
    });

    for (const change of delta.changes) {
      console.info("Processing change", change);
      if (change.operation === "CREATE") {
        const newObjectId = await this.createObject({
          data: this.toSourceData(change.data),
        });
        const newObject = await this.getObject({ id: newObjectId });
        await upsertObject({
          collection: this.collection,
          model: this.model,
          customApp: this.customApp,
          managedUserExternalId: this.managedUserExternalId,
          externalId: this.getObjectId(newObject),
          externalUpdatedAt: this.getObjectUpdatedAt(newObject),
          data: this.toModelData(newObject),
          overwrite: this.overwrite,
        });
        console.info("Created object", newObjectId, newObject);
      } else if (change.operation === "UPDATE") {
        await this.updateObject({
          id: change.objectId,
          data: this.toSourceData(change.data),
        });
        const updatedObject = await this.getObject({ id: change.objectId });
        await upsertObject({
          collection: this.collection,
          model: this.model,
          customApp: this.customApp,
          managedUserExternalId: this.managedUserExternalId,
          externalId: this.getObjectId(updatedObject),
          externalUpdatedAt: this.getObjectUpdatedAt(updatedObject),
          data: this.toModelData(updatedObject),
          overwrite: this.overwrite,
        });
        console.info("Updated object", change.objectId, change.data);
      } else if (change.operation === "DELETE") {
        await this.deleteObject({ id: change.objectId });
        await deleteObject({
          collection: this.collection,
          model: this.model,
          customApp: this.customApp,
          managedUserExternalId: this.managedUserExternalId,
          externalId: this.getObjectId(change.data),
        });
        console.info("Deleted object", change.objectId, change.data);
      }
    }
    console.info("Finished full sync", this.collection, this.model);
  }
}
