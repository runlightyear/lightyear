/**
 * Collection Sync Connector Example
 * 
 * This example demonstrates how to create a sync connector that is
 * associated with a typed collection, providing type-safe data synchronization.
 */

import { defineTypedCollection, defineSyncConnector, match } from "../src";
import type { ExtractModelTypes } from "../src";

// Define the schema for a CRM system
const contactSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    phone: { type: ["string", "null"] },
    company: { type: ["string", "null"] },
    tags: {
      type: "array",
      items: { type: "string" }
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["id", "firstName", "lastName", "email", "createdAt", "updatedAt"],
  additionalProperties: false
} as const;

const dealSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    value: { type: "number", minimum: 0 },
    stage: {
      type: "string",
      enum: ["lead", "qualified", "proposal", "negotiation", "won", "lost"] as const
    },
    contactId: { type: "string" },
    probability: { type: "integer", minimum: 0, maximum: 100 },
    expectedCloseDate: { type: ["string", "null"], format: "date" },
    notes: { type: ["string", "null"] },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["id", "title", "value", "stage", "contactId", "createdAt", "updatedAt"],
  additionalProperties: false
} as const;

// Create a typed collection for CRM data
const crmCollection = defineTypedCollection("crm")
  .withTitle("CRM Data")
  .addModel("contact", contactSchema, (model) =>
    model
      .withTitle("Contact")
      .withMatchPattern(match.property("email"))
  )
  .addModel("deal", dealSchema, (model) =>
    model
      .withTitle("Deal")
      .withMatchPattern(
        match.and(
          match.property("stage"),
          match.property("value")
        )
      )
  )
  .deploy();

// Extract types from the collection
type CRMTypes = ExtractModelTypes<typeof crmCollection>;
type Contact = CRMTypes["contact"];
type Deal = CRMTypes["deal"];

// Create a sync connector associated with the collection
const crmSyncConnector = defineSyncConnector("crm-api")
  .withBaseUrl("https://api.crm-system.com/v1")
  .addHeader("X-API-Key", process.env.CRM_API_KEY || "demo-key")
  .withCollection(crmCollection)
  
  // Define sync method for contacts with type safety
  .defineSyncMethod("contact", {
    endpoint: "/contacts",
    method: "GET",
    params: {
      limit: 100,
      include: "tags,company"
    },
    responseMapping: (response: any): Contact[] => {
      // Map API response to our schema-defined Contact type
      return response.data.map((item: any) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: item.phone || null,
        company: item.company?.name || null,
        tags: item.tags || [],
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
    }
  })
  
  // Define sync method for deals with type safety
  .defineSyncMethod("deal", {
    endpoint: "/deals",
    method: "GET",
    params: {
      include: "contact",
      sort: "-updated_at"
    },
    responseMapping: (response: any): Deal[] => {
      // Map API response to our schema-defined Deal type
      return response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        value: parseFloat(item.amount),
        stage: item.stage,
        contactId: item.contact_id,
        probability: item.probability || 0,
        expectedCloseDate: item.expected_close_date || null,
        notes: item.notes || null,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
    }
  })
  
  .deploy();

// Example usage with full type safety
async function performCRMSync() {
  try {
    // Sync contacts - TypeScript knows this returns Contact[]
    const contactResult = await crmSyncConnector.syncModel("contact");
    
    if (contactResult.success) {
      console.log(`Synced ${contactResult.data.length} contacts`);
      
      // TypeScript knows the exact shape of each contact
      contactResult.data.forEach(contact => {
        console.log(`Contact: ${contact.firstName} ${contact.lastName} (${contact.email})`);
        
        if (contact.tags.length > 0) {
          console.log(`  Tags: ${contact.tags.join(", ")}`);
        }
      });
    }
    
    // Sync deals - TypeScript knows this returns Deal[]
    const dealResult = await crmSyncConnector.syncModel("deal");
    
    if (dealResult.success) {
      console.log(`\nSynced ${dealResult.data.length} deals`);
      
      // Calculate pipeline value by stage with type safety
      const pipelineByStage = dealResult.data.reduce((acc, deal) => {
        if (!acc[deal.stage]) {
          acc[deal.stage] = { count: 0, totalValue: 0 };
        }
        acc[deal.stage].count++;
        acc[deal.stage].totalValue += deal.value;
        return acc;
      }, {} as Record<Deal["stage"], { count: number; totalValue: number }>);
      
      // Display pipeline summary
      Object.entries(pipelineByStage).forEach(([stage, stats]) => {
        console.log(`  ${stage}: ${stats.count} deals worth $${stats.totalValue.toLocaleString()}`);
      });
    }
    
    // Sync all models at once
    const allResults = await crmSyncConnector.syncAll();
    
    console.log("\nSync summary:");
    console.log(`- Contacts: ${allResults.contact.success ? "✓" : "✗"} (${allResults.contact.data.length} records)`);
    console.log(`- Deals: ${allResults.deal.success ? "✓" : "✗"} (${allResults.deal.data.length} records)`);
    
  } catch (error) {
    console.error("Sync failed:", error);
  }
}

// Example: Type-safe data processing
function findHighValueDeals(deals: Deal[], minValue: number = 10000): Deal[] {
  return deals.filter(deal => 
    deal.value >= minValue && 
    deal.stage !== "lost"
  );
}

function getContactDeals(contact: Contact, deals: Deal[]): Deal[] {
  // TypeScript ensures we're comparing the right properties
  return deals.filter(deal => deal.contactId === contact.id);
}

// Example: Validate synced data against schema
function validateContact(contact: Contact): boolean {
  // TypeScript already ensures type safety, but we can add runtime validation
  return (
    typeof contact.id === "string" &&
    typeof contact.firstName === "string" &&
    typeof contact.lastName === "string" &&
    typeof contact.email === "string" &&
    contact.email.includes("@") &&
    Array.isArray(contact.tags) &&
    contact.tags.every(tag => typeof tag === "string")
  );
}

// The sync connector maintains the collection association
console.log("Collection name:", crmSyncConnector.getCollection().name);
console.log("Models:", Object.keys(crmSyncConnector.getCollection().models));

export { 
  crmCollection, 
  crmSyncConnector,
  performCRMSync,
  type Contact, 
  type Deal 
};