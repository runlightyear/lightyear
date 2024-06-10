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
      emailAddresses: (external: any) => {
        if (external.properties.email) {
          return [{ address: external.properties.email }];
        }

        return [];
      },
      accountId: "properties.associatedcompanyid",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      firstname: "firstName",
      lastname: "lastName",
      email: (source: any) => source.emailAddresses[0]?.address,
      associatedcompanyid: "accountId",
    };
  }
}
