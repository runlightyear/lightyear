import { defineOAuth2AppWithConnector } from '../app-builder-with-oauth';
import { OAuth2Connector } from '../oauth2-connector';

/**
 * Example of defining a custom app with integrated OAuth2 connector
 */

// Define a complete OAuth2 app with custom connector behavior
class HubSpotOAuth2Connector extends OAuth2Connector {
  protected getAdditionalAuthParams(): Record<string, string> {
    return {
      optional_scope: 'content' // HubSpot-specific optional scopes
    };
  }

  protected processTokenResponse(response: any): OAuth2TokenResponse {
    // HubSpot includes hub_id in the response
    return {
      ...response,
      hub_id: response.hub_id
    };
  }
}

// Integrated definition
const hubspotApp = defineOAuth2AppWithConnector('hubspot_custom')
  .withTitle('HubSpot CRM')
  .withOAuth2Connector(builder => 
    builder
      .withClientCredentials('${clientId}', '${clientSecret}') // Will be replaced with actual values
      .withEndpoints(
        'https://app.hubspot.com/oauth/authorize',
        'https://api.hubapi.com/oauth/v1/token'
      )
      .withScopes(
        'crm.objects.contacts.read',
        'crm.objects.contacts.write',
        'crm.objects.companies.read',
        'crm.objects.companies.write'
      )
      .withConnectorClass(HubSpotOAuth2Connector)
  )
  .build();

// The app now has both the definition and the OAuth2 connector
async function useHubSpotApp() {
  // Access the OAuth2 connector
  const connector = hubspotApp.oauth2Connector;
  if (!connector) return;

  // Generate auth URL
  const authRequest = connector.buildAuthorizationUrl('state-123');
  console.log('Auth URL:', authRequest.url);

  // Exchange code for token
  const tokenResponse = await connector.exchangeCodeForToken('auth-code');
  console.log('Token:', tokenResponse.access_token);
  console.log('Hub ID:', tokenResponse.hub_id); // Custom field
}

// Simpler example with standard OAuth2 flow
const simpleOAuthApp = defineOAuth2AppWithConnector('simple_oauth')
  .withTitle('Simple OAuth App')
  .withOAuth2Connector(builder =>
    builder
      .withClientCredentials('${clientId}', '${clientSecret}')
      .withEndpoints(
        '${authorizationUrl}',
        '${tokenUrl}'
      )
      .withScopes('read', 'write')
  )
  .build();

// Example with all customizations
const advancedApp = defineOAuth2AppWithConnector('advanced_oauth')
  .withTitle('Advanced OAuth Integration')
  .withVariables('apiEndpoint', 'environment') // Additional variables
  .withSecrets('apiKey') // Additional secrets beyond OAuth
  .withOAuth2Connector(builder =>
    builder
      .withClientCredentials('${clientId}', '${clientSecret}')
      .withEndpoints(
        'https://auth.advanced.com/oauth/authorize',
        'https://auth.advanced.com/oauth/token'
      )
      .withScopes('full_access')
      .withRedirectUri('https://custom.redirect.uri/callback')
  )
  .build();