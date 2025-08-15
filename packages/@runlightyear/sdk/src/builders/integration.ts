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
   * Add one or more actions to this integration
   */
  withAction(action: Action): this;
  withAction(...actions: Action[]): this;
  withAction(...actions: Action[]): this {
    actions.forEach((action) => {
      this.actions[action.name] = action;
    });
    return this;
  }

  /**
   * Add multiple actions to this integration
   */
  withActions(...actions: Action[]): this;
  withActions(actions: Action[]): this;
  withActions(...actionsOrArray: Action[] | [Action[]]): this {
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
export function defineIntegration(name: string): IntegrationBuilder {
  return new IntegrationBuilder(name);
}
