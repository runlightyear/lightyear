/**
 * HubSpot Sync Connector Example
 * 
 * This example demonstrates how to use the enhanced sync connector with HubSpot's API.
 * It shows real-world patterns for syncing contacts, companies, and deals with:
 * - HubSpot's pagination format
 * - Property-based API responses
 * - Bidirectional sync with associations
 * - Type-safe transformations
 */

import { z } from "zod";
import { defineTypedCollection, defineEnhancedSyncConnector, match } from "../src";
import type { ExtractModelTypes, SyncChange } from "../src";

// Define schemas for HubSpot CRM objects

// Contact schema (our internal model)
const contactSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    email: { type: "string", format: "email" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phone: { type: ["string", "null"] },
    jobTitle: { type: ["string", "null"] },
    lifecycleStage: {
      type: "string",
      enum: ["subscriber", "lead", "marketingQualifiedLead", "salesQualifiedLead", "opportunity", "customer", "evangelist"] as const
    },
    leadStatus: {
      type: "string",
      enum: ["new", "open", "inProgress", "openDeal", "unqualified", "attemptedToContact", "connected", "badTiming"] as const
    },
    associatedCompanyId: { type: ["string", "null"] },
    properties: {
      type: "object",
      additionalProperties: { type: "string" }
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["id", "email", "firstName", "lastName", "lifecycleStage", "leadStatus", "properties", "createdAt", "updatedAt"],
  additionalProperties: false
} as const;

// Company schema
const companySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    domain: { type: ["string", "null"] },
    industry: { type: ["string", "null"] },
    numberOfEmployees: { type: ["integer", "null"], minimum: 0 },
    annualRevenue: { type: ["number", "null"], minimum: 0 },
    city: { type: ["string", "null"] },
    state: { type: ["string", "null"] },
    country: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    properties: {
      type: "object",
      additionalProperties: { type: "string" }
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["id", "name", "properties", "createdAt", "updatedAt"],
  additionalProperties: false
} as const;

// Deal schema
const dealSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    amount: { type: ["number", "null"], minimum: 0 },
    pipeline: { type: "string" },
    stage: { type: "string" },
    closeDate: { type: ["string", "null"], format: "date" },
    probability: { type: ["number", "null"], minimum: 0, maximum: 1 },
    dealType: {
      type: "string",
      enum: ["newBusiness", "existingBusiness", "renewal"] as const
    },
    associatedContactIds: {
      type: "array",
      items: { type: "string" }
    },
    associatedCompanyIds: {
      type: "array",
      items: { type: "string" }
    },
    owner: { type: ["string", "null"] },
    properties: {
      type: "object",
      additionalProperties: { type: "string" }
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["id", "name", "pipeline", "stage", "dealType", "associatedContactIds", "associatedCompanyIds", "properties", "createdAt", "updatedAt"],
  additionalProperties: false
} as const;

// Create typed collection
const hubspotCollection = defineTypedCollection("hubspot")
  .withTitle("HubSpot CRM")
  .addModel("contact", contactSchema, (model) =>
    model
      .withTitle("Contact")
      .withMatchPattern(match.property("email"))
  )
  .addModel("company", companySchema, (model) =>
    model
      .withTitle("Company")
      .withMatchPattern(match.property("domain"))
  )
  .addModel("deal", dealSchema, (model) =>
    model
      .withTitle("Deal")
      .withMatchPattern(match.property("stage"))
  )
  .deploy();

// Extract types
type HubSpotTypes = ExtractModelTypes<typeof hubspotCollection>;
type Contact = HubSpotTypes["contact"];
type Company = HubSpotTypes["company"];
type Deal = HubSpotTypes["deal"];

// Define HubSpot API response schemas using Zod

// HubSpot uses a property-based format
const hubspotContactSchema = z.object({
  id: z.string(),
  properties: z.object({
    email: z.string().email(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    jobtitle: z.string().optional(),
    lifecyclestage: z.string(),
    hs_lead_status: z.string(),
    associatedcompanyid: z.string().optional(),
    createdate: z.string(),
    lastmodifieddate: z.string()
  }).passthrough(), // Allow additional properties
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean()
});

const hubspotCompanySchema = z.object({
  id: z.string(),
  properties: z.object({
    name: z.string(),
    domain: z.string().optional(),
    industry: z.string().optional(),
    numberofemployees: z.string().optional(),
    annualrevenue: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    description: z.string().optional(),
    createdate: z.string(),
    hs_lastmodifieddate: z.string()
  }).passthrough(),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean()
});

const hubspotDealSchema = z.object({
  id: z.string(),
  properties: z.object({
    dealname: z.string(),
    amount: z.string().optional(),
    pipeline: z.string(),
    dealstage: z.string(),
    closedate: z.string().optional(),
    hs_probability: z.string().optional(),
    dealtype: z.string().optional(),
    hubspot_owner_id: z.string().optional(),
    createdate: z.string(),
    hs_lastmodifieddate: z.string()
  }).passthrough(),
  associations: z.object({
    contacts: z.object({
      results: z.array(z.object({ id: z.string() }))
    }).optional(),
    companies: z.object({
      results: z.array(z.object({ id: z.string() }))
    }).optional()
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean()
});

// HubSpot pagination response
const hubspotPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    results: z.array(itemSchema),
    paging: z.object({
      next: z.object({
        after: z.string(),
        link: z.string()
      }).optional()
    }).optional()
  });

// Create HubSpot sync connector
const hubspotSyncConnector = defineEnhancedSyncConnector("hubspot-api")
  .withBaseUrl("https://api.hubapi.com")
  .addHeader("Authorization", `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN || "demo-token"}`)
  .withCollection(hubspotCollection)
  
  // Define contact sync
  .defineModelConnector("contact", {
    list: {
      endpoint: (params) => {
        const limit = params.limit || 100;
        const after = params.cursor ? `&after=${params.cursor}` : "";
        return `/crm/v3/objects/contacts?limit=${limit}${after}&properties=email,firstname,lastname,phone,jobtitle,lifecyclestage,hs_lead_status,associatedcompanyid`;
      },
      method: "GET",
      responseSchema: hubspotPaginatedResponseSchema(hubspotContactSchema),
      
      transform: (hubspotContact): Contact => ({
        id: hubspotContact.id,
        email: hubspotContact.properties.email,
        firstName: hubspotContact.properties.firstname || "",
        lastName: hubspotContact.properties.lastname || "",
        phone: hubspotContact.properties.phone || null,
        jobTitle: hubspotContact.properties.jobtitle || null,
        lifecycleStage: mapHubSpotLifecycleStage(hubspotContact.properties.lifecyclestage),
        leadStatus: mapHubSpotLeadStatus(hubspotContact.properties.hs_lead_status),
        associatedCompanyId: hubspotContact.properties.associatedcompanyid || null,
        properties: hubspotContact.properties,
        createdAt: hubspotContact.createdAt,
        updatedAt: hubspotContact.updatedAt
      }),
      
      pagination: {
        type: "cursor",
        pageSize: 100,
        getNextPage: (response) => {
          if (response.paging?.next?.after) {
            return { cursor: response.paging.next.after, limit: 100 };
          }
          return null;
        }
      }
    },
    
    create: {
      endpoint: "/crm/v3/objects/contacts",
      method: "POST",
      transform: (contact: Contact) => ({
        properties: {
          email: contact.email,
          firstname: contact.firstName,
          lastname: contact.lastName,
          phone: contact.phone || undefined,
          jobtitle: contact.jobTitle || undefined,
          lifecyclestage: reverseMapLifecycleStage(contact.lifecycleStage),
          hs_lead_status: reverseMapLeadStatus(contact.leadStatus)
        }
      }),
      responseTransform: (response) => ({
        id: response.id,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      })
    },
    
    update: {
      endpoint: (id) => `/crm/v3/objects/contacts/${id}`,
      method: "PATCH",
      transform: (contact: Contact, previousContact?: Contact) => {
        const properties: any = {};
        
        if (!previousContact || contact.email !== previousContact.email) {
          properties.email = contact.email;
        }
        if (!previousContact || contact.firstName !== previousContact.firstName) {
          properties.firstname = contact.firstName;
        }
        if (!previousContact || contact.lastName !== previousContact.lastName) {
          properties.lastname = contact.lastName;
        }
        if (!previousContact || contact.phone !== previousContact.phone) {
          properties.phone = contact.phone || "";
        }
        if (!previousContact || contact.jobTitle !== previousContact.jobTitle) {
          properties.jobtitle = contact.jobTitle || "";
        }
        if (!previousContact || contact.lifecycleStage !== previousContact.lifecycleStage) {
          properties.lifecyclestage = reverseMapLifecycleStage(contact.lifecycleStage);
        }
        if (!previousContact || contact.leadStatus !== previousContact.leadStatus) {
          properties.hs_lead_status = reverseMapLeadStatus(contact.leadStatus);
        }
        
        return { properties };
      },
      responseTransform: (response) => ({
        updatedAt: response.updatedAt
      })
    },
    
    delete: {
      endpoint: (id) => `/crm/v3/objects/contacts/${id}`,
      method: "DELETE"
    }
  })
  
  // Define company sync
  .defineModelConnector("company", {
    list: {
      endpoint: (params) => {
        const limit = params.limit || 100;
        const after = params.cursor ? `&after=${params.cursor}` : "";
        return `/crm/v3/objects/companies?limit=${limit}${after}&properties=name,domain,industry,numberofemployees,annualrevenue,city,state,country,description`;
      },
      method: "GET",
      responseSchema: hubspotPaginatedResponseSchema(hubspotCompanySchema),
      
      transform: (hubspotCompany): Company => ({
        id: hubspotCompany.id,
        name: hubspotCompany.properties.name,
        domain: hubspotCompany.properties.domain || null,
        industry: hubspotCompany.properties.industry || null,
        numberOfEmployees: hubspotCompany.properties.numberofemployees 
          ? parseInt(hubspotCompany.properties.numberofemployees) 
          : null,
        annualRevenue: hubspotCompany.properties.annualrevenue
          ? parseFloat(hubspotCompany.properties.annualrevenue)
          : null,
        city: hubspotCompany.properties.city || null,
        state: hubspotCompany.properties.state || null,
        country: hubspotCompany.properties.country || null,
        description: hubspotCompany.properties.description || null,
        properties: hubspotCompany.properties,
        createdAt: hubspotCompany.createdAt,
        updatedAt: hubspotCompany.updatedAt
      }),
      
      pagination: {
        type: "cursor",
        pageSize: 100,
        getNextPage: (response) => {
          if (response.paging?.next?.after) {
            return { cursor: response.paging.next.after, limit: 100 };
          }
          return null;
        }
      }
    },
    
    create: {
      endpoint: "/crm/v3/objects/companies",
      method: "POST",
      transform: (company: Company) => ({
        properties: {
          name: company.name,
          domain: company.domain || undefined,
          industry: company.industry || undefined,
          numberofemployees: company.numberOfEmployees?.toString() || undefined,
          annualrevenue: company.annualRevenue?.toString() || undefined,
          city: company.city || undefined,
          state: company.state || undefined,
          country: company.country || undefined,
          description: company.description || undefined
        }
      }),
      responseTransform: (response) => ({
        id: response.id,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      })
    }
  })
  
  // Define deal sync with associations
  .defineModelConnector("deal", {
    list: {
      endpoint: (params) => {
        const limit = params.limit || 100;
        const after = params.cursor ? `&after=${params.cursor}` : "";
        return `/crm/v3/objects/deals?limit=${limit}${after}&properties=dealname,amount,pipeline,dealstage,closedate,hs_probability,dealtype,hubspot_owner_id&associations=contacts,companies`;
      },
      method: "GET",
      responseSchema: hubspotPaginatedResponseSchema(hubspotDealSchema),
      
      transform: (hubspotDeal): Deal => ({
        id: hubspotDeal.id,
        name: hubspotDeal.properties.dealname,
        amount: hubspotDeal.properties.amount 
          ? parseFloat(hubspotDeal.properties.amount) 
          : null,
        pipeline: hubspotDeal.properties.pipeline,
        stage: hubspotDeal.properties.dealstage,
        closeDate: hubspotDeal.properties.closedate || null,
        probability: hubspotDeal.properties.hs_probability 
          ? parseFloat(hubspotDeal.properties.hs_probability) / 100 
          : null,
        dealType: mapHubSpotDealType(hubspotDeal.properties.dealtype),
        associatedContactIds: hubspotDeal.associations?.contacts?.results.map(c => c.id) || [],
        associatedCompanyIds: hubspotDeal.associations?.companies?.results.map(c => c.id) || [],
        owner: hubspotDeal.properties.hubspot_owner_id || null,
        properties: hubspotDeal.properties,
        createdAt: hubspotDeal.createdAt,
        updatedAt: hubspotDeal.updatedAt
      }),
      
      pagination: {
        type: "cursor",
        pageSize: 100,
        getNextPage: (response) => {
          if (response.paging?.next?.after) {
            return { cursor: response.paging.next.after, limit: 100 };
          }
          return null;
        }
      }
    },
    
    create: {
      endpoint: "/crm/v3/objects/deals",
      method: "POST",
      transform: (deal: Deal) => ({
        properties: {
          dealname: deal.name,
          amount: deal.amount?.toString() || undefined,
          pipeline: deal.pipeline,
          dealstage: deal.stage,
          closedate: deal.closeDate || undefined,
          hs_probability: deal.probability ? (deal.probability * 100).toString() : undefined,
          dealtype: reverseMapDealType(deal.dealType),
          hubspot_owner_id: deal.owner || undefined
        },
        associations: [
          ...deal.associatedContactIds.map(id => ({
            to: { id },
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }]
          })),
          ...deal.associatedCompanyIds.map(id => ({
            to: { id },
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 5 }]
          }))
        ]
      }),
      responseTransform: (response) => ({
        id: response.id,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      })
    }
  })
  
  .deploy();

