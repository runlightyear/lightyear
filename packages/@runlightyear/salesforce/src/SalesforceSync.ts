import { AccountSync } from "./sync/AccountSync";
import { ContactSync } from "./sync/ContactSync";
import { CollectionSyncConnector } from "@runlightyear/lightyear/src/connectors/CollectionSyncConnector";
import { Salesforce } from "./Salesforce";
import { ModelSyncConnector } from "@runlightyear/lightyear/src/connectors/ModelSyncConnector";

export interface SalesforceSyncProps {
  salesforce: Salesforce;
  customApp: string;
  managedUserExternalId: string;
  collection?: string;
  models?: Array<ModelSyncConnector>;
}

export class SalesforceSync extends CollectionSyncConnector {
  salesforce: Salesforce;
  customApp: string;
  managedUserExternalId: string;

  constructor(props: SalesforceSyncProps) {
    const {
      salesforce,
      customApp,
      managedUserExternalId,
      collection = "crm",
      models = [],
    } = props;

    const modelProps = {
      salesforce,
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

    this.salesforce = salesforce;
    this.customApp = customApp;
    this.managedUserExternalId = managedUserExternalId;
  }
}
