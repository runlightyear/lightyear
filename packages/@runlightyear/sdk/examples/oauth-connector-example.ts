import {
  OAuthConnector,
  OAuthConnectorProps,
  AuthData,
} from "../src/connectors/OAuthConnector";

/**
 * Example OAuth connector implementation for a generic OAuth2 provider
 */
class ExampleOAuthConnector extends OAuthConnector {
  constructor(props: OAuthConnectorProps) {
    super(props);
  }

  // Implement required abstract methods
  getAuthRequestUrlBase(): string {
    // Use configured base URL if provided, otherwise use default
    return (
      this.baseUrls?.authRequestUrl || "https://example.com/oauth/authorize"
    );
  }

  getAccessTokenUrl(): string {
    // Use configured base URL if provided, otherwise use default
    return this.baseUrls?.accessTokenUrl || "https://example.com/oauth/token";
  }

  // Optionally override other methods for customization
  getAuthRequestUrlParams(): Record<string, string> {
    const baseParams = super.getAuthRequestUrlParams();

    // Add any provider-specific parameters
    return {
      ...baseParams,
      scope: "read write", // Example: add scopes
    };
  }
}

/**
 * Example usage of the OAuth connector
 */
async function exampleUsage() {
  // Example configuration data
  const oauthConfigData = {
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
    authRequestUrl: null, // Can override base URLs here
  };

  // Example auth data (would come from your auth system)
  const authData: AuthData = {
    customAppName: "my-custom-app",
    authName: "oauth-auth",
    state: "random-state-string",
  };

  // Create connector with configurable base URLs
  const connector = new ExampleOAuthConnector({
    customAppName: "my-custom-app",
    oauthConfigData,
    authData,
    baseUrls: {
      authRequestUrl: "https://custom.example.com/oauth/authorize",
      accessTokenUrl: "https://custom.example.com/oauth/token",
      refreshTokenUrl: "https://custom.example.com/oauth/refresh",
    },
  });

  try {
    // Step 1: Generate auth request URL
    console.log("Generating auth request URL...");
    const authUrl = connector.getAuthRequestUrl();
    console.log("Auth URL:", authUrl);

    // Step 2: Exchange code for access token (after user authorizes)
    // const authorizationCode = "code-from-oauth-callback";
    // console.log("Exchanging code for access token...");
    // const tokenData = await connector.requestAccessToken(authorizationCode);
    // console.log("Token data:", tokenData);

    // Step 3: Refresh access token (when needed)
    // console.log("Refreshing access token...");
    // const refreshedTokenData = await connector.refreshAccessToken();
    // console.log("Refreshed token data:", refreshedTokenData);
  } catch (error) {
    console.error("OAuth operation failed:", error);
  }
}

// Usage with the SDK handlers
async function exampleWithHandlers() {
  const {
    handleGetAuthRequestUrl,
    handleRequestAccessToken,
    handleRefreshAccessToken,
  } = await import("../src/handlers/oauth");

  // Example: Getting auth request URL
  const authUrlResult = await handleGetAuthRequestUrl({
    customAppName: "my-custom-app",
    authName: "oauth-auth",
    oauthConfigData: {
      clientId: "your-client-id",
      clientSecret: "your-client-secret",
    },
    authData: {
      customAppName: "my-custom-app",
      authName: "oauth-auth",
      state: "random-state-string",
    },
    oauthConnector: new ExampleOAuthConnector({
      customAppName: "my-custom-app",
      oauthConfigData: {
        clientId: "your-client-id",
        clientSecret: "your-client-secret",
      },
      authData: {
        customAppName: "my-custom-app",
        authName: "oauth-auth",
        state: "random-state-string",
      },
    }),
  });

  console.log("Auth URL result:", authUrlResult);
}

export { ExampleOAuthConnector, exampleUsage, exampleWithHandlers };
