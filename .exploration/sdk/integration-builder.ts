import { App, CustomApp, BuiltInApp } from './app-types';
import { Collection } from './types';
import { BuiltInAppName, BuiltInApps } from './built-in-apps';

/**
 * Integration builder for combining apps and collections
 */

export interface Integration {
  app: App;
  collections: Record<string, Collection>;
}

export class IntegrationBuilder {
  private app?: App;
  private collections: Record<string, Collection> = {};

  withApp(app: App | BuiltInAppName): this {
    if (typeof app === 'string') {
      // Look up built-in app by name
      const builtInApp = Object.values(BuiltInApps).find(a => a.name === app);
      if (!builtInApp) {
        throw new Error(`Unknown built-in app: ${app}`);
      }
      this.app = builtInApp;
    } else {
      this.app = app;
    }
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

  build(): Integration {
    if (!this.app) {
      throw new Error('Integration requires an app');
    }
    
    return {
      app: this.app,
      collections: this.collections
    };
  }
}

export function defineIntegration(): IntegrationBuilder {
  return new IntegrationBuilder();
}