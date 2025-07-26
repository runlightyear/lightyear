import type { Integration, CustomApp, Collection } from "../types";
import { registerIntegration } from "../registry";

/**
 * Integration Builder - fluent API for creating integrations
 */
export class IntegrationBuilder {
  private name: string;
  private title?: string;
  private app?: Integration["app"];
  private collections: Record<string, Collection> = {};

  constructor(name: string) {
    this.name = name;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  /**
   * Use a built-in app provided by Lightyear
   */
  withApp(appName: string): this {
    this.app = {
      type: "builtin",
      name: appName,
    };
    return this;
  }

  /**
   * Use a custom app defined in your code
   */
  withCustomApp(customApp: CustomApp): this {
    this.app = {
      type: "custom",
      name: customApp.name,
      definition: customApp,
    };
    return this;
  }

  withCollection(name: string, collection: Collection): this {
    this.collections[name] = collection;
    return this;
  }

  withCollections(collections: Record<string, Collection>): this {
    Object.assign(this.collections, collections);
    return this;
  }

  deploy(): Integration {
    if (!this.app) {
      throw new Error(
        "Integration requires an app. Use .withApp() for built-in apps or .withCustomApp() for custom apps."
      );
    }

    const integration: Integration = {
      name: this.name,
      title: this.title,
      app: this.app,
      collections: this.collections,
    };

    // Register the integration in the global registry
    registerIntegration(integration, {
      builderType: "IntegrationBuilder",
      createdBy: "defineIntegration",
      appType: this.app.type,
      collectionCount: Object.keys(this.collections).length,
    });

    return integration;
  }
}

/**
 * Factory function for creating an integration builder
 */
export function defineIntegration(name: string): IntegrationBuilder {
  return new IntegrationBuilder(name);
}
