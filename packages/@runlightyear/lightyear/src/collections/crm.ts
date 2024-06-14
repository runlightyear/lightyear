import { defineCollection } from "../base/collection";

export interface DefineCrmCollectionProps {
  models: {
    [name: string]: boolean;
  };
}

const EmailAddress = {
  type: "object",
  properties: {
    type: { type: ["string", "null"] },
    address: { type: "string" },
  },
};

const PhoneNumber = {
  type: "object",
  properties: {
    type: { type: ["string", "null"] },
    number: { type: "string" },
  },
};

const Address = {
  type: "object",
  properties: {
    type: { type: ["string", "null"] },
    street: { type: ["string", "null"] },
    street2: { type: ["string", "null"] },
    city: { type: ["string", "null"] },
    state: { type: ["string", "null"] },
    postalCode: { type: ["string", "null"] },
    country: { type: ["string", "null"] },
  },
};

export function defineCrmCollection(props?: DefineCrmCollectionProps) {
  return defineCollection({
    name: "crm",
    title: "CRM",
    models: [
      {
        name: "account",
        title: "Account",
        schema: {
          type: "object",
          properties: {
            name: { type: ["string", "null"] },
            domain: { type: ["string", "null"] },
            addresses: {
              type: "array",
              items: Address,
            },
            phoneNumbers: {
              type: "array",
              items: PhoneNumber,
            },
          },
        },
        matchOn: { OR: ["name", "domain"] },
      },
      {
        name: "contact",
        title: "Contact",
        schema: {
          type: "object",
          properties: {
            firstName: { type: ["string", "null"] },
            lastName: { type: ["string", "null"] },
            emailAddresses: {
              type: "array",
              items: EmailAddress,
            },
            phoneNumbers: {
              type: "array",
              items: PhoneNumber,
            },
            accountId: {
              anyOf: [
                {
                  type: "string",
                  references: "account",
                },
                { type: "null" },
              ],
            },
          },
        },
        matchOn: {
          OVERLAP: "$.emailAddresses[*].address",
        },
      },
    ],
  });
}
