import { defineCollection, DefineCollectionProps } from "../base/collection";
import { FromSchema, JSONSchema } from "json-schema-to-ts";
import { ExtendedJSONSchema } from "./types";
export interface DefineCrmCollectionProps
  extends Partial<DefineCollectionProps> {}

const CrmEmailJsonSchema: JSONSchema = { type: ["string", "null"] };

const CrmPhoneJsonSchema: JSONSchema = { type: ["string", "null"] };

const CrmAddressJsonSchema: JSONSchema = {
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

const CrmUserJsonSchema: ExtendedJSONSchema = {
  type: "object",
  properties: {
    username: { type: ["string", "null"] },
    email: CrmEmailJsonSchema,
    firstName: { type: ["string", "null"] },
    lastName: { type: ["string", "null"] },
  },
};

const CrmAccountJsonSchema: ExtendedJSONSchema = {
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
};

const CrmContactJsonSchema: ExtendedJSONSchema = {
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
};

const CrmOpportunityJsonSchema: ExtendedJSONSchema = {
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
};

const CrmLeadJsonSchema: ExtendedJSONSchema = {
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
};

const CrmCallJsonSchema: ExtendedJSONSchema = {
  type: "object",
  properties: {
    subject: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    timestamp: { type: ["string", "null"] },
    duration: { type: ["string", "null"] },
  },
};

const CrmTaskJsonSchema: ExtendedJSONSchema = {
  type: "object",
  properties: {
    subject: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    dueDate: { type: ["string", "null"] },
    status: { type: ["string", "null"] },
    completedDate: { type: ["string", "null"] },
  },
};

const CrmMeetingJsonSchema: ExtendedJSONSchema = {
  type: "object",
  properties: {
    subject: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    startTime: { type: ["string", "null"] },
    endTime: { type: ["string", "null"] },
  },
};

const CrmNoteJsonSchema: ExtendedJSONSchema = {
  type: "object",
  properties: {
    title: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    timestamp: { type: ["string", "null"] },
  },
};

const CrmProductJsonSchema: ExtendedJSONSchema = {
  type: "object",
  properties: {
    name: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    price: { type: ["string", "null"] },
    code: { type: ["string", "null"] },
  },
};

const CrmOpportunityLineItemJsonSchema: ExtendedJSONSchema = {
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
};

export type CrmUser = FromSchema<typeof CrmUserJsonSchema>;
export type CrmAccount = FromSchema<typeof CrmAccountJsonSchema>;
export type CrmContact = FromSchema<typeof CrmContactJsonSchema>;
export type CrmOpportunity = FromSchema<typeof CrmOpportunityJsonSchema>;
export type CrmLead = FromSchema<typeof CrmLeadJsonSchema>;
export type CrmCall = FromSchema<typeof CrmCallJsonSchema>;
export type CrmTask = FromSchema<typeof CrmTaskJsonSchema>;
export type CrmMeeting = FromSchema<typeof CrmMeetingJsonSchema>;
export type CrmNote = FromSchema<typeof CrmNoteJsonSchema>;
export type CrmProduct = FromSchema<typeof CrmProductJsonSchema>;
export type CrmOpportunityLineItem = FromSchema<
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
