import type { Integration, CustomApp, Collection, Action } from "../types";
import { registerIntegration } from "../registry";

/**
 * Integration Builder - fluent API for creating integrations
 */
export class IntegrationBuilder {
  private name: string;
  private title?: string;
  private app?: Integration["app"];
  private collections: Record<string, Collection> = {};
  private actions: Record<string, Action> = {};

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Copy-constructor: create a builder from an existing integration or builder
   */
  static from(source: Integration | IntegrationBuilder): IntegrationBuilder {
    const builder = new IntegrationBuilder(
      source instanceof IntegrationBuilder ? (source as any).name : source.name
    );
    const title =
      source instanceof IntegrationBuilder
        ? (source as any).title
        : source.title;
    if (title) builder.withTitle(title);
    const app =
      source instanceof IntegrationBuilder ? (source as any).app : source.app;
    if (app) {
      if (app.type === "builtin") builder.withApp(app.name);
      if (app.type === "custom" && app.definition)
        builder.withCustomApp(app.definition);
    }
    const collections =
      source instanceof IntegrationBuilder
        ? (source as any).collections
        : source.collections;
    if (collections) builder.withCollections({ ...collections });
    const actions =
      source instanceof IntegrationBuilder
        ? ((source as any).actions as Record<string, Action>)
        : (source.actions as Record<string, Action>);
    if (actions) {
      const actionList = Object.values(actions) as Action[];
      builder.withActions(actionList);
    }
    return builder;
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

  /**
   * Set the actions on this integration (override any previously set actions)
   */
  withAction(action: Action): this;
  withAction(...actions: Action[]): this;
  withAction(...actions: Action[]): this {
    this.actions = {};
    actions.forEach((action) => {
      this.actions[action.name] = action;
    });
    return this;
  }

  /**
   * Set multiple actions on this integration (override any previously set actions)
   */
  withActions(...actions: Action[]): this;
  withActions(actions: Action[]): this;
  withActions(...actionsOrArray: Action[] | [Action[]]): this {
    const actions = Array.isArray(actionsOrArray[0])
      ? (actionsOrArray[0] as Action[])
      : (actionsOrArray as Action[]);
    this.actions = {};
    actions.forEach((action) => {
      this.actions[action.name] = action;
    });
    return this;
  }

  /**
   * Add one or more actions (incremental, does not clear existing)
   */
  addAction(action: Action): this;
  addAction(...actions: Action[]): this;
  addAction(...actions: Action[]): this {
    actions.forEach((action) => {
      this.actions[action.name] = action;
    });
    return this;
  }

  /**
   * Add multiple actions (incremental, does not clear existing)
   */
  addActions(...actions: Action[]): this;
  addActions(actions: Action[]): this;
  addActions(...actionsOrArray: Action[] | [Action[]]): this {
    const actions = Array.isArray(actionsOrArray[0])
      ? (actionsOrArray[0] as Action[])
      : (actionsOrArray as Action[]);
    actions.forEach((action) => {
      this.actions[action.name] = action;
    });
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
      actions: this.actions,
    };

    // Register the integration in the global registry
    registerIntegration(integration, {
      builderType: "IntegrationBuilder",
      createdBy: "defineIntegration",
      appType: this.app.type,
      collectionCount: Object.keys(this.collections).length,
      actionCount: Object.keys(this.actions).length,
    });

    return integration;
  }
}

/**
 * Factory function for creating an integration builder
 */
export interface DefineIntegrationFn {
  (name: string): IntegrationBuilder;
  from: (source: Integration | IntegrationBuilder) => IntegrationBuilder;
}

export const defineIntegration: DefineIntegrationFn = ((name: string) =>
  new IntegrationBuilder(name)) as unknown as DefineIntegrationFn;

defineIntegration.from = (source: Integration | IntegrationBuilder) =>
  IntegrationBuilder.from(source);
