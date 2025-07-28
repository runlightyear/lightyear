import { CustomApp, AuthorizationType } from './app-types';

/**
 * Builder for Custom Apps
 */
export class CustomAppBuilder {
  private name: string;
  private title?: string;
  private authorizationType: AuthorizationType;
  private variableNames: string[] = [];
  private secretNames: string[] = [];

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

  build(): CustomApp {
    return {
      name: this.name,
      title: this.title,
      authorizationType: this.authorizationType,
      variableNames: this.variableNames.length > 0 ? this.variableNames : undefined,
      secretNames: this.secretNames.length > 0 ? this.secretNames : undefined
    };
  }
}

/**
 * Factory function for creating custom apps
 */
export function defineCustomApp(name: string, authorizationType: AuthorizationType): CustomAppBuilder {
  return new CustomAppBuilder(name, authorizationType);
}

/**
 * Preset builders for common auth types
 */
export const defineOAuth2App = (name: string) => {
  return defineCustomApp(name, 'OAUTH2')
    .withVariables('clientId', 'authorizationUrl', 'tokenUrl', 'scopes')
    .withSecrets('clientSecret');
};

export const defineApiKeyApp = (name: string) => {
  return defineCustomApp(name, 'APIKEY')
    .withVariables('headerName')
    .withSecrets('apiKey');
};

export const defineBasicAuthApp = (name: string) => {
  return defineCustomApp(name, 'BASIC')
    .withVariables('username')
    .withSecrets('password');
};