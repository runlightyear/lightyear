import { Salesforce } from "../Salesforce";
import { AccountSynchronizer } from "./AccountSynchronizer";
import {
  CollectionSynchronizer,
  CollectionSynchronizerProps,
  ModelSynchronizer,
  ModelSynchronizerProps,
} from "@runlightyear/lightyear";
import { ContactSynchronizer } from "./ContactSynchronizer";

export interface SalesforceSyncProps extends CollectionSynchronizerProps {
  salesforce: Salesforce;
}

export class SalesforceSynchronizer extends CollectionSynchronizer {
  salesforce: Salesforce;

  constructor(props: SalesforceSyncProps) {
    const { salesforce, ...rest } = props;
    super(rest);
    this.salesforce = salesforce;
  }

  async getModel(name: string) {
    if (!(name in this.models)) {
      throw new Error(`Model not configured: ${name}`);
    }

    const modelDef = this.models[name];

    switch (name) {
      case "account": {
        if (modelDef === true) {
          return new AccountSynchronizer({
            salesforce: this.salesforce,
            collection: this.collection,
            model: "account",
          });
        } else if (modelDef instanceof ModelSynchronizer) {
          return modelDef;
        } else {
          return new AccountSynchronizer({
            salesforce: this.salesforce,
            collection: this.collection,
            model: "account",
            ...modelDef,
          });
        }
      }
      case "contact": {
        if (modelDef === true) {
          return new ContactSynchronizer({
            salesforce: this.salesforce,
            collection: this.collection,
            model: "contact",
          });
        } else if (modelDef instanceof ModelSynchronizer) {
          return modelDef;
        } else {
          return new ContactSynchronizer({
            salesforce: this.salesforce,
            collection: this.collection,
            model: "contact",
            ...modelDef,
          });
        }
      }
      default: {
        if (modelDef instanceof ModelSynchronizer) {
          return modelDef;
        } else {
          throw new Error(
            `Must supply model synchronizer instance for custom models: ${name}`
          );
        }
      }
    }
  }
}
