import { defineOAuth2CustomApp, defineOAuthConnector } from "../src/index";

/**
 * Complete example showing OAuth connector deployment with proper hasOAuth field
 *
 * When deployed, this custom app will have hasOAuth: true set automatically
 * because it includes an OAuth connector.
 */

// 1. Define OAuth connector
const slackConnector = defineOAuthConnector("SlackOAuth")
  .withAuthUrl("https://slack.com/oauth/v2/authorize")
  .withTokenUrl("https://slack.com/api/oauth.v2.access")
  .withScopeSeparator(",") // Slack uses comma-separated scopes
  .withScope(["channels:read", "users:read", "chat:write"])
  .withAuthParams({
    response_type: "code",
  })
  .withHeaders({
    Accept: "application/json",
  })
  .build();

// 2. Define custom app with OAuth connector
// ✅ This will automatically set hasOAuth: true during deployment
const slackApp = defineOAuth2CustomApp("slack-integration")
  .withTitle("Slack Team Integration")
  .withOAuthConnector(slackConnector) // 🔐 OAuth connector provided
  .addSecret("client_id", {
    title: "OAuth Client ID",
    description: "OAuth2 Client ID from Slack app settings",
    required: true,
  })
  .addSecret("client_secret", {
    title: "OAuth Client Secret",
    description: "OAuth2 Client Secret from Slack app settings",
    required: true,
  })
  .addVariable("default_channel", {
    title: "Default Channel",
    description: "Default channel for notifications",
    defaultValue: "#general",
    required: false,
  })
  .deploy();

// 3. For comparison: Custom app WITHOUT OAuth connector
// ❌ This will leave hasOAuth undefined during deployment
const apiKeyApp = defineOAuth2CustomApp("api-key-app")
  .withTitle("API Key Based App")
  .addSecret("api_key")
  // No OAuth connector provided
  .deploy();

console.log("📝 OAuth Deployment Example:");
console.log("============================");
console.log("");
console.log("✅ Apps with OAuth connectors will have hasOAuth: true");
console.log("❌ Apps without OAuth connectors will have hasOAuth: undefined");
console.log("");
console.log("When these apps are deployed via the SDK's deploy handler,");
console.log("the deployment schema will correctly reflect OAuth capability:");
console.log("");
console.log("slack-integration → hasOAuth: true  (has OAuth connector)");
console.log("api-key-app       → hasOAuth: undefined (no OAuth connector)");

export { slackConnector, slackApp, apiKeyApp };
