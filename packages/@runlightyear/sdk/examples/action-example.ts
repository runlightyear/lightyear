import {
  defineAction,
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
  exportRegistry,
} from "../src";

/**
 * Example: Creating Actions with Lightyear SDK
 *
 * This example demonstrates how to define actions with variables
 * and secrets for configuration.
 */

console.log("⚡ Action Builder Example\n");

// Example 1: Simple action
const basicAction = defineAction("basic-sync")
  .withTitle("Basic Data Sync")
  .withDescription("Synchronize data between systems")
  .deploy();

console.log("Action 1 - Basic Action:");
console.log(`  Name: ${basicAction.name}`);
console.log(`  Title: ${basicAction.title}`);
console.log(`  Description: ${basicAction.description}\n`);

// Example 2: Action with variables and secrets
const configuredAction = defineAction("configured-processor")
  .withTitle("Configured Data Processor")
  .withDescription("Process data with configurable settings")
  .addVariable("batch_size", {
    title: "Batch Size",
    description: "Number of items to process at once",
    defaultValue: "50",
    required: true,
  })
  .addVariable("timeout", {
    title: "Timeout",
    description: "Processing timeout in seconds",
    defaultValue: "30",
    required: false,
  })
  .addSecret("api_key", {
    title: "API Key",
    description: "Secret key for external service",
    required: true,
  })
  .deploy();

console.log("Action 2 - With Configuration:");
console.log(`  Name: ${configuredAction.name}`);
console.log(`  Title: ${configuredAction.title}`);
console.log(`  Variables: ${configuredAction.variables?.length || 0}`);
console.log(`  Secrets: ${configuredAction.secrets?.length || 0}\n`);

// Example 3: Complex action with comprehensive configuration
const dataSync = defineAction("data-synchronization")
  .withTitle("Data Synchronization")
  .withDescription("Synchronize data with configurable options")
  .addVariable("sync_frequency", {
    title: "Sync Frequency",
    description: "How often to perform synchronization (in minutes)",
    defaultValue: "60",
    required: true,
  })
  .addVariable("batch_size", {
    title: "Batch Size",
    description: "Number of records to process in each batch",
    defaultValue: "100",
    required: true,
  })
  .addVariable("conflict_resolution", {
    title: "Conflict Resolution Strategy",
    description: "How to handle data conflicts during sync",
    defaultValue: "latest_wins",
    required: false,
  })
  .addSecret("master_key", {
    title: "Master Encryption Key",
    description: "Key for encrypting sensitive data during transfer",
    required: true,
  })
  .addSecret("webhook_signature", {
    title: "Webhook Signature Secret",
    description: "Secret for validating incoming webhooks",
    required: false,
  })
  .deploy();

console.log("Action 3 - Complex Configuration:");
console.log(`  Name: ${dataSync.name}`);
console.log(`  Title: ${dataSync.title}`);
console.log(`  Variables: ${dataSync.variables?.length || 0}`);
console.log(`  Secrets: ${dataSync.secrets?.length || 0}`);

// Show variable details
if (dataSync.variables) {
  console.log("  Variable Details:");
  dataSync.variables.forEach((variable) => {
    console.log(`    - ${variable.name}: ${variable.title || variable.name}`);
    console.log(`      Default: ${variable.defaultValue || "none"}`);
    console.log(`      Required: ${variable.required ? "yes" : "no"}`);
  });
}

// Show secret details
if (dataSync.secrets) {
  console.log("  Secret Details:");
  dataSync.secrets.forEach((secret) => {
    console.log(`    - ${secret.name}: ${secret.title || secret.name}`);
    console.log(`      Required: ${secret.required ? "yes" : "no"}`);
  });
}

console.log("\n");

// Example 4: Minimal action (name only)
const simpleAction = defineAction("health-check").deploy();

console.log("Action 4 - Minimal:");
console.log(`  Name: ${simpleAction.name}`);
console.log(`  Title: ${simpleAction.title || "(none)"}`);
console.log(`  Variables: ${simpleAction.variables?.length || 0}`);
console.log(`  Secrets: ${simpleAction.secrets?.length || 0}\n`);

// Export the registry to see all created items
const registry = exportRegistry();
console.log("📊 Registry Summary:");
console.log(`  Total Items: ${registry.stats.totalItems}`);
console.log(`  Models: ${registry.stats.byType.model || 0}`);
console.log(`  Collections: ${registry.stats.byType.collection || 0}`);
console.log(`  Custom Apps: ${registry.stats.byType.customApp || 0}`);
console.log(`  Integrations: ${registry.stats.byType.integration || 0}`);
console.log(`  Actions: ${registry.stats.byType.action || 0}`);

console.log("\n✅ Action examples completed!");

// Example usage patterns
console.log("\n💡 Usage Patterns:");
console.log("1. Simple action:");
console.log("   defineAction('sync').withTitle('Data Sync').deploy()");
console.log("\n2. Action with variables:");
console.log(
  "   defineAction('process').addVariable('setting', { defaultValue: 'value' }).deploy()"
);
console.log("\n3. Complex action with configuration:");
console.log("   defineAction('complex')");
console.log("     .withTitle('Complex Action')");
console.log("     .withDescription('A complex action')");
console.log("     .addVariable('setting', { defaultValue: 'value' })");
console.log("     .addSecret('token', { required: true })");
console.log("     .deploy()");
