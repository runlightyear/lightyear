/**
 * HubSpot Sync Connector Example
 *
 * This example demonstrates a complete sync connector for HubSpot CRM
 * with support for Accounts (Companies), Contacts, and Deals including
 * relationships between objects and bulk operations.
 */

import { z } from "zod";
import {
  defineCollection,
  defineModel,
  createRestConnector,
  createSyncConnector,
  createListConfig,
  PaginationStrategies,
} from "../src/builders";

// Define schemas for HubSpot objects
const accountSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    domain: { type: "string" },
    industry: { type: "string" },
    numberOfEmployees: { type: "number" },
    annualRevenue: { type: "number" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "name"],
  additionalProperties: false,
} as const;

const contactSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    email: { type: "string", format: "email" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phone: { type: "string" },
    accountId: { type: "string" },
    jobTitle: { type: "string" },
    lifecycleStage: {
      type: "string",
      enum: [
        "subscriber",
        "lead",
        "marketingqualifiedlead",
        "salesqualifiedlead",
        "opportunity",
        "customer",
        "evangelist",
      ],
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "email"],
  additionalProperties: false,
} as const;

const dealSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    dealName: { type: "string" },
    amount: { type: "number" },
    stage: { type: "string" },
    closeDate: { type: "string", format: "date" },
    accountId: { type: "string" },
    contactIds: {
      type: "array",
      items: { type: "string" },
    },
    probability: { type: "number", minimum: 0, maximum: 1 },
    dealType: {
      type: "string",
      enum: ["newbusiness", "existingbusiness", "renewal"],
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "dealName", "stage"],
  additionalProperties: false,
} as const;

// Define models
const accountModel = defineModel("account", accountSchema)
  .withTitle("Company")
  .withMatchPattern({ key: "domain", type: "unique" })
  .deploy();

const contactModel = defineModel("contact", contactSchema)
  .withTitle("Contact")
  .withMatchPattern({ key: "email", type: "unique" })
  .deploy();

const dealModel = defineModel("deal", dealSchema)
  .withTitle("Deal")
  .deploy();

// Create the CRM collection
const crmCollection = defineCollection("crm")
  .withTitle("HubSpot CRM")
  .addModel(accountModel)
  .addModel(contactModel)
  .addModel(dealModel)
  .deploy();

// Create the REST connector
const restConnector = createRestConnector()
  .withBaseUrl("https://api.hubapi.com")
  .addHeader("Authorization", "Bearer YOUR_HUBSPOT_API_KEY")
  .build();

// Define HubSpot API response schemas
const hubspotListResponseSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      properties: z.record(z.any()),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  paging: z
    .object({
      next: z
        .object({
          after: z.string(),
          link: z.string(),
        })
        .optional(),
    })
    .optional(),
});

const hubspotBatchResponseSchema = z.object({
  status: z.string(),
  results: z.array(
    z.object({
      id: z.string(),
      properties: z.record(z.any()),
    })
  ),
  startedAt: z.string(),
  completedAt: z.string(),
});

