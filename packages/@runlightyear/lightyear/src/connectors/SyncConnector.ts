import { getSync, updateSync, getModels } from "../base/collection";
import { ModelConnector, ModelConnectorProps } from "./ModelConnector";
import { RestConnector, RestConnectorProps } from "./RestConnector";

export interface SyncConnectorProps extends RestConnectorProps {
  collectionName: string;
  // models?: { [key: string]: ModelConnector };
}

// Type for ModelConnector constructor
export type ModelConnectorConstructor = new (
  props: ModelConnectorProps
) => ModelConnector;

export interface SyncConnectorGetModelsResponse {
  [key: string]: ModelConnector | ModelConnectorConstructor;
}

export abstract class SyncConnector extends RestConnector {
  collectionName: string;

  constructor(props: SyncConnectorProps) {
    super(props);

    this.collectionName = props.collectionName;
  }

  /**
   * Returns the models to be synchronized.
   * Can return either ModelConnector instances or ModelConnector class constructors.
   * When a class constructor is returned, it will be instantiated using props from getModelProps().
   *
   * @example
   * ```ts
   * getModels() {
   *   return {
   *     // Return a class - will be instantiated automatically
   *     user: UserModel,
   *     // Return an instance - will be used directly
   *     account: new AccountModel({ ... }),
   *   };
   * }
   * ```
   */
  abstract getModels(): SyncConnectorGetModelsResponse;

  /**
   * Get the props needed to instantiate a ModelConnector.
   * Override this method to provide custom props for specific models.
   *
   * @param modelName - The name of the model to get props for
   * @returns The props needed to instantiate the model
   */
  getModelProps(modelName: string): ModelConnectorProps {
    return {
      connector: this,
      collectionName: this.collectionName,
      modelName: modelName,
    };
  }

  async sync(
    syncId: string,
    direction: "push" | "pull" | "bidirectional" = "bidirectional"
  ) {
    const modelsOnCollection = await getModels({
      collectionName: this.collectionName,
    });
    let modelsToSync = modelsOnCollection.map((model) => model.name);

    const sync = await getSync({ syncId });

    console.debug("sync in CollectionSynchronizer", sync);

    const currentModelName = sync.currentModel?.name ?? undefined;

    console.debug(
      "currentModelName in CollectionSynchronizer",
      currentModelName
    );

    if (currentModelName) {
      // slice modelsToSync to only include the currentModelName and subsequent models
      modelsToSync = modelsToSync.slice(modelsToSync.indexOf(currentModelName));
    }

    console.debug("modelsToSync in CollectionSynchronizer", modelsToSync);

    for (const modelName of modelsToSync) {
      const modelOrClass = this.getModels()[modelName];

      if (modelOrClass) {
        let model: ModelConnector;

        // Check if it's a class constructor or an instance
        if (
          typeof modelOrClass === "function" &&
          modelOrClass.prototype instanceof ModelConnector
        ) {
          // It's a class, instantiate it
          const ModelClass = modelOrClass as any; // Cast to any to allow instantiation
          const props = this.getModelProps(modelName);
          model = new ModelClass(props);
        } else {
          // It's already an instance
          model = modelOrClass as ModelConnector;
        }

        await updateSync({
          syncId,
          currentModelName: modelName,
        });

        await model.sync(syncId, direction);

        await updateSync({
          syncId,
          currentDirection: null,
        });
      }
    }
  }
}
