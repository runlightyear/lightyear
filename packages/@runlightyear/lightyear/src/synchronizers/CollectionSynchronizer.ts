import { ModelSynchronizer, ModelSynchronizerProps } from "./ModelSynchronizer";
import { getModels, getSync } from "../base/collection";
import { AuthConnector } from "../connectors/AuthConnector";

export interface CollectionSynchronizerProps {
  connector: AuthConnector;
  collection: string;
  models?: {
    [name: string]: boolean | ((props: any) => ModelSynchronizer<any>);
  };
  modelSynchronizers?: {
    [name: string]: (props: ModelSynchronizerProps) => ModelSynchronizer<any>;
  };
}

export abstract class CollectionSynchronizer {
  connector: AuthConnector;
  collection: string;
  modelSynchronizers: {
    [name: string]: (props: ModelSynchronizerProps) => ModelSynchronizer<any>;
  };

  constructor(props: CollectionSynchronizerProps) {
    this.connector = props.connector;
    this.collection = props.collection;

    this.modelSynchronizers = {
      ...this.getDefaultModelSynchronizers(),
      ...props.modelSynchronizers,
    };
  }

  async getModelOrder() {
    const models = await getModels({ collection: this.collection });

    const result = [];
    for (const model of models) {
      if (
        model.name in this.modelSynchronizers &&
        this.modelSynchronizers[model.name]
      ) {
        result.push(model.name);
      }
    }

    return result;
  }

  abstract getDefaultModelSynchronizers(): {
    [name: string]: (props: ModelSynchronizerProps) => ModelSynchronizer<any>;
  };

  getModelSynchronizerProps(model: string): ModelSynchronizerProps {
    return {
      connector: this.connector,
      collection: this.collection,
      model,
    };
  }

  async getModel(name: string) {
    const modelSynchronizer = this.modelSynchronizers[name];
    if (!modelSynchronizer) {
      return null;
    }

    return modelSynchronizer(this.getModelSynchronizerProps(name));
  }

  async sync(
    syncId: string,
    direction: "push" | "pull" | "bidirectional" = "bidirectional"
  ) {
    let modelsToSync = await this.getModelOrder();

    const sync = await getSync({ syncId });

    console.info("sync in CollectionSynchronizer", sync);

    const currentModelName = sync.lastBatch?.modelName ?? undefined;

    if (currentModelName) {
      // slice modelsToSync to only include the currentModelName and subsequent models
      modelsToSync = modelsToSync.slice(modelsToSync.indexOf(currentModelName));
    }

    console.info("modelsToSync in CollectionSynchronizer", modelsToSync);

    for (const modelName of modelsToSync) {
      const model = await this.getModel(modelName);

      if (model) {
        await model.sync(syncId, direction);
      }
    }
  }
}
