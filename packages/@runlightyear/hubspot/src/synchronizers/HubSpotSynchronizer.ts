import { HubSpot } from "../HubSpot";
import {
  CollectionSynchronizer,
  CollectionSynchronizerProps,
  ModelSynchronizer,
  ModelSynchronizerProps,
} from "@runlightyear/lightyear";
import { ContactSynchronizer } from "./ContactSynchronizer";
import { AccountSynchronizer } from "./AccountSynchronizer";
import { OpportunitySynchronizer } from "./OpportunitySynchronizer";
import { NoteSynchronizer } from "./NoteSynchronizer";
import { MeetingSynchronizer } from "./MeetingSynchronizer";
import { CallSynchronizer } from "./CallSynchronizer";
import { TaskSynchronizer } from "./TaskSynchronizer";
import { UserSynchronizer } from "./UserSynchronizer";

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
      user: (props) => new UserSynchronizer(props),
      account: (props) => new AccountSynchronizer(props),
      contact: (props) => new ContactSynchronizer(props),
      opportunity: (props) => new OpportunitySynchronizer(props),
      call: (props) => new CallSynchronizer(props),
      note: (props) => new NoteSynchronizer(props),
      meeting: (props) => new MeetingSynchronizer(props),
      task: (props) => new TaskSynchronizer(props),
    };
  }
}
