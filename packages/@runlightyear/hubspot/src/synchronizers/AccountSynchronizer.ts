import {
  HubSpotModelSynchronizer,
  HubSpotModelSynchronizerProps,
} from "./HubSpotModelSynchronizer";

export interface AccountSynchronizerProps
  extends HubSpotModelSynchronizerProps {}

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
      website: "properties.website",
      phone: "properties.phone",
      address: (source: any) => ({
        street: source.properties.address,
        street2: source.properties.address2,
        city: source.properties.city,
        state: source.properties.state,
        postalCode: source.properties.zip,
        country: source.properties.country,
      }),
      industry: "properties.industry",
      numberOfEmployees: "properties.numberofemployees",
      ownerId: (source: any) => {
        return source.properties.hubspot_owner_id === ""
          ? null
          : source.properties.hubspot_owner_id ?? null;
      },
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      name: "name",
      website: "website",
      phone: "phone",
      street: "address.street",
      street2: "address.street2",
      city: "address.city",
      state: "address.state",
      zip: "address.postalCode",
      country: "address.country",
      industry: "industry",
      numberofemployees: "numberOfEmployees",
      hubspot_owner_id: "ownerId",
    };
  }
}
