import {
  defineIntegration,
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
  defineCollection,
  defineModel,
  defineAction,
  match,
  exportRegistry,
} from "../src";

/**
 * Example: Creating Integrations with Lightyear SDK
 *
 * This example demonstrates how to define integrations that combine
 * apps (built-in or custom) with collections of models.
 */

console.log("🚀 Integration Builder Example\n");

// First, let's create some models and collections
const contact = defineModel("contact")
  .withTitle("Contact")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      firstName: { type: "string" },
      lastName: { type: "string" },
    },
    required: ["id", "email"],
  })
  .withMatchPattern(match.property("email"))
  .deploy();

const account = defineModel("account")
  .withTitle("Account")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      industry: { type: "string" },
    },
    required: ["id", "name"],
  })
  .deploy();

const opportunity = defineModel("opportunity")
  .withTitle("Opportunity")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      amount: { type: "number" },
      stage: { type: "string" },
    },
    required: ["id", "name"],
  })
  .deploy();

// Create collections
const crm = defineCollection("crm")
  .withTitle("CRM Collection")
  .withModels([contact, account])
  .deploy();

const sales = defineCollection("sales")
  .withTitle("Sales Collection")
  .withModel(opportunity)
  .deploy();

// Create some actions for our integrations
const syncContacts = defineAction("sync-contacts")
  .withTitle("Sync Contacts")
  .withDescription("Synchronize contacts from external system")
  .addVariable("batch_size", {
    title: "Batch Size",
    description: "Number of contacts to sync at once",
    defaultValue: "100",
    required: false,
  })
  .deploy();

const exportData = defineAction("export-data")
  .withTitle("Export Data")
  .withDescription("Export data to external format")
  .addVariable("format", {
    title: "Export Format",
    description: "Format for exported data",
    defaultValue: "csv",
    required: true,
  })
  .deploy();

const processOpportunities = defineAction("process-opportunities")
  .withTitle("Process Opportunities")
  .withDescription("Process and analyze opportunity data")
  .addSecret("analytics_key", {
    title: "Analytics API Key",
    description: "Key for analytics service",
    required: true,
  })
  .deploy();

console.log("✅ Created models, collections, and actions\n");

// Example 1: Integration with built-in app
const salesforceIntegration = defineIntegration("salesforce-sync")
  .withTitle("Salesforce CRM Sync")
  .withApp("salesforce") // Using built-in Salesforce app
  .withCollection("crm", crm)
  .withCollection("sales", sales)
  .withAction(syncContacts)
  .withAction(exportData)
  .withAction(processOpportunities)
  .deploy();

console.log("Integration 1 - Built-in App:");
console.log(`  Name: ${salesforceIntegration.name}`);
console.log(`  Title: ${salesforceIntegration.title}`);
console.log(`  App Type: ${salesforceIntegration.app.type}`);
console.log(`  App Name: ${salesforceIntegration.app.name}`);
console.log(
  `  Collections: ${Object.keys(salesforceIntegration.collections).join(", ")}`
);
console.log(
  `  Actions: ${Object.keys(salesforceIntegration.actions).join(", ")}\n`
);

// Example 2: Integration with custom OAuth2 app
const githubApp = defineOAuth2CustomApp("github")
  .withTitle("GitHub OAuth Integration")
  .addSecret("client_id", {
    title: "OAuth Client ID",
    description: "GitHub OAuth application client ID",
    required: true,
  })
  .addSecret("client_secret", {
    title: "OAuth Client Secret",
    description: "GitHub OAuth application client secret",
    required: true,
  })
  .addVariable("base_url", {
    title: "GitHub API Base URL",
    description: "Base URL for GitHub API calls",
    defaultValue: "https://api.github.com",
    required: false,
  })
  .deploy();

const repo = defineModel("repository")
  .withTitle("GitHub Repository")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      full_name: { type: "string" },
      private: { type: "boolean" },
    },
    required: ["id", "name"],
  })
  .deploy();

