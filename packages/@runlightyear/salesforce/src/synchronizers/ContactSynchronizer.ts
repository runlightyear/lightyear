import { SalesforceModelSynchronizer } from "./SalesforceModelSynchronizer";

export class ContactSynchronizer extends SalesforceModelSynchronizer {
  getNoun(): string {
    return "Contact";
  }

  getToObjectData() {
    return {
      ...super.getToObjectData(),
      firstName: "FirstName",
      lastName: "LastName",
      emailAddresses: (external: any) => {
        if (external.Email && external.Email.length > 0) {
          return [{ address: external.Email }];
        }
        return [];
      },
      phoneNumbers: (external: any) => {
        if (external.Phone && external.Phone.length > 0) {
          return [{ number: external.Phone }];
        }
        return [];
      },
      accountId: "AccountId",
    };
  }

  getFromObjectData() {
    return {
      ...super.getFromObjectData(),
      FirstName: "firstName",
      LastName: "lastName",
      Email: (object: any) => object.emailAddresses[0]?.address,
      Phone: (object: any) => object.phoneNumbers[0]?.number,
      AccountId: "accountId",
    };
  }
}
