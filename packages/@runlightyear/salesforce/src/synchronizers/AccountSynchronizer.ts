import { SalesforceModelSynchronizer } from "./SalesforceModelSynchronizer";

export class AccountSynchronizer extends SalesforceModelSynchronizer {
  getNoun(): string {
    return "Account";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      name: "Name",
      domain: (source: any) =>
        source.Website?.replace("http://", "")
          .replace("https://", "")
          .replace("www.", "") ?? null,
      website: "Website",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      Name: "name",
      Website: "website",
    };
  }
}
