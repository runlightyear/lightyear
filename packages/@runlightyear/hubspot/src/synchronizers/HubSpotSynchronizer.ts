import { HubSpot } from "../HubSpot";
import {
  CollectionSynchronizer,
  CollectionSynchronizerProps,
  ModelSynchronizer,
} from "@runlightyear/lightyear";
import { ContactSynchronizer } from "./ContactSynchronizer";
import { AccountSynchronizer } from "./AccountSynchronizer";

export interface HubSpotSynchronizerProps extends CollectionSynchronizerProps {
  hubspot: HubSpot;
}

export class HubSpotSynchronizer extends CollectionSynchronizer {
  hubspot: HubSpot;

  constructor(props: HubSpotSynchronizerProps) {
    const { hubspot, models = [] } = props;
    super(props);
    this.hubspot = hubspot;
  }

  async getModel(name: string) {
    if (!(name in this.models)) {
      throw new Error(`Model not configured: ${name}`);
    }

    const modelDef = this.models[name];

    console.log("modelDef", modelDef);

    switch (name) {
      case "account": {
        if (modelDef === true) {
          return new AccountSynchronizer({
            hubspot: this.hubspot,
            collection: this.collection,
            model: "account",
          });
        } else if (modelDef instanceof ModelSynchronizer) {
          return modelDef;
        } else {
          return new AccountSynchronizer({
            hubspot: this.hubspot,
            collection: this.collection,
            model: "account",
            ...modelDef,
          });
        }
      }
      case "contact": {
        if (modelDef === true) {
          return new ContactSynchronizer({
            hubspot: this.hubspot,
            collection: this.collection,
            model: "contact",
          });
        } else if (modelDef instanceof ModelSynchronizer) {
          return modelDef;
        } else {
          return new ContactSynchronizer({
            hubspot: this.hubspot,
            collection: this.collection,
            model: "contact",
            ...modelDef,
          });
        }
      }
      default: {
        if (modelDef instanceof ModelSynchronizer) {
          return modelDef;
        }
        throw new Error(`Model not supported: ${name}`);
      }
    }
  }
}
