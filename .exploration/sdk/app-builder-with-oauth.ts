import { CustomApp, AuthorizationType } from './app-types';
import { OAuth2Connector, OAuth2ConnectorBuilder } from './oauth2-connector';

/**
 * Enhanced app builder that can include OAuth2 connector configuration
 */

export class CustomAppBuilder {
  private name: string;
  private title?: string;
  private authorizationType: AuthorizationType;
  private variableNames: string[] = [];
  private secretNames: string[] = [];
  private oauth2ConnectorBuilder?: OAuth2ConnectorBuilder;

  constructor(name: string, authorizationType: AuthorizationType) {
    this.name = name;
    this.authorizationType = authorizationType;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withVariables(...names: string[]): this {
    this.variableNames.push(...names);
    return this;
  }

  withSecrets(...names: string[]): this {
    this.secretNames.push(...names);
    return this;
  }

  /**
   * Configure OAuth2 connector for this app
   */
  withOAuth2Connector(
    configure: (builder: OAuth2ConnectorBuilder) => OAuth2ConnectorBuilder
  ): this {
    if (this.authorizationType !== 'OAUTH2') {
      throw new Error('OAuth2 connector can only be used with OAUTH2 authorization type');
    }
    
    // Create a temporary app object for the builder
    const tempApp: CustomApp = {
      name: this.name,
      title: this.title,
      authorizationType: this.authorizationType
    };
    
    this.oauth2ConnectorBuilder = configure(new OAuth2ConnectorBuilder(tempApp));
    return this;
  }

  build(): CustomApp & { oauth2Connector?: OAuth2Connector } {
    const app: CustomApp = {
      name: this.name,
      title: this.title,
      authorizationType: this.authorizationType,
      variableNames: this.variableNames.length > 0 ? this.variableNames : undefined,
      secretNames: this.secretNames.length > 0 ? this.secretNames : undefined
    };

    // Build OAuth2 connector if configured
    if (this.oauth2ConnectorBuilder) {
      return {
        ...app,
        oauth2Connector: this.oauth2ConnectorBuilder.build()
      };
    }

    return app;
  }
}

export function defineCustomApp(name: string, authorizationType: AuthorizationType): CustomAppBuilder {
  return new CustomAppBuilder(name, authorizationType);
}

// Convenience builder for OAuth2 apps with connector
export function defineOAuth2AppWithConnector(name: string) {
  return new CustomAppBuilder(name, 'OAUTH2')
    .withVariables('clientId', 'authorizationUrl', 'tokenUrl', 'scopes')
    .withSecrets('clientSecret');
}