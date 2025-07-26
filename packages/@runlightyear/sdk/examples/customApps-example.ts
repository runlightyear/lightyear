/**
 * Custom Apps Example
 *
 * This example demonstrates how to define custom apps with different
 * authentication types, variables, and secrets using the SDK.
 */

import {
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
  defineBasicCustomApp,
  defineCustomApp,
  getCustomApps,
  clearRegistry,
  exportRegistry,
} from "../src";

console.log("=== Custom Apps Example ===\n");

// Clear any existing registry data
clearRegistry();

// OAuth2 Custom Apps - For integrations that use OAuth2 flow
console.log("🔐 Creating OAuth2 Custom Apps...");
const githubApp = defineOAuth2CustomApp("github")
  .withTitle("GitHub Integration")
  .addVariable("base_url", {
    title: "GitHub Base URL",
    description: "Base URL for GitHub API (use for GitHub Enterprise)",
    defaultValue: "https://api.github.com",
    required: false,
  })
  .addSecret("client_id", {
    title: "OAuth Client ID",
    description: "OAuth2 Client ID from GitHub App settings",
    required: true,
  })
  .addSecret("client_secret", {
    title: "OAuth Client Secret",
    description: "OAuth2 Client Secret from GitHub App settings",
    required: true,
  })
  .build();

const slackApp = defineOAuth2CustomApp("slack")
  .withTitle("Slack Team Integration")
  .addVariable("workspace_url", {
    title: "Slack Workspace URL",
    description: "Your Slack workspace URL (e.g., myteam.slack.com)",
    required: true,
  })
  .addSecret("client_id", {
    title: "Slack Client ID",
    required: true,
  })
  .addSecret("client_secret", {
    title: "Slack Client Secret",
    required: true,
  })
  .addSecret("signing_secret", {
    title: "Slack Signing Secret",
    description: "Used to verify requests from Slack",
    required: false,
  })
  .build();

console.log(
  `✅ Created ${
    getCustomApps().filter((a) => a.customApp.type === "OAUTH2").length
  } OAuth2 custom apps\n`
);

// API Key Custom Apps - For simple API key authentication
console.log("🔑 Creating API Key Custom Apps...");
const stripeApp = defineApiKeyCustomApp("stripe")
  .withTitle("Stripe Payments")
  .addVariable("api_version", {
    title: "Stripe API Version",
    description: "Stripe API version to use",
    defaultValue: "2023-10-16",
    required: false,
  })
  .addVariable("webhook_endpoint_secret", {
    title: "Webhook Endpoint Secret",
    description: "Secret for webhook endpoint verification",
    required: false,
  })
  .addSecret("secret_key", {
    title: "Stripe Secret Key",
    description: "Your Stripe secret key (starts with sk_)",
    required: true,
  })
  .addSecret("publishable_key", {
    title: "Stripe Publishable Key",
    description: "Your Stripe publishable key (starts with pk_)",
    required: false,
  })
  .build();

const mailgunApp = defineApiKeyCustomApp("mailgun")
  .withTitle("Mailgun Email Service")
  .addVariable("domain", {
    title: "Mailgun Domain",
    description: "Your verified Mailgun domain",
    required: true,
  })
  .addVariable("region", {
    title: "Mailgun Region",
    description: "US or EU region",
    defaultValue: "US",
    required: false,
  })
  .addSecret("api_key", {
    title: "Mailgun API Key",
    description: "Your Mailgun private API key",
    required: true,
  })
  .build();

console.log(
  `✅ Created ${
    getCustomApps().filter((a) => a.customApp.type === "APIKEY").length
  } API Key custom apps\n`
);

// Basic Auth Custom Apps - For username/password authentication
console.log("🔐 Creating Basic Auth Custom Apps...");
const legacySystemApp = defineBasicCustomApp("legacy-crm")
  .withTitle("Legacy CRM System")
  .addVariable("base_url", {
    title: "CRM Base URL",
    description: "Base URL for the legacy CRM API",
    required: true,
  })
  .addVariable("timeout", {
    title: "Request Timeout",
    description: "Request timeout in milliseconds",
    defaultValue: "30000",
    required: false,
  })
  .addSecret("username", {
    title: "CRM Username",
    description: "Username for CRM authentication",
    required: true,
  })
  .addSecret("password", {
    title: "CRM Password",
    description: "Password for CRM authentication",
    required: true,
  })
  .build();

// Using the generic defineCustomApp function
const customApp = defineCustomApp("custom-api", "BASIC")
  .withTitle("Custom API Integration")
  .addVariable("environment", {
    title: "Environment",
    description: "Deployment environment",
    defaultValue: "production",
    required: true,
  })
  .addSecret("api_token", {
    title: "API Token",
    required: true,
  })
  .build();

console.log(
  `✅ Created ${
    getCustomApps().filter((a) => a.customApp.type === "BASIC").length
  } Basic Auth custom apps\n`
);

// Display all registered custom apps
console.log("📱 All Registered Custom Apps:");
const apps = getCustomApps();
apps.forEach((entry, index) => {
  const app = entry.customApp;
  console.log(`  ${index + 1}. ${app.name} (${app.title || "No title"})`);
  console.log(`     - Type: ${app.type}`);
  console.log(`     - Variables: ${app.variables?.length || 0}`);
  console.log(`     - Secrets: ${app.secrets?.length || 0}`);
  console.log(`     - Registry ID: ${entry.id}`);

  if (app.variables && app.variables.length > 0) {
    console.log(
      `     - Variable names: ${app.variables.map((v) => v.name).join(", ")}`
    );
  }

  if (app.secrets && app.secrets.length > 0) {
    console.log(
      `     - Secret names: ${app.secrets.map((s) => s.name).join(", ")}`
    );
  }
  console.log();
});

// Export for deployment
console.log("🚀 Registry Export for Deployment:");
const exported = exportRegistry();
console.log(`- Total items: ${exported.items.length}`);
console.log(`- Custom Apps: ${exported.stats.byType.customApp || 0}`);
console.log(`- Models: ${exported.stats.byType.model || 0}`);
console.log(`- Collections: ${exported.stats.byType.collection || 0}`);
console.log();

// Show a sample custom app configuration for deployment
console.log("📋 Sample Custom App Configuration (GitHub):");
const githubEntry = apps.find((a) => a.customApp.name === "github");
if (githubEntry) {
  console.log(JSON.stringify(githubEntry.customApp, null, 2));
}

export {
  githubApp,
  slackApp,
  stripeApp,
  mailgunApp,
  legacySystemApp,
  customApp,
  exported as deploymentData,
};
