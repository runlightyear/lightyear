import { defineCustomApp } from '../app-builder';
import { defineOAuth2Connector, OAuth2Connector, OAuth2TokenResponse } from '../oauth2-connector';

/**
 * Advanced OAuth2 connector examples with customization
 */

// Example 1: Custom OAuth2 connector for an API with non-standard parameters
class GitHubOAuth2Connector extends OAuth2Connector {
  protected getAdditionalAuthParams(): Record<string, string> {
    return {
      allow_signup: 'false' // GitHub-specific parameter
    };
  }

  protected formatScopes(scopes: string[]): string {
    // GitHub uses space-separated scopes (default), but we could customize
    return scopes.join(' ');
  }
}

const githubApp = defineCustomApp('github_custom', 'OAUTH2')
  .withTitle('GitHub Custom Integration')
  .build();

const githubConnector = defineOAuth2Connector(githubApp)
  .withClientCredentials('github-client-id', 'github-client-secret')
  .withEndpoints(
    'https://github.com/login/oauth/authorize',
    'https://github.com/login/oauth/access_token'
  )
  .withScopes('repo', 'user', 'gist')
  .withConnectorClass(GitHubOAuth2Connector)
  .build();

// Example 2: API with comma-separated scopes and custom headers
class CustomAPIConnector extends OAuth2Connector {
  protected formatScopes(scopes: string[]): string {
    // This API uses comma-separated scopes
    return scopes.join(',');
  }

  protected getAdditionalHeaders(): Record<string, string> {
    return {
      'X-API-Version': '2.0',
      'Accept': 'application/json'
    };
  }

  protected getAdditionalTokenParams(): Record<string, string> {
    return {
      audience: 'https://api.custom.com' // Some APIs require audience parameter
    };
  }
}

const customApp = defineCustomApp('custom_api', 'OAUTH2')
  .withTitle('Custom API')
  .build();

const customConnector = defineOAuth2Connector(customApp)
  .withClientCredentials('custom-client-id', 'custom-client-secret')
  .withEndpoints(
    'https://auth.custom.com/authorize',
    'https://auth.custom.com/token'
  )
  .withScopes('read:data', 'write:data', 'delete:data')
  .withConnectorClass(CustomAPIConnector)
  .build();

// Example 3: API with non-standard token response
class NonStandardOAuth2Connector extends OAuth2Connector {
  protected processTokenResponse(response: any): OAuth2TokenResponse {
    // This API returns token data in a nested structure
    return {
      access_token: response.data.token,
      token_type: response.data.type || 'Bearer',
      expires_in: response.data.ttl, // Uses 'ttl' instead of 'expires_in'
      refresh_token: response.data.refresh,
      scope: response.data.permissions?.join(' ')
    };
  }

  calculateExpiresAt(tokenResponse: OAuth2TokenResponse): Date | null {
    // This API returns expires_in in minutes instead of seconds
    if (!tokenResponse.expires_in) {
      return null;
    }
    
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + tokenResponse.expires_in);
    return expiresAt;
  }
}

// Example 4: API that requires PKCE (Proof Key for Code Exchange)
class PKCEOAuth2Connector extends OAuth2Connector {
  private codeVerifier?: string;
  private codeChallenge?: string;

  async initializePKCE() {
    // In real implementation, generate cryptographically secure values
    this.codeVerifier = 'generated-code-verifier';
    this.codeChallenge = 'generated-code-challenge';
  }

  protected getAdditionalAuthParams(): Record<string, string> {
    if (!this.codeChallenge) {
      throw new Error('PKCE not initialized');
    }
    
    return {
      code_challenge: this.codeChallenge,
      code_challenge_method: 'S256'
    };
  }

  protected getAdditionalTokenParams(): Record<string, string> {
    if (!this.codeVerifier) {
      throw new Error('PKCE not initialized');
    }
    
    return {
      code_verifier: this.codeVerifier
    };
  }
}

// Example 5: Slack-style OAuth with additional parameters
class SlackOAuth2Connector extends OAuth2Connector {
  protected getAdditionalAuthParams(): Record<string, string> {
    return {
      team: 'T1234567890', // Slack team ID
      user_scope: 'identity.basic,identity.email' // Slack user scopes
    };
  }

  protected processTokenResponse(response: any): OAuth2TokenResponse {
    // Slack includes additional data in the response
    return {
      ...response,
      team_id: response.team?.id,
      team_name: response.team?.name,
      user_id: response.authed_user?.id
    };
  }
}