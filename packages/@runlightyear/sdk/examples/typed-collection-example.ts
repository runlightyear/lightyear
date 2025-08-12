/**
 * Typed Collection Example
 *
 * This example demonstrates how to use typed collections with automatic
 * TypeScript type inference from JSON schemas. Developers define the schema
 * once and get full type safety throughout their code.
 */

import { defineTypedCollection, match } from "../src";
import type { ExtractModelTypes } from "../src";

// Define a typed CRM collection with schemas
const crmCollection = defineTypedCollection("crm")
  .withTitle("Customer Relationship Management")

  // Add a Customer model with schema
  .addModel(
    "customer",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        company: { type: ["string", "null"] },
        createdAt: { type: "string", format: "date-time" },
      },
      required: ["id", "name", "email"],
    } as const,
    (model) =>
      model.withTitle("Customer").withMatchPattern(match.property("email"))
  )

  // Add a Lead model with schema
  .addModel(
    "lead",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        status: {
          type: "string",
          enum: ["new", "contacted", "qualified", "lost", "converted"] as const,
        },
        source: { type: "string" },
        score: { type: "number", minimum: 0, maximum: 100 },
      },
      required: ["id", "name", "status"],
    } as const,
    (model) =>
      model
        .withTitle("Sales Lead")
        .withMatchPattern(
          match.and(
            match.property("status"),
            match.or(
              match.property("score"),
              match.jsonPath("$.metadata.leadScore")
            )
          )
        )
  )

  // Add an Opportunity model with schema
  .addModel(
    "opportunity",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        amount: { type: "number", minimum: 0 },
        stage: {
          type: "string",
          enum: [
            "prospecting",
            "qualification",
            "proposal",
            "negotiation",
            "closed-won",
            "closed-lost",
          ] as const,
        },
        closeDate: { type: "string", format: "date" },
        probability: { type: "number", minimum: 0, maximum: 100 },
      },
      required: ["id", "name", "stage"],
    } as const,
    (model) =>
      model
        .withTitle("Sales Opportunity")
        .withMatchPattern(
          match.and(match.property("amount"), match.property("stage"))
        )
  )

  .deploy();

// Extract the inferred types from the collection
type CRMTypes = ExtractModelTypes<typeof crmCollection>;

// Now we have fully typed interfaces without manually defining them!
type Customer = CRMTypes["customer"];
type Lead = CRMTypes["lead"];
type Opportunity = CRMTypes["opportunity"];

// Example usage with full type safety
function processCustomer(customer: Customer) {
  // TypeScript knows the exact shape of customer
  console.log(`Processing customer: ${customer.name} (${customer.email})`);

  // This would cause a TypeScript error:
  // console.log(customer.unknownField); // Error: Property 'unknownField' does not exist
}

function qualifyLead(lead: Lead): Lead {
  // TypeScript enforces the enum values
  return {
    ...lead,
    status: "qualified", // Must be one of the defined values
  };
}

function calculateOpportunityValue(opportunity: Opportunity): number {
  // TypeScript knows the types of all fields
  const baseAmount = opportunity.amount || 0;
  const probability = opportunity.probability || 0;

  return baseAmount * (probability / 100);
}

// Example: Creating typed data that matches the schemas
const newCustomer: Customer = {
  id: "cust-123",
  name: "Acme Corp",
  email: "contact@acme.com",
  company: "Acme Corporation",
  createdAt: new Date().toISOString(),
};

const newLead: Lead = {
  id: "lead-456",
  name: "John Doe",
  email: "john@example.com",
  status: "new",
  source: "website",
  score: 75,
};

// The collection object contains both the schema definitions and type information
console.log("Collection name:", crmCollection.name);
console.log("Models:", Object.keys(crmCollection.models));

// Access model schemas if needed
const customerSchema = crmCollection.models.customer.schema;
console.log("Customer schema:", JSON.stringify(customerSchema, null, 2));

export { crmCollection, type Customer, type Lead, type Opportunity };
