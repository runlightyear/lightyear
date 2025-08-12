/**
 * HubSpot Full Sync Example
 *
 * This example shows a complete HubSpot CRM sync implementation with:
 * - Contacts, Companies, and Deals
 * - Associations between objects
 * - HubSpot's specific API patterns
 * - Bulk operations
 * - Custom properties
 */

import { z } from "zod";
import {
  defineTypedCollection,
  defineRestConnector,
  createSyncConnector,
  match,
  PaginationStrategies,
} from "../src";
import type { ExtractModelTypes, BulkResponse } from "../src";

// 1. Define HubSpot CRM collection
const hubspotCrmCollection = defineTypedCollection("hubspot-crm")
  .addModel(
    "contact",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        firstName: { type: ["string", "null"] },
        lastName: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        company: { type: ["string", "null"] },
        jobTitle: { type: ["string", "null"] },
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
            "other",
          ] as const,
        },
        leadStatus: { type: ["string", "null"] },
        ownerId: { type: ["string", "null"] },
        associatedCompanyIds: {
          type: "array",
          items: { type: "string" },
        },
        customProperties: {
          type: "object",
          additionalProperties: { type: "string" },
        },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: [
        "id",
        "email",
        "lifecycleStage",
        "associatedCompanyIds",
        "customProperties",
        "createdAt",
        "updatedAt",
      ],
    } as const,
    (model) =>
      model.withTitle("Contact").withMatchPattern(match.property("email"))
  )
  .addModel(
    "company",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        domain: { type: ["string", "null"] },
        industry: { type: ["string", "null"] },
        type: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        state: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        annualRevenue: { type: ["number", "null"] },
        numberOfEmployees: { type: ["integer", "null"] },
        ownerId: { type: ["string", "null"] },
        associatedContactIds: {
          type: "array",
          items: { type: "string" },
        },
        associatedDealIds: {
          type: "array",
          items: { type: "string" },
        },
        customProperties: {
          type: "object",
          additionalProperties: { type: "string" },
        },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: [
        "id",
        "name",
        "associatedContactIds",
        "associatedDealIds",
        "customProperties",
        "createdAt",
        "updatedAt",
      ],
    } as const,
    (model) =>
      model.withTitle("Company").withMatchPattern(match.property("domain"))
  )
  .addModel(
    "deal",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        dealName: { type: "string" },
        amount: { type: ["number", "null"] },
        dealStage: { type: "string" },
        pipeline: { type: "string" },
        closeDate: { type: ["string", "null"], format: "date" },
        dealType: { type: ["string", "null"] },
        priority: {
          type: "string",
          enum: ["low", "medium", "high"] as const,
        },
        ownerId: { type: ["string", "null"] },
        associatedContactIds: {
          type: "array",
          items: { type: "string" },
        },
        associatedCompanyIds: {
          type: "array",
          items: { type: "string" },
        },
        customProperties: {
          type: "object",
          additionalProperties: { type: "string" },
        },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: [
        "id",
        "dealName",
        "dealStage",
        "pipeline",
        "priority",
        "associatedContactIds",
        "associatedCompanyIds",
        "customProperties",
        "createdAt",
        "updatedAt",
      ],
    } as const,
    (model) =>
      model.withTitle("Deal").withMatchPattern(match.property("dealStage"))
  )
  .deploy();

// Extract types directly from schemas
import type { FromSchema } from "json-schema-to-ts";

type Contact = FromSchema<typeof hubspotCrmCollection.models.contact.schema>;
type Company = FromSchema<typeof hubspotCrmCollection.models.company.schema>;
type Deal = FromSchema<typeof hubspotCrmCollection.models.deal.schema>;

// 2. Create HubSpot REST connector
const hubspotConnector = defineRestConnector()
  .withBaseUrl("https://api.hubapi.com")
  .addHeader(
    "Authorization",
    `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN || "demo-token"}`
  )
  .addHeader("Content-Type", "application/json")
  .build();