// Helper functions for mapping HubSpot values to our schema

function mapHubSpotLifecycleStage(stage: string): Contact["lifecycleStage"] {
  const mapping: Record<string, Contact["lifecycleStage"]> = {
    "subscriber": "subscriber",
    "lead": "lead",
    "marketingqualifiedlead": "marketingQualifiedLead",
    "salesqualifiedlead": "salesQualifiedLead",
    "opportunity": "opportunity",
    "customer": "customer",
    "evangelist": "evangelist"
  };
  return mapping[stage.toLowerCase()] || "lead";
}

function reverseMapLifecycleStage(stage: Contact["lifecycleStage"]): string {
  const mapping: Record<Contact["lifecycleStage"], string> = {
    "subscriber": "subscriber",
    "lead": "lead",
    "marketingQualifiedLead": "marketingqualifiedlead",
    "salesQualifiedLead": "salesqualifiedlead",
    "opportunity": "opportunity",
    "customer": "customer",
    "evangelist": "evangelist"
  };
  return mapping[stage];
}

function mapHubSpotLeadStatus(status: string): Contact["leadStatus"] {
  const mapping: Record<string, Contact["leadStatus"]> = {
    "new": "new",
    "open": "open",
    "in_progress": "inProgress",
    "open_deal": "openDeal",
    "unqualified": "unqualified",
    "attempted_to_contact": "attemptedToContact",
    "connected": "connected",
    "bad_timing": "badTiming"
  };
  return mapping[status.toLowerCase()] || "new";
}

