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
      accountId: "properties.associatedcompanyid",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      firstname: "firstName",
      lastname: "lastName",
      email: "email",
      phone: "phone",
      mobilephone: "mobile",
      address: "street",
      address2: "street2",
      city: "city",
      state: "state",
      zip: "postalCode",
      country: "country",
      associatedcompanyid: "accountId",
    };
  }
}