// 3. Create sync connector with HubSpot's pagination strategy
// This applies HubSpot's pagination format (response.paging.next.after) to all models by default
const hubspotSync = createSyncConnector(
  hubspotConnector,
  hubspotCrmCollection
).withDefaultPagination("hubspot"); // Built-in HubSpot pagination strategy

// Alternative: You could also use a custom strategy if HubSpot changes their format
const alternativeHubspotSync = createSyncConnector(
  hubspotConnector,
  hubspotCrmCollection
).withDefaultPagination({
  getNextPage: (response, current) => {
    // Custom implementation matching HubSpot's format
    if (response.paging?.next?.after) {
      return {
        type: "cursor",
        cursor: response.paging.next.after,
        limit: current.limit,
      };
    }
    return null;
  },
  extractHasMore: (response) => !!response.paging?.next,
  extractNextCursor: (response) => response.paging?.next?.after,
  extractTotalCount: (response) => response.total,
});

// 4. Configure Contact sync
hubspotSync
  .addModelConnector("contact")

  // List contacts with pagination
  .withList(
    (pagination) => {
      const base = "/crm/v3/objects/contacts";
      const props =
        "firstname,lastname,email,phone,company,jobtitle,lifecyclestage,hs_lead_status,hubspot_owner_id";
      const associations = "companies";

      if (pagination.type === "cursor" && pagination.cursor) {
        return `${base}?after=${pagination.cursor}&limit=${pagination.limit}&properties=${props}&associations=${associations}`;
      }
      return `${base}?limit=${pagination.limit}&properties=${props}&associations=${associations}`;
    },
    {
      responseSchema: z.object({
        results: z.array(
          z.object({
            id: z.string(),
            properties: z.record(z.string()).and(
              z.object({
                email: z.string().email(),
                firstname: z.string().optional(),
                lastname: z.string().optional(),
                phone: z.string().optional(),
                company: z.string().optional(),
                jobtitle: z.string().optional(),
                lifecyclestage: z.string(),
                hs_lead_status: z.string().optional(),
                hubspot_owner_id: z.string().optional(),
                createdate: z.string(),
                lastmodifieddate: z.string(),
              })
            ),
            associations: z
              .object({
                companies: z
                  .object({
                    results: z.array(z.object({ id: z.string() })),
                  })
                  .optional(),
              })
              .optional(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        paging: z
          .object({
            next: z
              .object({
                after: z.string(),
              })
              .optional(),
          })
          .optional(),
      }),
      transform: (response) =>
        response.results.map((hubspotContact) => ({
          id: hubspotContact.id,
          email: hubspotContact.properties.email,
          firstName: hubspotContact.properties.firstname || null,
          lastName: hubspotContact.properties.lastname || null,
          phone: hubspotContact.properties.phone || null,
          company: hubspotContact.properties.company || null,
          jobTitle: hubspotContact.properties.jobtitle || null,
          lifecycleStage: hubspotContact.properties
            .lifecyclestage as Contact["lifecycleStage"],
          leadStatus: hubspotContact.properties.hs_lead_status || null,
          ownerId: hubspotContact.properties.hubspot_owner_id || null,
          associatedCompanyIds:
            hubspotContact.associations?.companies?.results.map((c) => c.id) ||
            [],
          customProperties: hubspotContact.properties,
          createdAt: hubspotContact.createdAt,
          updatedAt: hubspotContact.updatedAt,
        })),
      // Using default HubSpot pagination - no need to implement getNextPage
    }
  )

  // Create contact
  .withCreate("/crm/v3/objects/contacts", {
    transform: (contact) => ({
      properties: {
        email: contact.email,
        firstname: contact.firstName || "",
        lastname: contact.lastName || "",
        phone: contact.phone || "",
        company: contact.company || "",
        jobtitle: contact.jobTitle || "",
        lifecyclestage: contact.lifecycleStage,
        hs_lead_status: contact.leadStatus || "",
        hubspot_owner_id: contact.ownerId || "",
        ...contact.customProperties,
      },
    }),
    responseTransform: (response) => ({
      id: response.id,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    }),
  })

  // Update contact
  .withUpdate((id) => `/crm/v3/objects/contacts/${id}`, {
    transform: (contact, previous) => {
      const properties: any = {};

      // Only send changed properties
      if (!previous || contact.email !== previous.email)
        properties.email = contact.email;
      if (!previous || contact.firstName !== previous.firstName)
        properties.firstname = contact.firstName || "";
      if (!previous || contact.lastName !== previous.lastName)
        properties.lastname = contact.lastName || "";
      if (!previous || contact.phone !== previous.phone)
        properties.phone = contact.phone || "";
      if (!previous || contact.jobTitle !== previous.jobTitle)
        properties.jobtitle = contact.jobTitle || "";
      if (!previous || contact.lifecycleStage !== previous.lifecycleStage)
        properties.lifecyclestage = contact.lifecycleStage;
      if (!previous || contact.leadStatus !== previous.leadStatus)
        properties.hs_lead_status = contact.leadStatus || "";

      return { properties };
    },
    responseTransform: (response) => ({
      updatedAt: response.updatedAt,
    }),
  })

  // Delete contact
  .withDelete((id) => `/crm/v3/objects/contacts/${id}`)

  // Bulk create contacts
  .withBulkCreate("/crm/v3/objects/contacts/batch/create", {
    maxBatchSize: 100,
    transform: (contacts) => ({
      inputs: contacts.map((contact) => ({
        properties: {
          email: contact.email,
          firstname: contact.firstName || "",
          lastname: contact.lastName || "",
          phone: contact.phone || "",
          company: contact.company || "",
          jobtitle: contact.jobTitle || "",
          lifecyclestage: contact.lifecycleStage,
          ...contact.customProperties,
        },
      })),
    }),
    responseTransform: (response, contacts) => {
      return contacts.map((contact, index) => ({
        ...contact,
        id: response.results[index].id,
        createdAt: response.results[index].createdAt,
        updatedAt: response.results[index].updatedAt,
      }));
    },
  });

// 5. Configure Company sync
hubspotSync
  .addModelConnector("company")

  // List companies
  .withList(
    (pagination) => {
      const base = "/crm/v3/objects/companies";
      const props =
        "name,domain,industry,type,city,state,country,annualrevenue,numberofemployees,hubspot_owner_id";
      const associations = "contacts,deals";

      if (pagination.type === "cursor" && pagination.cursor) {
        return `${base}?after=${pagination.cursor}&limit=${pagination.limit}&properties=${props}&associations=${associations}`;
      }
      return `${base}?limit=${pagination.limit}&properties=${props}&associations=${associations}`;
    },
    {
      responseSchema: z.object({
        results: z.array(
          z.object({
            id: z.string(),
            properties: z.record(z.string()).and(
              z.object({
                name: z.string(),
                domain: z.string().optional(),
                industry: z.string().optional(),
                type: z.string().optional(),
                city: z.string().optional(),
                state: z.string().optional(),
                country: z.string().optional(),
                annualrevenue: z.string().optional(),
                numberofemployees: z.string().optional(),
                hubspot_owner_id: z.string().optional(),
                createdate: z.string(),
                hs_lastmodifieddate: z.string(),
              })
            ),
            associations: z
              .object({
                contacts: z
                  .object({
                    results: z.array(z.object({ id: z.string() })),
                  })
                  .optional(),
                deals: z
                  .object({
                    results: z.array(z.object({ id: z.string() })),
                  })
                  .optional(),
              })
              .optional(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        paging: z
          .object({
            next: z
              .object({
                after: z.string(),
              })
              .optional(),
          })
          .optional(),
      }),
      transform: (response) =>
        response.results.map((hubspotCompany) => ({
          id: hubspotCompany.id,
          name: hubspotCompany.properties.name,
          domain: hubspotCompany.properties.domain || null,
          industry: hubspotCompany.properties.industry || null,
          type: hubspotCompany.properties.type || null,
          city: hubspotCompany.properties.city || null,
          state: hubspotCompany.properties.state || null,
          country: hubspotCompany.properties.country || null,
          annualRevenue: hubspotCompany.properties.annualrevenue
            ? parseFloat(hubspotCompany.properties.annualrevenue)
            : null,
          numberOfEmployees: hubspotCompany.properties.numberofemployees
            ? parseInt(hubspotCompany.properties.numberofemployees)
            : null,
          ownerId: hubspotCompany.properties.hubspot_owner_id || null,
          associatedContactIds:
            hubspotCompany.associations?.contacts?.results.map((c) => c.id) ||
            [],
          associatedDealIds:
            hubspotCompany.associations?.deals?.results.map((d) => d.id) || [],
          customProperties: hubspotCompany.properties,
          createdAt: hubspotCompany.createdAt,
          updatedAt: hubspotCompany.updatedAt,
        })),
      // Using default HubSpot pagination
    }
  )

  // Create company
  .withCreate("/crm/v3/objects/companies", {
    transform: (company) => ({
      properties: {
        name: company.name,
        domain: company.domain || "",
        industry: company.industry || "",
        type: company.type || "",
        city: company.city || "",
        state: company.state || "",
        country: company.country || "",
        annualrevenue: company.annualRevenue?.toString() || "",
        numberofemployees: company.numberOfEmployees?.toString() || "",
        hubspot_owner_id: company.ownerId || "",
        ...company.customProperties,
      },
    }),
    responseTransform: (response) => ({
      id: response.id,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    }),
  });

// 6. Configure Deal sync
hubspotSync
  .addModelConnector("deal")

  // List deals
  .withList(
    (pagination) => {
      const base = "/crm/v3/objects/deals";
      const props =
        "dealname,amount,dealstage,pipeline,closedate,dealtype,hs_priority,hubspot_owner_id";
      const associations = "contacts,companies";

      if (pagination.type === "cursor" && pagination.cursor) {
        return `${base}?after=${pagination.cursor}&limit=${pagination.limit}&properties=${props}&associations=${associations}`;
      }
      return `${base}?limit=${pagination.limit}&properties=${props}&associations=${associations}`;
    },
    {
      responseSchema: z.object({
        results: z.array(
          z.object({
            id: z.string(),
            properties: z.record(z.string()).and(
              z.object({
                dealname: z.string(),
                amount: z.string().optional(),
                dealstage: z.string(),
                pipeline: z.string(),
                closedate: z.string().optional(),
                dealtype: z.string().optional(),
                hs_priority: z.enum(["low", "medium", "high"]).optional(),
                hubspot_owner_id: z.string().optional(),
                createdate: z.string(),
                hs_lastmodifieddate: z.string(),
              })
            ),
            associations: z
              .object({
                contacts: z
                  .object({
                    results: z.array(z.object({ id: z.string() })),
                  })
                  .optional(),
                companies: z
                  .object({
                    results: z.array(z.object({ id: z.string() })),
                  })
                  .optional(),
              })
              .optional(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        paging: z
          .object({
            next: z
              .object({
                after: z.string(),
              })
              .optional(),
          })
          .optional(),
      }),
      transform: (response) =>
        response.results.map((hubspotDeal) => ({
          id: hubspotDeal.id,
          dealName: hubspotDeal.properties.dealname,
          amount: hubspotDeal.properties.amount
            ? parseFloat(hubspotDeal.properties.amount)
            : null,
          dealStage: hubspotDeal.properties.dealstage,
          pipeline: hubspotDeal.properties.pipeline,
          closeDate: hubspotDeal.properties.closedate || null,
          dealType: hubspotDeal.properties.dealtype || null,
          priority: hubspotDeal.properties.hs_priority || "low",
          ownerId: hubspotDeal.properties.hubspot_owner_id || null,
          associatedContactIds:
            hubspotDeal.associations?.contacts?.results.map((c) => c.id) || [],
          associatedCompanyIds:
            hubspotDeal.associations?.companies?.results.map((c) => c.id) || [],
          customProperties: hubspotDeal.properties,
          createdAt: hubspotDeal.createdAt,
          updatedAt: hubspotDeal.updatedAt,
        })),
      // Using default HubSpot pagination
    }
  )

  // Create deal with associations
  .withCreate("/crm/v3/objects/deals", {
    transform: (deal) => ({
      properties: {
        dealname: deal.dealName,
        amount: deal.amount?.toString() || "",
        dealstage: deal.dealStage,
        pipeline: deal.pipeline,
        closedate: deal.closeDate || "",
        dealtype: deal.dealType || "",
        hs_priority: deal.priority,
        hubspot_owner_id: deal.ownerId || "",
        ...deal.customProperties,
      },
      associations: [
        ...deal.associatedContactIds.map((contactId) => ({
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 3, // Deal to Contact
            },
          ],
        })),
        ...deal.associatedCompanyIds.map((companyId) => ({
          to: { id: companyId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 5, // Deal to Company
            },
          ],
        })),
      ],
    }),
    responseTransform: (response) => ({
      id: response.id,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    }),
  });

// Example: Special model with different pagination
// Let's say HubSpot has a legacy endpoint that uses different pagination
hubspotSync.addModelConnector("legacyData").withList("/legacy/data", {
  responseSchema: z.object({
    data: z.array(z.any()),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
  }),
  transform: (response) => response.data,
  // Override the default HubSpot pagination for this specific endpoint
  getNextPage: (response, current) => {
    if (response.hasNextPage && current.type === "page") {
      return {
        type: "page",
        page: current.page + 1,
        limit: current.limit,
      };
    }
    return null;
  },
});

// Usage examples
async function syncHubSpotCRM() {
  console.log("=== HubSpot CRM Sync ===\n");

  const contactConnector = hubspotSync.getModelConnector("contact");
  const companyConnector = hubspotSync.getModelConnector("company");
  const dealConnector = hubspotSync.getModelConnector("deal");

  if (!contactConnector || !companyConnector || !dealConnector) return;

  // 1. Sync all contacts
  console.log("1. Syncing contacts...");
  const contacts = await contactConnector.listAll({
    maxPages: 5,
    pageSize: 100,
  });
  console.log(`   Synced ${contacts.length} contacts`);

  // 2. Sync all companies
  console.log("\n2. Syncing companies...");
  const companies = await companyConnector.listAll({
    maxPages: 3,
    pageSize: 50,
  });
  console.log(`   Synced ${companies.length} companies`);

  // 3. Sync all deals
  console.log("\n3. Syncing deals...");
  const deals = await dealConnector.listAll({
    maxPages: 3,
    pageSize: 50,
  });
  console.log(`   Synced ${deals.length} deals`);

  // 4. Analyze relationships
  console.log("\n4. Analyzing relationships:");
  const companiesWithDeals = companies.filter(
    (c) => c.associatedDealIds.length > 0
  );
  console.log(`   ${companiesWithDeals.length} companies have deals`);

  const dealsWithMultipleContacts = deals.filter(
    (d) => d.associatedContactIds.length > 1
  );
  console.log(
    `   ${dealsWithMultipleContacts.length} deals involve multiple contacts`
  );

  // 5. Create a new contact with custom properties
  console.log("\n5. Creating new contact...");
  const newContact: Contact = {
    id: "",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1-555-0123",
    company: "Example Corp",
    jobTitle: "CEO",
    lifecycleStage: "lead",
    leadStatus: "NEW",
    ownerId: null,
    associatedCompanyIds: [],
    customProperties: {
      source: "API Import",
      industry_preference: "Technology",
    },
    createdAt: "",
    updatedAt: "",
  };

  const createdContact = await contactConnector.create(newContact);
  console.log(
    `   Created contact: ${createdContact.email} (ID: ${createdContact.id})`
  );

  // 6. Bulk create contacts
  console.log("\n6. Bulk creating contacts...");
  const bulkContacts: Contact[] = [
    {
      id: "",
      email: "bulk1@example.com",
      firstName: "Bulk",
      lastName: "Contact1",
      phone: null,
      company: null,
      jobTitle: null,
      lifecycleStage: "subscriber",
      leadStatus: null,
      ownerId: null,
      associatedCompanyIds: [],
      customProperties: {},
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "",
      email: "bulk2@example.com",
      firstName: "Bulk",
      lastName: "Contact2",
      phone: null,
      company: null,
      jobTitle: null,
      lifecycleStage: "lead",
      leadStatus: null,
      ownerId: null,
      associatedCompanyIds: [],
      customProperties: {},
      createdAt: "",
      updatedAt: "",
    },
  ];

  const bulkResult = await contactConnector.bulkCreate(bulkContacts);
  console.log(
    `   Created: ${bulkResult.successful.length}, Failed: ${bulkResult.failed.length}`
  );

  // 7. Create a deal with associations
  if (companies.length > 0 && contacts.length > 0) {
    console.log("\n7. Creating deal with associations...");
    const newDeal: Deal = {
      id: "",
      dealName: "New Enterprise Deal",
      amount: 50000,
      dealStage: "appointmentscheduled",
      pipeline: "default",
      closeDate: "2024-12-31",
      dealType: "newbusiness",
      priority: "high",
      ownerId: null,
      associatedContactIds: [contacts[0].id],
      associatedCompanyIds: [companies[0].id],
      customProperties: {
        lead_source: "Partner Referral",
      },
      createdAt: "",
      updatedAt: "",
    };

    const createdDeal = await dealConnector.create(newDeal);
    console.log(
      `   Created deal: ${createdDeal.dealName} ($${createdDeal.amount})`
    );
    console.log(
      `   Associated with ${createdDeal.associatedContactIds.length} contacts and ${createdDeal.associatedCompanyIds.length} companies`
    );
  }

  console.log("\n=== Sync Complete ===");
}

// Demonstrate pagination benefits
async function demonstratePaginationBenefits() {
  console.log("=== Pagination Strategy Benefits ===\n");

  // 1. All models automatically use HubSpot pagination
  console.log("1. Default pagination applied to all models:");
  console.log("   - Contacts: Uses response.paging.next.after");
  console.log("   - Companies: Uses response.paging.next.after");
  console.log("   - Deals: Uses response.paging.next.after");
  console.log("   - No need to implement getNextPage for each model!\n");

  // 2. Easy to switch strategies
  console.log("2. Easy to switch pagination strategies:");

  // Create a connector with different pagination
  const apiWithDifferentPagination = createSyncConnector(
    hubspotConnector,
    hubspotCrmCollection
  ).withDefaultPagination("cursor"); // Switch to standard cursor pagination

  console.log("   - Changed from 'hubspot' to 'cursor' pagination");
  console.log("   - All models now expect response.nextCursor\n");

  // 3. Override for specific models
  console.log("3. Override pagination for specific models:");
  console.log("   - Most models use HubSpot pagination");
  console.log("   - Legacy endpoint uses page-based pagination");
  console.log("   - Each model can have its own pagination logic if needed\n");

  // 4. Access to predefined strategies
  console.log("4. Available built-in strategies:");
  console.log("   - PaginationStrategies.hubspot");
  console.log("   - PaginationStrategies.cursor");
  console.log("   - PaginationStrategies.page");
  console.log("   - PaginationStrategies.offset");
}

// Helper functions for HubSpot-specific operations
async function getContactsByLifecycleStage(
  stage: Contact["lifecycleStage"]
): Promise<Contact[]> {
  const connector = hubspotSync.getModelConnector("contact");
  if (!connector) return [];

  const result = await connector.listAll({ maxPages: 10 });
  return result.filter((contact) => contact.lifecycleStage === stage);
}

async function getHighValueDeals(minAmount: number = 10000): Promise<Deal[]> {
  const connector = hubspotSync.getModelConnector("deal");
  if (!connector) return [];

  const result = await connector.listAll({ maxPages: 5 });
  return result.filter((deal) => deal.amount && deal.amount >= minAmount);
}

async function associateContactWithCompany(
  contactId: string,
  companyId: string
) {
  // HubSpot requires a separate API call for associations
  // This would use the associations API endpoint
  console.log(`Would associate contact ${contactId} with company ${companyId}`);
}

export {
  hubspotCrmCollection,
  hubspotSync,
  syncHubSpotCRM,
  demonstratePaginationBenefits,
  getContactsByLifecycleStage,
  getHighValueDeals,
  type Contact,
  type Company,
  type Deal,
};