// Create the sync connector with HubSpot-specific pagination
const hubspotSyncConnector = createSyncConnector(restConnector, crmCollection)
  .withDefaultPagination("hubspot")

  // Account (Company) connector
  .addModelConnector("account")
  .withList(
    "/crm/v3/objects/companies",
    createListConfig({
      responseSchema: hubspotListResponseSchema,
      transform: (response) =>
        response.results.map((company) => ({
          id: company.id,
          name: company.properties.name || "",
          domain: company.properties.domain || "",
          industry: company.properties.industry || "",
          numberOfEmployees:
            parseInt(company.properties.numberofemployees) || 0,
          annualRevenue: parseFloat(company.properties.annualrevenue) || 0,
          createdAt: company.createdAt,
          updatedAt: company.updatedAt,
        })),
    })
  )
  .withCreate("/crm/v3/objects/companies", {
    transform: (account) => ({
      properties: {
        name: account.name,
        domain: account.domain,
        industry: account.industry,
        numberofemployees: account.numberOfEmployees?.toString(),
        annualrevenue: account.annualRevenue?.toString(),
      },
    }),
    responseTransform: (response) => ({ id: response.id }),
  })
  .withUpdate((id) => `/crm/v3/objects/companies/${id}`, {
    transform: (account) => ({
      properties: {
        name: account.name,
        domain: account.domain,
        industry: account.industry,
        numberofemployees: account.numberOfEmployees?.toString(),
        annualrevenue: account.annualRevenue?.toString(),
      },
    }),
  })
  .withDelete((id) => `/crm/v3/objects/companies/${id}`)
  .withBulkCreate("/crm/v3/objects/companies/batch/create", {
    maxBatchSize: 100,
    transform: (accounts) => ({
      inputs: accounts.map((account) => ({
        properties: {
          name: account.name,
          domain: account.domain,
          industry: account.industry,
          numberofemployees: account.numberOfEmployees?.toString(),
          annualrevenue: account.annualRevenue?.toString(),
        },
      })),
    }),
    responseTransform: (response, accounts) =>
      accounts.map((account, index) => ({
        ...account,
        id: response.results[index]?.id || `error-${index}`,
      })),
  })
  .and() // Return to builder

  // Contact connector
  .addModelConnector("contact")
  .withList(
    "/crm/v3/objects/contacts",
    createListConfig({
      responseSchema: hubspotListResponseSchema,
      transform: (response) =>
        response.results.map((contact) => ({
          id: contact.id,
          email: contact.properties.email || "",
          firstName: contact.properties.firstname || "",
          lastName: contact.properties.lastname || "",
          phone: contact.properties.phone || "",
          accountId: contact.properties.associatedcompanyid || "",
          jobTitle: contact.properties.jobtitle || "",
          lifecycleStage: contact.properties.lifecyclestage || "subscriber",
          createdAt: contact.createdAt,
          updatedAt: contact.updatedAt,
        })),
    })
  )
  .withCreate("/crm/v3/objects/contacts", {
    transform: (contact) => ({
      properties: {
        email: contact.email,
        firstname: contact.firstName,
        lastname: contact.lastName,
        phone: contact.phone,
        jobtitle: contact.jobTitle,
        lifecyclestage: contact.lifecycleStage,
      },
    }),
    responseTransform: (response) => ({ id: response.id }),
  })
  .withUpdate((id) => `/crm/v3/objects/contacts/${id}`, {
    transform: (contact, previous) => {
      const properties: any = {};
      if (contact.email !== previous?.email) properties.email = contact.email;
      if (contact.firstName !== previous?.firstName)
        properties.firstname = contact.firstName;
      if (contact.lastName !== previous?.lastName)
        properties.lastname = contact.lastName;
      if (contact.phone !== previous?.phone) properties.phone = contact.phone;
      if (contact.jobTitle !== previous?.jobTitle)
        properties.jobtitle = contact.jobTitle;
      if (contact.lifecycleStage !== previous?.lifecycleStage)
        properties.lifecyclestage = contact.lifecycleStage;
      return { properties };
    },
  })
  .withDelete((id) => `/crm/v3/objects/contacts/${id}`)
  .and() // Return to builder

  // Deal connector
  .addModelConnector("deal")
  .withList(
    "/crm/v3/objects/deals",
    createListConfig({
      responseSchema: hubspotListResponseSchema,
      transform: (response) =>
        response.results.map((deal) => ({
          id: deal.id,
          dealName: deal.properties.dealname || "",
          amount: parseFloat(deal.properties.amount) || 0,
          stage: deal.properties.dealstage || "",
          closeDate: deal.properties.closedate || "",
          accountId: deal.properties.associatedcompanyid || "",
          contactIds: deal.properties.associatedcontactids?.split(";") || [],
          probability: parseFloat(deal.properties.hs_probability) || 0,
          dealType: deal.properties.dealtype || "newbusiness",
          createdAt: deal.createdAt,
          updatedAt: deal.updatedAt,
        })),
    })
  )
  .withCreate("/crm/v3/objects/deals", {
    transform: (deal) => ({
      properties: {
        dealname: deal.dealName,
        amount: deal.amount?.toString(),
        dealstage: deal.stage,
        closedate: deal.closeDate,
        dealtype: deal.dealType,
        hs_probability: deal.probability?.toString(),
      },
    }),
    responseTransform: (response) => ({ id: response.id }),
  })
  .withUpdate((id) => `/crm/v3/objects/deals/${id}`, {
    transform: (deal) => ({
      properties: {
        dealname: deal.dealName,
        amount: deal.amount?.toString(),
        dealstage: deal.stage,
        closedate: deal.closeDate,
        dealtype: deal.dealType,
        hs_probability: deal.probability?.toString(),
      },
    }),
  })
  .withDelete((id) => `/crm/v3/objects/deals/${id}`)
  .and() // Return to builder

  .build();

