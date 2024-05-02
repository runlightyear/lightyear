import { HubSpot } from "./HubSpot";
import { ModelSyncConnector } from "@runlightyear/lightyear/src/connectors/ModelSyncConnector";
import { CollectionSyncConnector } from "@runlightyear/lightyear/src/connectors/CollectionSyncConnector";
import { AccountSync } from "./sync/AccountSync";
import { ContactSync } from "./sync/ContactSync";

export interface HubSpotSyncProps {
  hubspot: HubSpot;
  customApp: string;
  managedUserExternalId: string;
  collection?: string;
  models?: Array<ModelSyncConnector>;
}

export class HubSpotSync extends CollectionSyncConnector {
  hubspot: HubSpot;
  customApp: string;
  managedUserExternalId: string;

  constructor(props: HubSpotSyncProps) {
    const {
      hubspot,
      customApp,
      managedUserExternalId,
      collection = "crm",
      models = [],
    } = props;

    const modelProps = {
      hubspot,
      collection,
      customApp,
      managedUserExternalId,
    };

    super({
      collection,
      models: [
        ...models,
        new AccountSync({ ...modelProps, model: "account" }),
        new ContactSync({ ...modelProps, model: "contact" }),
      ],
    });

    this.hubspot = hubspot;
    this.customApp = customApp;
    this.managedUserExternalId = managedUserExternalId;
  }
}
