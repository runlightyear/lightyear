/**
 * Registry Example
 *
 * This example demonstrates how the @runlightyear/sdk automatically
 * tracks all created elements in a global registry for deployment.
 */

import {
  defineCollection,
  defineModel,
  match,
  getModels,
  getCollections,
  getAllItems,
  exportRegistry,
  getRegistryStats,
  clearRegistry,
} from "../src";

console.log("=== SDK Registry Example ===\n");

// Clear any existing registry data
clearRegistry();
console.log("🧹 Cleared registry\n");

// Create some models individually
console.log("📋 Creating individual models...");
const customer = defineModel("customer")
  .withTitle("Customer")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
      company: { type: "string" },
    },
    required: ["id", "name", "email"],
  })
  .withMatchPattern(match.property("email"))
  .build();

const product = defineModel("product")
  .withTitle("Product")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      price: { type: "number", minimum: 0 },
      category: { type: "string" },
    },
  })
  .build();

console.log(`✅ Created ${getModels().length} individual models\n`);

// Create collections with embedded models
console.log("📚 Creating collections with embedded models...");

const crmCollection = defineCollection("crm")
  .withTitle("Customer Relationship Management")
  .withModel(customer) // Reference existing model
  .addModel("lead", {
    // Create model inline
    title: "Sales Lead",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        status: { type: "string", enum: ["new", "qualified", "lost"] },
        score: { type: "number", minimum: 0, maximum: 100 },
      },
    },
    matchPattern: match.and(match.property("status"), match.property("score")),
  })
  .addModel("opportunity", {
    title: "Sales Opportunity",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        amount: { type: "number", minimum: 0 },
        stage: { type: "string" },
      },
    },
  })
  .build();

const ecommerceCollection = defineCollection("ecommerce")
  .withTitle("E-commerce Platform")
  .withModel(product) // Reference existing model
  .addModel("order", {
    title: "Customer Order",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        customerId: { type: "string" },
        total: { type: "number", minimum: 0 },
        status: { type: "string", enum: ["pending", "shipped", "delivered"] },
      },
    },
  })
  .build();

console.log(`✅ Created ${getCollections().length} collections\n`);

// Display registry statistics
console.log("📊 Registry Statistics:");
const stats = getRegistryStats();
console.log(`- Total items: ${stats.totalItems}`);
console.log(`- Models: ${stats.byType.model || 0}`);
console.log(`- Collections: ${stats.byType.collection || 0}`);
console.log(`- Created at: ${stats.createdAt.toISOString()}\n`);

// Show all registered models
console.log("🏗️  Registered Models:");
const models = getModels();
models.forEach((entry, index) => {
  console.log(
    `  ${index + 1}. ${entry.name} (${entry.model.title || "No title"})`
  );
  console.log(`     - ID: ${entry.id}`);
  console.log(`     - Created by: ${entry.metadata?.createdBy || "unknown"}`);
  console.log(
    `     - Parent collection: ${
      entry.metadata?.parentCollection || "standalone"
    }`
  );
});
console.log();

// Show all registered collections
console.log("📦 Registered Collections:");
const collections = getCollections();
collections.forEach((entry, index) => {
  console.log(
    `  ${index + 1}. ${entry.name} (${entry.collection.title || "No title"})`
  );
  console.log(`     - ID: ${entry.id}`);
  console.log(`     - Models: ${entry.collection.models.length}`);
  console.log(`     - Model count in metadata: ${entry.metadata?.modelCount}`);
});
console.log();

// Export for deployment
console.log("🚀 Registry Export (for deployment):");
const exported = exportRegistry();
console.log(`- Export contains ${exported.items.length} items`);
console.log(`- Export stats: ${JSON.stringify(exported.stats.byType)}`);
console.log(`- Exported at: ${exported.exportedAt.toISOString()}\n`);

// Show deployment-ready data structure
console.log("📋 Deployment-ready structure:");
console.log(JSON.stringify(exported, null, 2));

export {
  customer,
  product,
  crmCollection,
  ecommerceCollection,
  exported as deploymentData,
};