// Example usage with relationship management
async function exampleUsage() {
  // Get model connectors
  const accountConnector = hubspotSyncConnector.getModelConnector("account");
  const contactConnector = hubspotSyncConnector.getModelConnector("contact");
  const dealConnector = hubspotSyncConnector.getModelConnector("deal");

  if (!accountConnector || !contactConnector || !dealConnector) {
    console.error("Failed to get connectors");
    return;
  }

  // List accounts with pagination
  console.log("Fetching accounts...");
  const accountsPage1 = await accountConnector.list({
    type: "cursor",
    limit: 100,
  });
  console.log(`Found ${accountsPage1.data.length} accounts`);

  // Create a new account
  const newAccount = await accountConnector.create({
    id: "temp",
    name: "Acme Corporation",
    domain: "acme.com",
    industry: "Technology",
    numberOfEmployees: 500,
    annualRevenue: 10000000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("Created account:", newAccount.name);

  // Bulk create contacts
  console.log("\nBulk creating contacts...");
  const contactsToCreate = [
    {
      id: "temp1",
      email: "john.doe@acme.com",
      firstName: "John",
      lastName: "Doe",
      phone: "+1-555-0100",
      accountId: newAccount.id,
      jobTitle: "CEO",
      lifecycleStage: "customer" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "temp2",
      email: "jane.smith@acme.com",
      firstName: "Jane",
      lastName: "Smith",
      phone: "+1-555-0101",
      accountId: newAccount.id,
      jobTitle: "CTO",
      lifecycleStage: "customer" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const bulkResult = await contactConnector.bulkCreate(contactsToCreate);
  console.log(`Created ${bulkResult.successful.length} contacts`);
  if (bulkResult.failed.length > 0) {
    console.error(`Failed to create ${bulkResult.failed.length} contacts`);
  }

  // Create a deal associated with the account and contacts
  const newDeal = await dealConnector.create({
    id: "temp",
    dealName: "Acme Enterprise License",
    amount: 250000,
    stage: "contractsent",
    closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    accountId: newAccount.id,
    contactIds: bulkResult.successful.map((c) => c.id),
    probability: 0.8,
    dealType: "newbusiness",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("Created deal:", newDeal.dealName);

  // Fetch all deals for reporting
  console.log("\nFetching all deals...");
  const allDeals = await dealConnector.listAll({ maxPages: 10 });
  const totalDealValue = allDeals.reduce((sum, deal) => sum + deal.amount, 0);
  console.log(
    `Total deals: ${
      allDeals.length
    }, Total value: $${totalDealValue.toLocaleString()}`
  );

  // Update deal stage
  const updatedDeal = await dealConnector.update({
    ...newDeal,
    stage: "closedwon",
    probability: 1,
  });
  console.log("Deal closed!");
}

// Helper function to sync all data
async function syncAllData() {
  const accountConnector = hubspotSyncConnector.getModelConnector("account");
  const contactConnector = hubspotSyncConnector.getModelConnector("contact");
  const dealConnector = hubspotSyncConnector.getModelConnector("deal");

  if (!accountConnector || !contactConnector || !dealConnector) {
    throw new Error("Failed to get connectors");
  }

  console.log("Starting full sync...");

  // Sync all accounts
  const accounts = await accountConnector.listAll();
  console.log(`Synced ${accounts.length} accounts`);

  // Sync all contacts
  const contacts = await contactConnector.listAll();
  console.log(`Synced ${contacts.length} contacts`);

  // Sync all deals
  const deals = await dealConnector.listAll();
  console.log(`Synced ${deals.length} deals`);

  return { accounts, contacts, deals };
}

// Export for use in other parts of your application
export { hubspotSyncConnector, crmCollection, syncAllData };
