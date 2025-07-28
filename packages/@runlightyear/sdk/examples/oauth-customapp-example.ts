import { defineOAuth2CustomApp, defineOAuthConnector } from "../src/index";

// Example 1: Using the fluent OAuth connector builder with array-based scopes
const myOAuthConnector = defineOAuthConnector("MyAPI")
  .withAuthUrl("https://api.example.com/oauth/authorize")
  .withTokenUrl("https://api.example.com/oauth/token")
  .withScope(["read", "write", "admin"])
  .withScopeSeparator(" ") // Use space separator
  .withAuthParams({
    prompt: "consent",
    access_type: "offline",
  })
  .build();

// Example 2: Defining connectors for common providers manually
const googleConnector = defineOAuthConnector("MyGoogleApp")
  .withAuthUrl("https://accounts.google.com/o/oauth2/v2/auth")
  .withTokenUrl("https://oauth2.googleapis.com/token")
  .withScopeSeparator(" ") // Google uses space-separated scopes
  .withScope([
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
  ])
  .withAuthParams({
    access_type: "offline",
    prompt: "consent",
  })
  .build();

const githubConnector = defineOAuthConnector("MyGitHubApp")
  .withAuthUrl("https://github.com/login/oauth/authorize")
  .withTokenUrl("https://github.com/login/oauth/access_token")
  .withScopeSeparator(" ") // GitHub uses space-separated scopes
  .withScope(["repo", "user"])
  .withHeaders({
    Accept: "application/json",
  })
  .build();

const slackConnector = defineOAuthConnector("MySlackApp")
  .withAuthUrl("https://slack.com/oauth/v2/authorize")
  .withTokenUrl("https://slack.com/api/oauth.v2.access")
  .withScopeSeparator(",") // Slack uses comma-separated scopes
  .withScope(["channels:read", "users:read", "chat:write"])
  .build();

// Example 3: Using addScope for incremental scope building
const incrementalConnector = defineOAuthConnector("IncrementalAPI")
  .withAuthUrl("https://api.example.com/oauth/authorize")
  .withTokenUrl("https://api.example.com/oauth/token")
  .addScope("read") // Single scope
  .addScope(["write", "admin"]) // Multiple scopes at once
  .addScope("delete") // Another single scope
  .withScopeSeparator("+") // Use plus separator
  .build();

// Example 4: Define custom apps with OAuth connectors
const customApp1 = defineOAuth2CustomApp("my-api-app")
  .withTitle("My API Integration")
  .withOAuthConnector(myOAuthConnector)
  .addVariable("apiVersion", {
    title: "API Version",
    description: "Version of the API to use",
    defaultValue: "v1",
    required: true,
  })
  .addSecret("webhookSecret", {
    title: "Webhook Secret",
    description: "Secret for webhook verification",
    required: false,
  })
  .deploy();

const googleDriveApp = defineOAuth2CustomApp("google-drive")
  .withTitle("Google Drive Integration")
  .withOAuthConnector(googleConnector)
  .addVariable("folderName", {
    title: "Default Folder",
    description: "Default folder for file operations",
    defaultValue: "Lightyear",
  })
  .deploy();

const githubApp = defineOAuth2CustomApp("github-integration")
  .withTitle("GitHub Integration")
  .withOAuthConnector(githubConnector)
  .addVariable("defaultBranch", {
    title: "Default Branch",
    defaultValue: "main",
  })
  .addVariable("organization", {
    title: "GitHub Organization",
    description: "GitHub organization name",
  })
  .deploy();

// Example 5: How to use the custom apps (actions would be defined separately)
// Once deployed, these custom apps can be used in actions to access OAuth-protected APIs
// The CLI operations (execGetAuthRequestUrl, execRequestAccessToken, execRefreshAccessToken)
// will automatically work with any custom app that has an OAuth connector configured

console.log("Custom apps deployed:");
console.log("- My API app:", customApp1.name);
console.log("- Google Drive app:", googleDriveApp.name);
console.log("- GitHub app:", githubApp.name);

// Example usage in an action context:
function exampleActionUsage() {
  // This is how you'd access the OAuth connector in an action run function:

  // const runFunction = async (props: RunFuncProps) => {
  //   const auth = props.auths["google-drive"];
  //   const variables = props.variables;
  //
  //   console.log(`Access token available: ${auth?.accessToken ? 'Yes' : 'No'}`);
  //   console.log(`Folder name: ${variables.folderName}`);
  //
  //   // Use auth.accessToken to make API calls
  //   // The OAuth connector handles the authentication flow automatically
  // };

  console.log("OAuth connector handles all authentication automatically!");
}

// Example 6: Advanced OAuth connector with custom headers and token params
const advancedOAuthConnector = defineOAuthConnector("AdvancedAPI")
  .withAuthUrl("https://advanced-api.example.com/oauth2/authorize")
  .withTokenUrl("https://advanced-api.example.com/oauth2/token")
  .withRefreshUrl("https://advanced-api.example.com/oauth2/refresh")
  .withScope(["advanced:read", "advanced:write"])
  .withScopeSeparator(" ")
  .withAuthParams({
    prompt: "consent",
    access_type: "offline",
    response_mode: "query",
  })
  .withTokenParams({
    client_assertion_type:
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  })
  .withHeaders({
    "User-Agent": "Lightyear-SDK/1.0",
    Accept: "application/json",
  })
  .build();

const advancedApp = defineOAuth2CustomApp("advanced-api")
  .withTitle("Advanced API Integration")
  .withOAuthConnector(advancedOAuthConnector)
  .deploy();

// Example 7: Microsoft OAuth with tenant-specific configuration
const microsoftConnector = defineOAuthConnector("MyMicrosoft")
  .withAuthUrl(
    "https://login.microsoftonline.com/your-tenant-id/oauth2/v2.0/authorize"
  )
  .withTokenUrl(
    "https://login.microsoftonline.com/your-tenant-id/oauth2/v2.0/token"
  )
  .withScopeSeparator(" ") // Microsoft uses space-separated scopes
  .withScope([
    "https://graph.microsoft.com/Mail.Read",
    "https://graph.microsoft.com/User.Read",
  ])
  .build();

const microsoftApp = defineOAuth2CustomApp("microsoft-graph")
  .withTitle("Microsoft Graph Integration")
  .withOAuthConnector(microsoftConnector)
  .deploy();

// Example 8: Different scope connectors and flexible addScope usage
const customApiWithCommaScopes = defineOAuthConnector("CommaAPI")
  .withAuthUrl("https://comma-api.example.com/oauth/authorize")
  .withTokenUrl("https://comma-api.example.com/oauth/token")
  .withScope(["read", "write"]) // Set initial scopes
  .addScope("delete") // Add single scope
  .addScope(["admin", "modify"]) // Add multiple scopes
  .withScopeSeparator(",") // Comma-separated
  .build();

const customApiWithPlusScopes = defineOAuthConnector("PlusAPI")
  .withAuthUrl("https://plus-api.example.com/oauth/authorize")
  .withTokenUrl("https://plus-api.example.com/oauth/token")
  .addScope(["read", "write"]) // Start with multiple scopes
  .addScope("delete") // Add single scope
  .withScopeSeparator("+") // Plus-separated
  .build();

export {
  customApp1,
  googleDriveApp,
  githubApp,
  advancedApp,
  microsoftApp,
  exampleActionUsage,
  incrementalConnector,
  customApiWithCommaScopes,
  customApiWithPlusScopes,
};
