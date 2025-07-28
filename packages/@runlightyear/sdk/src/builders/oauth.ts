import {
  OAuthConnector,
  OAuthConnectorProps,
  OAuthConnectorBaseUrls,
} from "../connectors/OAuthConnector";

/**
 * OAuth Connector Builder Configuration
 */
export interface OAuthConnectorBuilderConfig {
  name: string;
  authRequestUrlBase: string;
  accessTokenUrl: string;
  refreshTokenUrl?: string;
  additionalAuthParams?: Record<string, string>;
  additionalTokenParams?: Record<string, string>;
  customHeaders?: Record<string, string>;
  scopes?: string[];
  scopeConnector?: string;
}

/**
 * OAuth Connector Builder - fluent API for creating OAuth connectors
 */
export class OAuthConnectorBuilder {
  private config: Partial<OAuthConnectorBuilderConfig> = {};

  constructor(name: string) {
    this.config.name = name;
    this.config.scopes = [];
    this.config.scopeConnector = " "; // Default to space separator
  }

  /**
   * Set the OAuth authorization endpoint URL
   */
  withAuthUrl(url: string): this {
    this.config.authRequestUrlBase = url;
    return this;
  }

  /**
   * Set the OAuth token endpoint URL
   */
  withTokenUrl(url: string): this {
    this.config.accessTokenUrl = url;
    return this;
  }

  /**
   * Set the OAuth refresh token endpoint URL (optional, defaults to token URL)
   */
  withRefreshUrl(url: string): this {
    this.config.refreshTokenUrl = url;
    return this;
  }

  /**
   * Add additional parameters to the authorization request
   */
  withAuthParams(params: Record<string, string>): this {
    this.config.additionalAuthParams = {
      ...this.config.additionalAuthParams,
      ...params,
    };
    return this;
  }

  /**
   * Add additional parameters to the token request
   */
  withTokenParams(params: Record<string, string>): this {
    this.config.additionalTokenParams = {
      ...this.config.additionalTokenParams,
      ...params,
    };
    return this;
  }

  /**
   * Add custom headers to requests
   */
  withHeaders(headers: Record<string, string>): this {
    this.config.customHeaders = {
      ...this.config.customHeaders,
      ...headers,
    };
    return this;
  }

  /**
   * Set scopes for the authorization request
   */
  withScope(scopes: string[]): this {
    this.config.scopes = [...scopes];
    return this;
  }

  /**
   * Add one or more scopes to the authorization request
   */
  addScope(scope: string | string[]): this {
    if (!this.config.scopes) {
      this.config.scopes = [];
    }

    const scopesToAdd = Array.isArray(scope) ? scope : [scope];

    for (const s of scopesToAdd) {
      if (!this.config.scopes.includes(s)) {
        this.config.scopes.push(s);
      }
    }

    return this;
  }

  /**
   * Set the scope connector (separator) - default is space " "
   * Common alternatives: "," for comma, "+" for plus
   */
  withScopeSeparator(connector: string): this {
    this.config.scopeConnector = connector;
    return this;
  }

  /**
   * Build and return a factory function to create instances of the OAuth connector
   */
  build(): (props: OAuthConnectorProps) => OAuthConnector {
    const config = this.config;

    if (!config.authRequestUrlBase) {
      throw new Error(
        `OAuth connector '${config.name}' missing authorization URL`
      );
    }

    if (!config.accessTokenUrl) {
      throw new Error(`OAuth connector '${config.name}' missing token URL`);
    }

    return (props: OAuthConnectorProps) => {
      // Create a dynamic OAuth connector class inside the factory
      class BuiltOAuthConnector extends OAuthConnector {
        constructor(factoryProps: OAuthConnectorProps) {
          super(factoryProps);
        }

        getAuthRequestUrlBase(): string {
          return config.authRequestUrlBase!;
        }

        getAccessTokenUrl(): string {
          return config.accessTokenUrl!;
        }

        getRefreshTokenUrl(): string {
          return config.refreshTokenUrl || config.accessTokenUrl!;
        }

        getAuthRequestUrlParams(): Record<string, string> {
          const baseParams = super.getAuthRequestUrlParams();
          const params = {
            ...baseParams,
            ...config.additionalAuthParams,
          };

          // Add scopes if configured
          if (config.scopes && config.scopes.length > 0) {
            params.scope = config.scopes.join(config.scopeConnector || " ");
          }

          return params;
        }

        getRequestAccessTokenParams(code: string): Record<string, string> {
          const baseParams = super.getRequestAccessTokenParams(code);
          return {
            ...baseParams,
            ...config.additionalTokenParams,
          };
        }

        getRequestAccessTokenHeaders(): Record<string, string> {
          const baseHeaders = super.getRequestAccessTokenHeaders();
          return {
            ...baseHeaders,
            ...config.customHeaders,
          };
        }
      }

      return new BuiltOAuthConnector(props);
    };
  }
}

/**
 * Factory function for creating an OAuth connector builder
 */
export function defineOAuthConnector(name: string): OAuthConnectorBuilder {
  return new OAuthConnectorBuilder(name);
}
