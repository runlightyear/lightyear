import {
  defineAction,
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
  exportRegistry,
} from "../src";

/**
 * Example: Creating Actions with Lightyear SDK
 *
 * This example demonstrates how to define actions that can be triggered
 * to perform specific tasks using built-in or custom apps.
 */

console.log("⚡ Action Builder Example\n");

// Example 1: Simple action with built-in apps
const salesforceSync = defineAction("salesforce-contact-sync")
  .withTitle("Salesforce Contact Sync")
  .withDescription("Synchronize contacts between Salesforce and other systems")
  .withApp("salesforce")
  .withApp("hubspot")
  .deploy();

console.log("Action 1 - Built-in Apps:");
console.log(`  Name: ${salesforceSync.name}`);
console.log(`  Title: ${salesforceSync.title}`);
console.log(`  Description: ${salesforceSync.description}`);
console.log(`  Apps: ${salesforceSync.apps?.join(", ") || "none"}`);
console.log(
  `  Custom Apps: ${salesforceSync.customApps?.join(", ") || "none"}\n`
);

// Example 2: Action with custom apps
const githubApp = defineOAuth2CustomApp("github-integration")
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

const slackApp = defineApiKeyCustomApp("slack-bot")
  .withTitle("Slack Bot Integration")
  .addSecret("bot_token", {
    title: "Bot User OAuth Token",
    description: "Slack bot token for API access",
    required: true,
  })
  .addVariable("default_channel", {
    title: "Default Channel",
    description: "Default channel for notifications",
    defaultValue: "#general",
    required: false,
  })
  .deploy();

const githubToSlackSync = defineAction("github-to-slack-notifications")
  .withTitle("GitHub to Slack Notifications")
  .withDescription("Send Slack notifications for GitHub repository events")
  .withCustomApp(githubApp)
  .withCustomApp(slackApp)
  .addVariable("event_types", {
    title: "Event Types to Monitor",
    description: "Comma-separated list of GitHub events to monitor",
    defaultValue: "push,pull_request,issues",
    required: true,
  })
  .addVariable("notification_template", {
    title: "Notification Template",
    description: "Template for Slack notifications",
    defaultValue: "{{event}} in {{repository}}: {{message}}",
    required: false,
  })
  .deploy();

console.log("Action 2 - Custom Apps:");
console.log(`  Name: ${githubToSlackSync.name}`);
console.log(`  Title: ${githubToSlackSync.title}`);
console.log(
  `  Custom Apps: ${githubToSlackSync.customApps?.join(", ") || "none"}`
);
console.log(`  Variables: ${githubToSlackSync.variables?.length || 0}`);
console.log(`  Secrets: ${githubToSlackSync.secrets?.length || 0}\n`);

// Example 3: Complex action with multiple apps and configuration
const dataSync = defineAction("multi-platform-data-sync")
  .withTitle("Multi-Platform Data Synchronization")
  .withDescription(
    "Synchronize data across multiple platforms with configurable options"
  )
  .withApps(["salesforce", "hubspot", "pipedrive"])
  .withCustomApps([githubApp, "zendesk-integration"])
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
console.log(`  Built-in Apps: ${dataSync.apps?.join(", ") || "none"}`);
console.log(`  Custom Apps: ${dataSync.customApps?.join(", ") || "none"}`);
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
console.log(`  Apps: ${simpleAction.apps?.length || 0}`);
console.log(`  Custom Apps: ${simpleAction.customApps?.length || 0}\n`);

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
console.log("1. Built-in apps only:");
console.log(
  "   defineAction('sync').withApp('salesforce').withApp('hubspot').deploy()"
);
console.log("\n2. Custom apps only:");
console.log("   defineAction('notify').withCustomApp(myApp).deploy()");
console.log("\n3. Mixed apps with configuration:");
console.log("   defineAction('complex')");
console.log("     .withApps(['salesforce', 'hubspot'])");
console.log("     .withCustomApp(customApp)");
console.log("     .addVariable('setting', { defaultValue: 'value' })");
console.log("     .addSecret('token', { required: true })");
console.log("     .deploy()");
