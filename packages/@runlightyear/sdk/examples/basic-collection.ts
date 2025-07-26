/**
 * Basic Collection Example
 *
 * This example demonstrates how to use the @runlightyear/sdk
 * to define collections and models using the builder pattern.
 */

import { defineCollection, defineModel, match } from "../src";

// Define a Customer model
const customer = defineModel("customer")
  .withTitle("Customer")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
      company: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
    },
    required: ["id", "name", "email"],
  })
  .withMatchPattern(match.property("email"))
  .build();

// Define a Lead model
const lead = defineModel("lead")
  .withTitle("Sales Lead")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
      status: {
        type: "string",
        enum: ["new", "contacted", "qualified", "lost", "converted"],
      },
      source: { type: "string" },
      score: { type: "number", minimum: 0, maximum: 100 },
    },
    required: ["id", "name", "status"],
  })
  .withMatchPattern(
    match.and(
      match.property("status"),
      match.or(match.property("score"), match.jsonPath("$.metadata.leadScore"))
    )
  )
  .build();

// Define a CRM Collection containing both models
const crmCollection = defineCollection("crm")
  .withTitle("Customer Relationship Management")
  .withModel(customer)
  .withModel(lead)
  .addModel("opportunity", {
    title: "Sales Opportunity",
    schema: {
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
          ],
        },
        closeDate: { type: "string", format: "date" },
        probability: { type: "number", minimum: 0, maximum: 100 },
      },
      required: ["id", "name", "stage"],
    },
    matchPattern: match.and(match.property("amount"), match.property("stage")),
  })
  .build();

// Example usage and logging
console.log("CRM Collection:", JSON.stringify(crmCollection, null, 2));

console.log("\nCollection Summary:");
console.log(`- Name: ${crmCollection.name}`);
console.log(`- Title: ${crmCollection.title}`);
console.log(`- Models: ${crmCollection.models.length}`);

crmCollection.models.forEach((model, index) => {
  console.log(`  ${index + 1}. ${model.name} (${model.title || "No title"})`);
});

export { crmCollection, customer, lead };
