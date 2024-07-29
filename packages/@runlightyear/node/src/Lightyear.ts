import { ModelSynchronizer } from "./ModelSynchronizer";

export interface LightyearProps {
  apiKey: string;
  baseUrl?: string;
}

export interface SyncConfig {
  collection: string;
  models: {
    [modelName: string]: ModelSynchronizer<any>;
  };
}

const DEFAULT_BASE_URL = "http://localhost:3000";

export class Lightyear {
  apiKey: string;
  baseUrl: string;

  constructor(props: LightyearProps) {
    this.apiKey = props.apiKey;
    this.baseUrl = props.baseUrl ?? DEFAULT_BASE_URL;
  }

  async getModels(props: { collection: string }) {
    const { collection } = props;

    const response = await fetch(
      `${this.baseUrl}/api/v1/envs/dev/collections/${collection}/models`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `apiKey ${this.apiKey}`,
        },
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.text());
    }
  }

  async upsertObject(props: {
    collection: string;
    model: string;
    userId: string;
    objectId: string;
    updatedAt: string;
    data: unknown;
  }) {
    const { collection, model, userId, objectId, updatedAt, data } = props;

    const response = await fetch(
      `${this.baseUrl}/api/v1/envs/dev/collections/${collection}/models/${model}/objects/upsert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apiKey ${this.apiKey}`,
        },
        body: JSON.stringify({
          managedUserExternalId: userId,
          externalId: objectId,
          externalUpdatedAt: updatedAt,
          data,
        }),
      }
    );

    if (response.ok) {
      console.log(`Upserted object: ${objectId}`);
    } else {
      console.error("Failed to upsert object:", objectId);
      console.log(await response.text());
    }
  }

  async deleteObject(props: {
    collection: string;
    model: string;
    objectId: string;
  }) {
    const { collection, model, objectId } = props;

    const response = await fetch(
      `${this.baseUrl}/api/v1/envs/dev/collections/${collection}/models/${model}/objects/delete`,
      {
        method: "POST",
        headers: {
          Authorization: `apiKey ${this.apiKey}`,
        },
      }
    );

    if (response.ok) {
      console.log(`Deleted object: ${objectId}`);
    } else {
      console.error("Failed to delete object:", objectId);
      console.log(await response.text());
    }
  }

  async getDelta(props: { collection: string; model: string }) {
    const { collection, model } = props;

    const response = await fetch(
      `${this.baseUrl}/api/v1/envs/dev/collections/${collection}/models/${model}/objects/delta`,
      {
        method: "POST",
        headers: {
          Authorization: `apiKey ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.text());
    }
  }

  async syncCollection(props: SyncConfig) {
    console.log("in syncCollection");

    const { collection, models } = props;

    const modelOrder = (await this.getModels({ collection })).map(
      (model: any) => model.name
    );
    console.log("model order", modelOrder);

    for (const model of modelOrder) {
      console.log("syncing model", model);
      const objects = await models[model].list();
      for (const obj of objects) {
        if (obj.isDeleted) {
          await models[model].delete(obj.id);
        } else {
          await this.upsertObject({
            collection: collection,
            model: model,
            userId: obj.userId,
            objectId: obj.id,
            updatedAt: obj.updatedAt,
            data: obj.data,
          });
        }
      }

      console.log("Processing delta for model", model);

      let more;
      do {
        const delta = await this.getDelta({ collection, model });
        more = delta.more;

        console.log("delta", JSON.stringify(delta, null, 2));

        for (const change of delta.changes) {
          if (change.operation === "CREATE") {
            const newObjectId = await models[model].create({
              userId: change.userId,
              data: change.data,
            });

            const newObject = await models[model].get(newObjectId);

            await this.upsertObject({
              collection: collection,
              model: model,
              userId: newObject.userId,
              objectId: newObject.id,
              updatedAt: newObject.updatedAt,
              data: newObject.data,
            });
          } else if (change.operation === "UPDATE") {
            await models[model].update({
              id: change.objectId,
              userId: change.userId,
              data: change.data,
            });

            const updatedObject = await models[model].get(change.objectId);

            await this.upsertObject({
              collection: collection,
              model: model,
              userId: updatedObject.userId,
              objectId: updatedObject.id,
              updatedAt: updatedObject.updatedAt,
              data: updatedObject.data,
            });
          } else if (change.operation === "DELETE") {
            await models[model].delete(change.objectId);
            await this.deleteObject({
              collection: collection,
              model: model,
              objectId: change.objectId,
            });
          }
        }
      } while (more);
    }
  }
}