function reverseMapLeadStatus(status: Contact["leadStatus"]): string {
  const mapping: Record<Contact["leadStatus"], string> = {
    "new": "NEW",
    "open": "OPEN",
    "inProgress": "IN_PROGRESS",
    "openDeal": "OPEN_DEAL",
    "unqualified": "UNQUALIFIED",
    "attemptedToContact": "ATTEMPTED_TO_CONTACT",
    "connected": "CONNECTED",
    "badTiming": "BAD_TIMING"
  };
  return mapping[status];
}

function mapHubSpotDealType(type?: string): Deal["dealType"] {
  if (!type) return "newBusiness";
  const mapping: Record<string, Deal["dealType"]> = {
    "newbusiness": "newBusiness",
    "existingbusiness": "existingBusiness",
    "renewal": "renewal"
  };
  return mapping[type.toLowerCase()] || "newBusiness";
}

function reverseMapDealType(type: Deal["dealType"]): string {
  const mapping: Record<Deal["dealType"], string> = {
    "newBusiness": "newbusiness",
    "existingBusiness": "existingbusiness",
    "renewal": "renewal"
  };
  return mapping[type];
}

// Example usage
async function syncHubSpotData() {
  console.log("=== HubSpot Sync Example ===\n");
  
  // 1. Sync all contacts
  console.log("1. Syncing HubSpot contacts:");
  try {
    const contactResult = await hubspotSyncConnector.list("contact", {
      pagination: { limit: 50 },
      maxPages: 3 // Limit for demo
    });
    
    console.log(`   Synced ${contactResult.data.length} contacts`);
    console.log(`   Sample contacts:`);
    contactResult.data.slice(0, 3).forEach(contact => {
      console.log(`   - ${contact.firstName} ${contact.lastName} (${contact.email})`);
      console.log(`     Lifecycle: ${contact.lifecycleStage}, Status: ${contact.leadStatus}`);
    });
  } catch (error) {
    console.error("   Error syncing contacts:", error);
  }
  
  // 2. Create a new contact
  console.log("\n2. Creating a new contact:");
  const newContact: Contact = {
    id: "",
    email: "john.smith@techcorp.com",
    firstName: "John",
    lastName: "Smith",
    phone: "+1-555-123-4567",
    jobTitle: "VP of Engineering",
    lifecycleStage: "marketingQualifiedLead",
    leadStatus: "open",
    associatedCompanyId: null,
    properties: {},
    createdAt: "",
    updatedAt: ""
  };
  
  try {
    const created = await hubspotSyncConnector.create("contact", newContact);
    console.log(`   Created contact: ${created.firstName} ${created.lastName} (ID: ${created.id})`);
  } catch (error) {
    console.error("   Error creating contact:", error);
  }
  
  // 3. Sync companies with pagination
  console.log("\n3. Syncing HubSpot companies:");
  try {
    const companyResult = await hubspotSyncConnector.list("company", {
      pagination: { limit: 25 },
      maxPages: 2
    });
    
    console.log(`   Synced ${companyResult.data.length} companies`);
    console.log(`   Sample companies:`);
    companyResult.data.slice(0, 3).forEach(company => {
      console.log(`   - ${company.name} (${company.domain || "no domain"})`);
      if (company.numberOfEmployees) {
        console.log(`     Employees: ${company.numberOfEmployees}, Industry: ${company.industry || "N/A"}`);
      }
    });
  } catch (error) {
    console.error("   Error syncing companies:", error);
  }
  
  // 4. Sync deals with associations
  console.log("\n4. Syncing HubSpot deals:");
  try {
    const dealResult = await hubspotSyncConnector.list("deal", {
      pagination: { limit: 20 },
      maxPages: 2
    });
    
    console.log(`   Synced ${dealResult.data.length} deals`);
    
    // Analyze deal pipeline
    const pipelineStats = dealResult.data.reduce((acc, deal) => {
      if (!acc[deal.stage]) {
        acc[deal.stage] = { count: 0, totalValue: 0 };
      }
      acc[deal.stage].count++;
      acc[deal.stage].totalValue += deal.amount || 0;
      return acc;
    }, {} as Record<string, { count: number; totalValue: number }>);
    
    console.log("\n   Pipeline summary:");
    Object.entries(pipelineStats).forEach(([stage, stats]) => {
      console.log(`   - ${stage}: ${stats.count} deals worth $${stats.totalValue.toLocaleString()}`);
    });
    
    // Show deals with associations
    console.log("\n   Deals with associations:");
    dealResult.data
      .filter(deal => deal.associatedContactIds.length > 0 || deal.associatedCompanyIds.length > 0)
      .slice(0, 3)
      .forEach(deal => {
        console.log(`   - ${deal.name} ($${deal.amount || 0})`);
        console.log(`     Contacts: ${deal.associatedContactIds.length}, Companies: ${deal.associatedCompanyIds.length}`);
      });
  } catch (error) {
    console.error("   Error syncing deals:", error);
  }
  
  // 5. Batch sync changes
  console.log("\n5. Performing batch sync operations:");
  const changes: SyncChange<Contact>[] = [
    {
      operation: "update",
      id: "contact-123",
      data: {
        id: "contact-123",
        email: "updated@example.com",
        firstName: "Updated",
        lastName: "Contact",
        phone: null,
        jobTitle: "Senior Manager",
        lifecycleStage: "salesQualifiedLead",
        leadStatus: "connected",
        associatedCompanyId: "company-456",
        properties: {},
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: new Date().toISOString()
      }
    }
  ];
  
  try {
    const syncResult = await hubspotSyncConnector.syncChanges("contact", changes);
    console.log(`   Successful: ${syncResult.successful}, Failed: ${syncResult.failed.length}`);
  } catch (error) {
    console.error("   Error in batch sync:", error);
  }
  
  console.log("\n=== HubSpot Sync Complete ===");
}

// Type safety examples specific to HubSpot
function hubspotTypeSafetyExamples() {
  // The Zod schema ensures we handle HubSpot's response format correctly
  const apiResponse = {
    id: "123",
    properties: {
      email: "test@example.com",
      firstname: "Test",
      // HubSpot returns lowercase property names
      lifecyclestage: "lead"
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    archived: false
  };
  
  // This is validated by Zod
  const parsed = hubspotContactSchema.parse(apiResponse);
  console.log("Parsed HubSpot contact:", parsed.properties.email);
  
  // Transform ensures our internal model matches our schema
  const contact: Contact = {
    id: "123",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    phone: null,
    jobTitle: null,
    lifecycleStage: "lead",
    leadStatus: "new",
    associatedCompanyId: null,
    properties: {},
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  };
  
  // TypeScript ensures all required fields are present
  console.log("Valid contact:", contact.lifecycleStage);
}

export {
  hubspotCollection,
  hubspotSyncConnector,
  syncHubSpotData,
  type Contact,
  type Company,
  type Deal
};