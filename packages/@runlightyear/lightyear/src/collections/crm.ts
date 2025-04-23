import { defineCollection, DefineCollectionProps } from "../base/collection";
import { FromSchema, JSONSchema } from "json-schema-to-ts";
import { ExtendedJSONSchema } from "./types";
import { BaseObject } from "../connectors/ModelConnector";
export interface DefineCrmCollectionProps
  extends Partial<DefineCollectionProps> {}

const dogSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    hobbies: { type: "array", items: { type: "string" } },
    favoriteFood: { enum: ["pizza", "taco", "fries"] },
  },
  required: ["name", "age"],
} as const;

type Dog = FromSchema<typeof dogSchema>;

const CrmEmailJsonSchema = { type: ["string", "null"] } as const;

const CrmPhoneJsonSchema = { type: ["string", "null"] } as const;

const CrmAddressJsonSchema = {
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
      additionalProperties: false,
    },
    { type: "null" },
  ],
} as const;

export const CrmUserJsonSchema = {
  type: "object",
  properties: {
    username: { type: ["string", "null"] },
    email: CrmEmailJsonSchema,
    firstName: { type: ["string", "null"] },
    lastName: { type: ["string", "null"] },
  },
  additionalProperties: false,
} as const;

export const CrmAccountJsonSchema = {
  type: "object",
  properties: {
    name: { type: ["string", "null"] },
    website: { type: ["string", "null"] },
    phone: CrmPhoneJsonSchema,
    address: CrmAddressJsonSchema,
    billingAddress: CrmAddressJsonSchema,
    shippingAddress: CrmAddressJsonSchema,
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
  additionalProperties: false,
} as const;

export const CrmContactJsonSchema = {
  type: "object",
  properties: {
    firstName: { type: ["string", "null"] },
    lastName: { type: ["string", "null"] },
    title: { type: ["string", "null"] },
    email: CrmEmailJsonSchema,
    phone: CrmPhoneJsonSchema,
    mobile: CrmPhoneJsonSchema,
    address: CrmAddressJsonSchema,
    mailingAddress: CrmAddressJsonSchema,
    otherAddress: CrmAddressJsonSchema,
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
  additionalProperties: false,
} as const;

export const CrmOpportunityJsonSchema = {
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
  additionalProperties: false,
} as const;

export const CrmLeadJsonSchema = {
  type: "object",
  properties: {
    firstName: { type: ["string", "null"] },
    lastName: { type: ["string", "null"] },
    email: CrmEmailJsonSchema,
    phone: CrmPhoneJsonSchema,
    mobile: CrmPhoneJsonSchema,
    address: CrmAddressJsonSchema,
    mailingAddress: CrmAddressJsonSchema,
    otherAddress: CrmAddressJsonSchema,
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
  additionalProperties: false,
} as const;

export const CrmCallJsonSchema = {
  type: "object",
  properties: {
    subject: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    timestamp: { type: ["string", "null"] },
    duration: { type: ["string", "null"] },
  },
  additionalProperties: false,
} as const;

export const CrmTaskJsonSchema = {
  type: "object",
  properties: {
    subject: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    dueDate: { type: ["string", "null"] },
    status: { type: ["string", "null"] },
    completedDate: { type: ["string", "null"] },
  },
  additionalProperties: false,
} as const;

export const CrmMeetingJsonSchema = {
  type: "object",
  properties: {
    subject: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    startTime: { type: ["string", "null"] },
    endTime: { type: ["string", "null"] },
  },
  additionalProperties: false,
} as const;

export const CrmNoteJsonSchema = {
  type: "object",
  properties: {
    title: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    timestamp: { type: ["string", "null"] },
  },
  additionalProperties: false,
} as const;

export const CrmProductJsonSchema = {
  type: "object",
  properties: {
    name: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    price: { type: ["string", "null"] },
    code: { type: ["string", "null"] },
  },
  additionalProperties: false,
} as const;

export const CrmOpportunityLineItemJsonSchema = {
  type: "object",
  properties: {
    name: { type: ["string", "null"] },
    quantity: { type: ["string", "null"] },
    price: { type: ["string", "null"] },
    opportunityId: {
      anyOf: [
        {
          type: "string",
          references: "opportunity",
        },
        { type: "null" },
      ],
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
  additionalProperties: false,
} as const;

export type CrmUserDataType = FromSchema<typeof CrmUserJsonSchema>;
export type CrmUserType = BaseObject & {
  data: CrmUserDataType;
};
export type CrmAccountDataType = FromSchema<typeof CrmAccountJsonSchema>;
export type CrmAccountType = BaseObject & {
  data: CrmAccountDataType;
};
export type CrmContactDataType = FromSchema<typeof CrmContactJsonSchema>;
export type CrmContactType = BaseObject & {
  data: CrmContactDataType;
};
export type CrmOpportunityDataType = FromSchema<
  typeof CrmOpportunityJsonSchema
>;
export type CrmLeadDataType = FromSchema<typeof CrmLeadJsonSchema>;
export type CrmCallDataType = FromSchema<typeof CrmCallJsonSchema>;
export type CrmTaskDataType = FromSchema<typeof CrmTaskJsonSchema>;
export type CrmMeetingDataType = FromSchema<typeof CrmMeetingJsonSchema>;
export type CrmNoteDataType = FromSchema<typeof CrmNoteJsonSchema>;
export type CrmProductDataType = FromSchema<typeof CrmProductJsonSchema>;
export type CrmOpportunityLineItemDataType = FromSchema<
  typeof CrmOpportunityLineItemJsonSchema
>;

export function defineCrmCollection(props?: DefineCrmCollectionProps) {
  const { name = "crm", title = "CRM", enabled, models = [] } = props || {};

  return defineCollection({
    name,
    title,
    enabled,
    models: [
      {
        name: "user",
        title: "User",
        schema: CrmUserJsonSchema,
      },
      {
        name: "account",
        title: "Account",
        schema: CrmAccountJsonSchema,
        matchOn: "name",
      },
      {
        name: "contact",
        title: "Contact",
        schema: CrmContactJsonSchema,
        matchOn: "email",
      },
      {
        name: "opportunity",
        title: "Opportunity",
        schema: CrmOpportunityJsonSchema,
      },
      {
        name: "lead",
        title: "Lead",
        schema: CrmLeadJsonSchema,
        matchOn: "email",
      },
      {
        name: "call",
        title: "Call",
        schema: CrmCallJsonSchema,
      },
      {
        name: "task",
        title: "Task",
        schema: CrmTaskJsonSchema,
      },
      {
        name: "meeting",
        title: "Meeting",
        schema: CrmMeetingJsonSchema,
      },
      {
        name: "note",
        title: "Note",
        schema: CrmNoteJsonSchema,
      },
      {
        name: "product",
        title: "Product",
        schema: CrmProductJsonSchema,
      },
      {
        name: "opportunityLineItem",
        title: "Opportunity Line Item",
        schema: CrmOpportunityLineItemJsonSchema,
      },
      ...(models || []),
    ],
  });
}
