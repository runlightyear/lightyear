import { Salesforce } from "../Salesforce";
import { AccountSynchronizer } from "./AccountSynchronizer";
import {
  CollectionSynchronizer,
  CollectionSynchronizerProps,
  ModelSynchronizer,
  ModelSynchronizerProps,
} from "@runlightyear/lightyear";
import { ContactSynchronizer } from "./ContactSynchronizer";

export interface SalesforceSyncProps
  extends Omit<CollectionSynchronizerProps, "collection"> {
  collection?: string;
}

export class SalesforceSynchronizer extends CollectionSynchronizer {
  salesforce: Salesforce;

  constructor(props: SalesforceSyncProps) {
    const { collection = "crm", ...rest } = props;
    super({ collection, ...rest });

    if (props.connector instanceof Salesforce) {
      this.salesforce = props.connector;
    } else {
      throw new Error("SalesforceSynchronizer requires a Salesforce connector");
    }
  }

  getDefaultModelSynchronizers(): {
    [name: string]: (props: ModelSynchronizerProps) => ModelSynchronizer<any>;
  } {
    return {
      account: (props) => new AccountSynchronizer(props),
      contact: (props) => new ContactSynchronizer(props),
    };
  }
}
