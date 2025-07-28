import { CustomApp } from './app-types';
import { Collection } from './types';

/**
 * Type-safe integration builder using TypeScript's builder pattern
 */

// Option 1: Branded types for compile-time safety
interface IntegrationBuilderBase {
  name: string;
  title?: string;
  collections: Record<string, Collection>;
}

interface IntegrationBuilderWithoutApp extends IntegrationBuilderBase {
  __hasApp: false;
}

interface IntegrationBuilderWithApp extends IntegrationBuilderBase {
  __hasApp: true;
  app: {
    type: 'builtin' | 'custom';
    name: string;
    definition?: CustomApp;
  };
}

export class IntegrationBuilder<T extends boolean = false> {
  private name: string;
  private title?: string;
  private app?: any;
  private collections: Record<string, Collection> = {};

  constructor(name: string) {
    this.name = name;
  }

  withTitle(title: string): IntegrationBuilder<T> {
    this.title = title;
    return this;
  }

  withApp(appName: string): IntegrationBuilder<true> {
    this.app = {
      type: 'builtin',
      name: appName
    };
    return this as any;
  }

  withCustomApp(customApp: CustomApp): IntegrationBuilder<true> {
    this.app = {
      type: 'custom',
      name: customApp.name,
      definition: customApp
    };
    return this as any;
  }

  withCollection(name: string, collection: Collection): IntegrationBuilder<T> {
    this.collections[name] = collection;
    return this;
  }

  withCollections(collections: Record<string, Collection>): IntegrationBuilder<T> {
    Object.assign(this.collections, collections);
    return this;
  }

  // Only available when T is true (app has been set)
  build(this: IntegrationBuilder<true>): Integration {
    return {
      name: this.name,
      title: this.title,
      app: this.app,
      collections: this.collections
    };
  }
}

// Option 2: Separate required steps pattern
export class IntegrationNameBuilder {
  constructor(private name: string) {}

  withApp(appName: string): IntegrationAppBuilder {
    return new IntegrationAppBuilder(this.name, {
      type: 'builtin',
      name: appName
    });
  }

  withCustomApp(customApp: CustomApp): IntegrationAppBuilder {
    return new IntegrationAppBuilder(this.name, {
      type: 'custom',
      name: customApp.name,
      definition: customApp
    });
  }
}

export class IntegrationAppBuilder {
  private title?: string;
  private collections: Record<string, Collection> = {};

  constructor(
    private name: string,
    private app: Integration['app']
  ) {}

  withTitle(title: string): this {
    this.title = title;
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
    return {
      name: this.name,
      title: this.title,
      app: this.app,
      collections: this.collections
    };
  }
}

// Option 3: Required configuration object
export interface IntegrationConfig {
  name: string;
  app: string | CustomApp;
  title?: string;
  collections?: Record<string, Collection>;
}

export function createIntegration(config: IntegrationConfig): Integration {
  const { name, app, title, collections = {} } = config;
  
  return {
    name,
    title,
    app: typeof app === 'string' 
      ? { type: 'builtin', name: app }
      : { type: 'custom', name: app.name, definition: app },
    collections
  };
}

export interface Integration {
  name: string;
  title?: string;
  app: {
    type: 'builtin' | 'custom';
    name: string;
    definition?: CustomApp;
  };
  collections: Record<string, Collection>;
}