import { defineCollection } from "../base/collection";

export interface DefineCrmCollectionProps {
  enable: {
    [name: "account" | "contact" | string]: boolean;
  };
}

const Email = { type: ["string", "null"] };

const Phone = { type: ["string", "null"] };

const Address = {
  anyOf: [
    {
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
    },
    { type: "null" },
  ],
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
            website: { type: ["string", "null"] },
            phone: Phone,
            address: Address,
            billingAddress: Address,
            shippingAddress: Address,
          },
        },
        matchOn: { OR: ["name", "website"] },
      },
      {
        name: "contact",
        title: "Contact",
        schema: {
          type: "object",
          properties: {
            firstName: { type: ["string", "null"] },
            lastName: { type: ["string", "null"] },
            email: Email,
            phone: Phone,
            mobile: Phone,
            address: Address,
            mailingAddress: Address,
            otherAddress: Address,
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
        matchOn: "email",
      },
    ],
  });
}
