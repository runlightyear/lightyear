import {
  HubSpotModelSynchronizer,
  HubSpotModelSynchronizerProps,
} from "./HubSpotModelSynchronizer";

export interface AccountSynchronizerProps
  extends HubSpotModelSynchronizerProps {}

// force recompile

export class AccountSynchronizer extends HubSpotModelSynchronizer {
  constructor(props: AccountSynchronizerProps) {
    const { model = "account", ...rest } = props;
    super({ model, ...rest });
  }

  getNoun(): string {
    return "company";
  }

  getPluralNoun(): string {
    return "companies";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      name: "properties.name",
      domain: "properties.domain",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      name: "name",
      domain: "domain",
    };
  }
}
