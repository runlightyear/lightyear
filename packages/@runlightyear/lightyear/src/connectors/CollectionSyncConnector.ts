import { SyncConnector } from "./SyncConnector";
import { ModelSyncConnector } from "./ModelSyncConnector";

export interface CollectionSyncConnectorProps {
  collection: string;
  models: Array<ModelSyncConnector>;
}

export abstract class CollectionSyncConnector extends SyncConnector {
  collection: string;
  models: Array<ModelSyncConnector>;

  constructor(props: CollectionSyncConnectorProps) {
    const { collection, models, ...rest } = props;
    super(rest);
    this.collection = props.collection;
    this.models = props.models;
  }

  async fullSync() {
    for (const model of this.models) {
      await model.fullSync();
    }
  }

  async incrementalSync({ since }: { since: string }) {
    for (const model of this.models) {
      await model.incrementalSync({ since });
    }
  }

  async hardDeleteSync() {
    for (const model of this.models) {
      await model.hardDeleteSync();
    }
  }
}
