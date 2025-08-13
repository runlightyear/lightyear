/**
 * Custom App Examples
 *
 * Various examples showing how to define custom apps with different authentication types
 */

import {
  defineApiKeyCustomApp,
  defineBasicCustomApp,
  defineOAuth2CustomApp,
  createOAuthConnector,
} from "../src";

/**
 * Create a custom app with API_KEY authentication
 */

const simpleApiKeyApp = defineApiKeyCustomApp("weather-api").deploy();

/**
 * Create a custom app with API_KEY authentication and a title
 */

const titledApiKeyApp = defineApiKeyCustomApp("sendgrid")
  .withTitle("SendGrid Email Service")
  .deploy();

/**
 * Create a custom app with BASIC authentication
 */

const basicAuthApp = defineBasicCustomApp("legacy-crm")
  .withTitle("Legacy CRM System")
  .deploy();

/**
 * Create a custom app with OAUTH2 authentication and a title
 */

const oauth2App = defineOAuth2CustomApp("google-sheets")
  .withTitle("Google Sheets")
  .deploy();

/**
 * Create a custom app with OAUTH2 authentication and a title and a connector
 */

// First, create an OAuth connector (uses createXXX pattern for in-memory objects)
const slackOAuthConnector = createOAuthConnector()
  .withAuthUrl("https://slack.com/oauth/v2/authorize")
  .withTokenUrl("https://slack.com/api/oauth.v2.access")
  .withScope(["channels:read", "chat:write", "users:read"])
  .build();

const slackApp = defineOAuth2CustomApp("slack")
  .withTitle("Slack Workspace")
  .withOAuthConnector(slackOAuthConnector)
  .deploy();

/**
 * Create a custom app with OAUTH2 authentication and a title and a connector and a variable
 */

const githubOAuthConnector = createOAuthConnector()
  .withAuthUrl("https://github.com/login/oauth/authorize")
  .withTokenUrl("https://github.com/login/oauth/access_token")
  .withScope(["repo", "user"])
  .build();

const githubApp = defineOAuth2CustomApp("github")
  .withTitle("GitHub Integration")
  .withOAuthConnector(githubOAuthConnector)
  .addVariable("default_org", {
    title: "Default Organization",
    description: "Default GitHub organization for operations",
    required: false,
  })
  .deploy();

/**
 * Create a custom app with OAUTH2 authentication and a title and a connector and a variable and a secret
 */

const salesforceOAuthConnector = createOAuthConnector()
  .withAuthUrl("https://login.salesforce.com/services/oauth2/authorize")
  .withTokenUrl("https://login.salesforce.com/services/oauth2/token")
  .withScope(["api", "refresh_token", "offline_access"])
  .build();

const salesforceApp = defineOAuth2CustomApp("salesforce")
  .withTitle("Salesforce CRM")
  .withOAuthConnector(salesforceOAuthConnector)
  .addVariable("instance_url", {
    title: "Instance URL",
    description: "Your Salesforce instance URL",
    required: true,
  })
  .addSecret("security_token", {
    title: "Security Token",
    description: "Salesforce security token for API access",
    required: false,
  })
  .deploy();

// Export examples for reference
export {
  simpleApiKeyApp,
  titledApiKeyApp,
  basicAuthApp,
  oauth2App,
  slackApp,
  githubApp,
  salesforceApp,
};
