import { App, CustomApp } from './app-types';
import { Collection } from './types';

/**
 * Simplified integration builder that treats built-in apps as strings
 */

export interface Integration {
  app: string | CustomApp;
  collections: Record<string, Collection>;
}

export class IntegrationBuilder {
  private app?: string | CustomApp;
  private collections: Record<string, Collection> = {};

  withApp(app: string | CustomApp): this {
    this.app = app;
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