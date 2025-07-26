import type {
  Action,
  CustomApp,
  AppVariable,
  AppSecret,
  RunFunc,
} from "../types";
import { registerAction } from "../registry";

// Global action index to store run functions (similar to lightyear package)
declare global {
  var actionIndex: { [name: string]: RunFunc };
}

// Initialize global action index if it doesn't exist
if (typeof globalThis !== "undefined") {
  globalThis.actionIndex = globalThis.actionIndex || {};
}

/**
 * Action Builder - fluent API for creating actions
 */
export class ActionBuilder {
  private name: string;
  private title?: string;
  private description?: string;
  private variables: AppVariable[] = [];
  private secrets: AppSecret[] = [];
  private runFunction?: RunFunc;

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

  /**
   * Set the function to run when this action is executed
   */
  withRun(runFunction: RunFunc): this {
    this.runFunction = runFunction;
    return this;
  }

  deploy(): Action {
    const action: Action = {
      name: this.name,
      title: this.title,
      description: this.description,
      variables: this.variables.length > 0 ? this.variables : undefined,
      secrets: this.secrets.length > 0 ? this.secrets : undefined,
      run: this.runFunction,
    };

    // Store the run function in the global action index (if provided)
    if (this.runFunction && typeof globalThis !== "undefined") {
      globalThis.actionIndex = globalThis.actionIndex || {};
      globalThis.actionIndex[this.name] = this.runFunction;
    }

    // Register the action in the global registry
    registerAction(action, {
      builderType: "ActionBuilder",
      createdBy: "defineAction",
      variableCount: this.variables.length,
      secretCount: this.secrets.length,
      hasRunFunction: !!this.runFunction,
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
