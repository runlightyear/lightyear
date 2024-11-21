import { defineCollection, DefineCollectionProps } from "../base/collection";

export interface DefineCrmCollectionProps
  extends Partial<DefineCollectionProps> {}

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
  const { name = "crm", title = "CRM", enabled, models } = props || {};

  return defineCollection({
    name,
    title,
    enabled,
    models: [
      {
        name: "user",
        title: "User",
        schema: {
          type: "object",
          properties: {
            username: { type: ["string", "null"] },
            email: Email,
            firstName: { type: ["string", "null"] },
            lastName: { type: ["string", "null"] },
          },
        },
      },
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
            industry: { type: ["string", "null"] },
            numberOfEmployees: { type: ["string", "null"] },
            ownerId: {
              anyOf: [
                {
                  type: "string",
                  references: "user",
                },
                { type: "null" },
              ],
            },
          },
        },
        matchOn: "name",
      },
      {
        name: "contact",
        title: "Contact",
        schema: {
          type: "object",
          properties: {
            firstName: { type: ["string", "null"] },
            lastName: { type: ["string", "null"] },
            title: { type: ["string", "null"] },
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
            ownerId: {
              anyOf: [
                {
                  type: "string",
                  references: "user",
                },
                { type: "null" },
              ],
            },
          },
        },
        matchOn: "email",
      },
      {
        name: "opportunity",
        title: "Opportunity",
        schema: {
          type: "object",
          properties: {
            name: { type: ["string", "null"] },
            amount: { type: ["string", "null"] },
            closeDate: { type: ["string", "null"] },
            stage: { type: ["string", "null"] },
            accountId: {
              anyOf: [
                {
                  type: "string",
                  references: "account",
                },
                { type: "null" },
              ],
            },
            ownerId: {
              anyOf: [
                {
                  type: "string",
                  references: "user",
                },
                { type: "null" },
              ],
            },
          },
        },
      },
      {
        name: "lead",
        title: "Lead",
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
            ownerId: {
              anyOf: [
                {
                  type: "string",
                  references: "user",
                },
                { type: "null" },
              ],
            },
          },
        },
      },
      {
        name: "call",
        title: "Call",
        schema: {
          type: "object",
          properties: {
            subject: { type: ["string", "null"] },
            content: { type: ["string", "null"] },
            timestamp: { type: ["string", "null"] },
            duration: { type: ["string", "null"] },
          },
        },
      },
      {
        name: "task",
        title: "Task",
        schema: {
          type: "object",
          properties: {
            subject: { type: ["string", "null"] },
            content: { type: ["string", "null"] },
            dueDate: { type: ["string", "null"] },
            status: { type: ["string", "null"] },
            completedDate: { type: ["string", "null"] },
          },
        },
      },
      {
        name: "meeting",
        title: "Meeting",
        schema: {
          type: "object",
          properties: {
            subject: { type: ["string", "null"] },
            description: { type: ["string", "null"] },
            startTime: { type: ["string", "null"] },
            endTime: { type: ["string", "null"] },
          },
        },
      },
      {
        name: "note",
        title: "Note",
        schema: {
          type: "object",
          properties: {
            title: { type: ["string", "null"] },
            content: { type: ["string", "null"] },
            timestamp: { type: ["string", "null"] },
          },
        },
      },
      {
        name: "product",
        title: "Product",
        schema: {
          type: "object",
          properties: {
            name: { type: ["string", "null"] },
            description: { type: ["string", "null"] },
            price: { type: ["string", "null"] },
            code: { type: ["string", "null"] },
          },
        },
      },
      {
        name: "opportunityLineItem",
        title: "Opportunity Line Item",
        schema: {
          type: "object",
          properties: {
            name: { type: ["string", "null"] },
            quantity: { type: ["string", "null"] },
            price: { type: ["string", "null"] },
            opportunityId: {
              type: "string",
              references: "opportunity",
            },
            productId: {
              anyOf: [
                {
                  type: "string",
                  references: "product",
                },
                { type: "null" },
              ],
            },
          },
        },
      },
    ],
  });
}
