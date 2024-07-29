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
      email: "Email",
      phone: "Phone",
      mobile: "MobilePhone",
      address: (source: any) =>
        source.MailingAddress
          ? {
              street: source.MailingAddress.street,
              city: source.MailingAddress.city,
              state: source.MailingAddress.state,
              postalCode: source.MailingAddress.postalCode,
              country: source.MailingAddress.country,
            }
          : null,
      accountId: "AccountId",
    };
  }

  getFromObjectData() {
    return {
      ...super.getFromObjectData(),
      FirstName: "firstName",
      LastName: "lastName",
      Email: "email",
      Phone: "phone",
      MobilePhone: "mobile",
      MailingAddress: (object: any) =>
        object.address
          ? {
              street: object.address.street,
              city: object.address.city,
              state: object.address.state,
              postalCode: object.address.postalCode,
              country: object.address.country,
            }
          : null,
      AccountId: "accountId",
    };
  }
}