const githubCollection = defineCollection("github")
  .withTitle("GitHub Collection")
  .withModel(repo)
  .deploy();

const githubIntegration = defineIntegration("github-sync")
  .withTitle("GitHub Repository Sync")
  .withCustomApp(githubApp)
  .withCollection("repositories", githubCollection)
  .withAction(syncContacts)
  .withAction(exportData)
  .deploy();

console.log("Integration 2 - Custom App:");
console.log(`  Name: ${githubIntegration.name}`);
console.log(`  Title: ${githubIntegration.title}`);
console.log(`  App Type: ${githubIntegration.app.type}`);
console.log(`  App Name: ${githubIntegration.app.name}`);
console.log(
  `  Custom App Secrets: ${
    githubIntegration.app.definition?.secrets?.length || 0
  }`
);
console.log(
  `  Collections: ${Object.keys(githubIntegration.collections).join(", ")}`
);
console.log(
  `  Actions: ${Object.keys(githubIntegration.actions).join(", ")}\n`
);

// Example 3: Integration with API Key app and inline collections
const stripeApp = defineApiKeyCustomApp("stripe")
  .withTitle("Stripe Payments")
  .addSecret("api_key", {
    title: "Stripe API Key",
    description: "Your Stripe secret key",
    required: true,
  })
  .addVariable("webhook_endpoint", {
    title: "Webhook Endpoint",
    description: "Endpoint for Stripe webhook events",
    required: false,
  })
  .deploy();

const stripeIntegration = defineIntegration("stripe-payments")
  .withTitle("Stripe Payment Processing")
  .withCustomApp(stripeApp)
  .withCollections({
    payments: defineCollection("payments")
      .addModel("charge", {
        title: "Payment Charge",
        schema: {
          type: "object",
          properties: {
            id: { type: "string" },
            amount: { type: "number" },
            currency: { type: "string" },
            status: { type: "string" },
          },
          required: ["id", "amount"],
        },
      })
      .deploy(),
    customers: defineCollection("customers")
      .addModel("customer", {
        title: "Stripe Customer",
        schema: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string", format: "email" },
            name: { type: "string" },
          },
          required: ["id"],
        },
      })
      .deploy(),
  })
  .withAction(processOpportunities)
  .deploy();

console.log("Integration 3 - API Key App with Inline Collections:");
console.log(`  Name: ${stripeIntegration.name}`);
console.log(`  Title: ${stripeIntegration.title}`);
console.log(`  App Type: ${stripeIntegration.app.type}`);
console.log(
  `  Collections: ${Object.keys(stripeIntegration.collections).join(", ")}`
);
console.log(
  `  Actions: ${Object.keys(stripeIntegration.actions).join(", ")}\n`
);

// Export the registry to see all created items
const registry = exportRegistry();
console.log("📊 Registry Summary:");
console.log(`  Total Items: ${registry.stats.totalItems}`);
console.log(`  Models: ${registry.stats.byType.model || 0}`);
console.log(`  Collections: ${registry.stats.byType.collection || 0}`);
console.log(`  Custom Apps: ${registry.stats.byType.customApp || 0}`);
console.log(`  Integrations: ${registry.stats.byType.integration || 0}`);
console.log(`  Actions: ${registry.stats.byType.action || 0}`);

console.log("\n✅ Integration examples completed!");

// Example usage patterns
console.log("\n💡 Usage Patterns:");
console.log("1. Integration with built-in app and actions:");
console.log("   defineIntegration('sync')");
console.log("     .withApp('salesforce')");
console.log("     .withCollection('contacts', contactCollection)");
console.log("     .withAction(syncAction)");
console.log("     .deploy()");
console.log("\n2. Integration with custom app and multiple actions:");
console.log("   defineIntegration('custom-sync')");
console.log("     .withCustomApp(myCustomApp)");
console.log("     .withCollections({ contacts, accounts })");
console.log(
  "     .withActions({ 'sync-action': syncAction, 'export-action': exportAction })"
);
console.log("     .deploy()");
