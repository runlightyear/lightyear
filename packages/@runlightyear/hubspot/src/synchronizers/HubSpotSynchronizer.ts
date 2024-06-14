import { HubSpot } from "../HubSpot";
import {
  CollectionSynchronizer,
  CollectionSynchronizerProps,
  ModelSynchronizer,
  ModelSynchronizerProps,
} from "@runlightyear/lightyear";
import { ContactSynchronizer } from "./ContactSynchronizer";
import { AccountSynchronizer } from "./AccountSynchronizer";

export interface HubSpotSynchronizerProps
  extends Omit<CollectionSynchronizerProps, "collection"> {
  collection?: string;
}

export class HubSpotSynchronizer extends CollectionSynchronizer {
  hubspot: HubSpot;

  constructor(props: HubSpotSynchronizerProps) {
    const { collection = "crm", ...rest } = props;
    super({ collection, ...rest });

    if (props.connector instanceof HubSpot) {
      this.hubspot = props.connector;
    } else {
      throw new Error("HubSpotSynchronizer requires a HubSpot connector");
    }
  }

  getDefaultModelSynchronizers(): {
    [p: string]: (props: ModelSynchronizerProps) => ModelSynchronizer<any>;
  } {
    return {
      account: (props) => new AccountSynchronizer(props),
      contact: (props) => new ContactSynchronizer(props),
    };
  }
}
