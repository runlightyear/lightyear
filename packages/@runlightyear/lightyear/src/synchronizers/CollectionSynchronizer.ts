import { ModelSynchronizer, ModelSynchronizerProps } from "./ModelSynchronizer";
import { getModels } from "../base/collection";

export interface CollectionSynchronizerProps {
  collection: string;
  models: {
    [name: string]: boolean | ModelSynchronizerProps;
  };
}

export abstract class CollectionSynchronizer {
  collection: string;
  models: {
    [name: string]: boolean | ModelSynchronizerProps | ModelSynchronizer<any>;
  };

  constructor(props: CollectionSynchronizerProps) {
    const { collection, models, ...rest } = props;
    this.collection = props.collection;
    this.models = props.models;
  }

  async getModelOrder() {
    const models = await getModels({ collection: this.collection });

    const result = [];
    for (const model of models) {
      if (model.name in this.models && this.models[model.name]) {
        result.push(model.name);
      }
    }

    return result;
  }

  abstract getModel(name: string): any;

  async sync() {
    console.log("about to get model order");

    const modelsToSync = await this.getModelOrder();

    console.log("modelsToSync", modelsToSync);

    for (const modelName of modelsToSync) {
      const model = await this.getModel(modelName);

      console.log("about to sync model", modelName, model);

      console.log("model.collection", model.collection);
      console.log("model.model", model.model);

      if (model) {
        await model.sync();
      }
    }
  }
}
