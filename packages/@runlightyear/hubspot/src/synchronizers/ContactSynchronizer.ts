import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class ContactSynchronizer extends HubSpotModelSynchronizer {
  getNoun() {
    return "contact";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      firstName: "properties.firstname",
      lastName: "properties.lastname",
      title: "properties.jobtitle",
      email: "properties.email",
      phone: "properties.phone",
      mobile: "properties.mobilephone",
      address: (source: any) => ({
        street: source.properties.address,
        street2: source.properties.address2,
        city: source.properties.city,
        state: source.properties.state,
        postalCode: source.properties.zip,
        country: source.properties.country,
      }),
      accountId: (source: any) =>
        source.properties.associatedcompanyid === ""
          ? null
          : source.properties.associatedcompanyid ?? null,
      ownerId: (source: any) =>
        source.properties.hubspot_owner_id === ""
          ? null
          : source.properties.hubspot_owner_id ?? null,
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      firstname: "firstName",
      lastname: "lastName",
      jobtitle: "title",
      email: "email",
      phone: "phone",
      mobilephone: "mobile",
      address: "address.street",
      address2: "address.street2",
      city: "address.city",
      state: "address.state",
      zip: "address.postalCode",
      country: "address.country",
      associatedcompanyid: "accountId",
      hubspot_owner_id: "ownerId",
    };
  }
}
