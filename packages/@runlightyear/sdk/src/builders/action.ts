import type { Action, CustomApp, AppVariable, AppSecret } from "../types";
import { registerAction } from "../registry";

/**
 * Action Builder - fluent API for creating actions
 */
export class ActionBuilder {
  private name: string;
  private title?: string;
  private description?: string;
  private apps: string[] = [];
  private customApps: string[] = [];
  private variables: AppVariable[] = [];
  private secrets: AppSecret[] = [];

  constructor(name: string) {
    this.name = name;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Add a built-in app that this action will use
   */
  withApp(appName: string): this {
    if (!this.apps.includes(appName)) {
      this.apps.push(appName);
    }
    return this;
  }

  /**
   * Add multiple built-in apps that this action will use
   */
  withApps(appNames: string[]): this {
    appNames.forEach((appName) => {
      if (!this.apps.includes(appName)) {
        this.apps.push(appName);
      }
    });
    return this;
  }

  /**
   * Add a custom app that this action will use
   */
  withCustomApp(customApp: CustomApp | string): this {
    const appName = typeof customApp === "string" ? customApp : customApp.name;
    if (!this.customApps.includes(appName)) {
      this.customApps.push(appName);
    }
    return this;
  }

  /**
   * Add multiple custom apps that this action will use
   */
  withCustomApps(customApps: (CustomApp | string)[]): this {
    customApps.forEach((customApp) => {
      const appName =
        typeof customApp === "string" ? customApp : customApp.name;
      if (!this.customApps.includes(appName)) {
        this.customApps.push(appName);
      }
    });
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

  deploy(): Action {
    const action: Action = {
      name: this.name,
      title: this.title,
      description: this.description,
      apps: this.apps.length > 0 ? this.apps : undefined,
      customApps: this.customApps.length > 0 ? this.customApps : undefined,
      variables: this.variables.length > 0 ? this.variables : undefined,
      secrets: this.secrets.length > 0 ? this.secrets : undefined,
    };

    // Register the action in the global registry
    registerAction(action, {
      builderType: "ActionBuilder",
      createdBy: "defineAction",
      appCount: this.apps.length,
      customAppCount: this.customApps.length,
      variableCount: this.variables.length,
      secretCount: this.secrets.length,
    });

    return action;
  }
}

/**
 * Factory function for creating an action builder
 */
export function defineAction(name: string): ActionBuilder {
  return new ActionBuilder(name);
}
