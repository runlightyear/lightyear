import { SalesforceModelSynchronizer } from "./SalesforceModelSynchronizer";

export class AccountSynchronizer extends SalesforceModelSynchronizer {
  getNoun(): string {
    return "Account";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      name: "Name",
      website: "Website",
      phone: "Phone",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      Name: "name",
      Website: "website",
      Phone: "phone",
    };
  }
}
