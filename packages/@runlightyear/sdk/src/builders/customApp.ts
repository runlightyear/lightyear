import type { CustomApp, AppAuthType, AppVariable, AppSecret } from "../types";
import { registerCustomApp } from "../registry";

/**
 * Custom App Builder - fluent API for creating custom apps
 */
export class CustomAppBuilder {
  private name: string;
  private type: AppAuthType;
  private title?: string;
  private variables: AppVariable[] = [];
  private secrets: AppSecret[] = [];

  constructor(name: string, type: AppAuthType) {
    this.name = name;
    this.type = type;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  addVariable(
    name: string,
    options?: {
      title?: string;
      description?: string;
      defaultValue?: string;
      required?: boolean;
    }
  ): this {
    this.variables.push({
      name,
      title: options?.title,
      description: options?.description,
      defaultValue: options?.defaultValue,
      required: options?.required ?? false,
    });
    return this;
  }

  addVariables(variables: AppVariable[]): this {
    this.variables.push(...variables);
    return this;
  }

  addSecret(
    name: string,
    options?: {
      title?: string;
      description?: string;
      required?: boolean;
    }
  ): this {
    this.secrets.push({
      name,
      title: options?.title,
      description: options?.description,
      required: options?.required ?? false,
    });
    return this;
  }

  addSecrets(secrets: AppSecret[]): this {
    this.secrets.push(...secrets);
    return this;
  }

  deploy(): CustomApp {
    const app: CustomApp = {
      name: this.name,
      type: this.type,
      title: this.title,
      variables: this.variables.length > 0 ? this.variables : undefined,
      secrets: this.secrets.length > 0 ? this.secrets : undefined,
    };

    // Register the custom app in the global registry
    registerCustomApp(app, {
      builderType: "CustomAppBuilder",
      createdBy: "defineCustomApp",
      variableCount: this.variables.length,
      secretCount: this.secrets.length,
    });

    return app;
  }
}

/**
 * Factory function for creating an OAuth2 custom app builder
 */
export function defineOAuth2CustomApp(name: string): CustomAppBuilder {
  return new CustomAppBuilder(name, "OAUTH2");
}

/**
 * Factory function for creating an API Key custom app builder
 */
export function defineApiKeyCustomApp(name: string): CustomAppBuilder {
  return new CustomAppBuilder(name, "APIKEY");
}

/**
 * Factory function for creating a Basic Auth custom app builder
 */
export function defineBasicCustomApp(name: string): CustomAppBuilder {
  return new CustomAppBuilder(name, "BASIC");
}

/**
 * Generic factory function for creating any custom app type
 */
export function defineCustomApp(
  name: string,
  type: AppAuthType
): CustomAppBuilder {
  return new CustomAppBuilder(name, type);
}
