import { getSync, updateSync, getModels } from "../base/collection";
import { ModelConnector } from "./ModelConnector";
import { RestConnector, RestConnectorProps } from "./RestConnector";

export interface SyncConnectorProps extends RestConnectorProps {
  collectionName: string;
  // models?: { [key: string]: ModelConnector };
}

export abstract class SyncConnector extends RestConnector {
  collectionName: string;

  constructor(props: SyncConnectorProps) {
    super(props);

    this.collectionName = props.collectionName;
  }

  abstract getModels(): { [key: string]: ModelConnector };

  async sync(
    syncId: string,
    direction: "push" | "pull" | "bidirectional" = "bidirectional"
  ) {
    const modelsOnCollection = await getModels({
      collectionName: this.collectionName,
    });
    let modelsToSync = modelsOnCollection.map((model) => model.name);

    const sync = await getSync({ syncId });

    console.info("sync in CollectionSynchronizer", sync);

    const currentModelName = sync.currentModel?.name ?? undefined;

    console.info(
      "currentModelName in CollectionSynchronizer",
      currentModelName
    );

    if (currentModelName) {
      // slice modelsToSync to only include the currentModelName and subsequent models
      modelsToSync = modelsToSync.slice(modelsToSync.indexOf(currentModelName));
    }

    console.info("modelsToSync in CollectionSynchronizer", modelsToSync);

    for (const modelName of modelsToSync) {
      const model = this.getModels()[modelName];

      if (model) {
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
