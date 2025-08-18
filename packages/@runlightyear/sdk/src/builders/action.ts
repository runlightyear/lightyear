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

  /**
   * Change the builder's name. Useful when duplicating an action.
   */
  withName(name: string): this {
    this.name = name;
    return this;
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

  /**
   * Create a builder from an existing action or builder (copy constructor pattern).
   */
  static from(source: Action | ActionBuilder): ActionBuilder {
    if (source instanceof ActionBuilder) {
      const builder = new ActionBuilder(source.name);
      if (source.title) builder.withTitle(source.title);
      if (source.description) builder.withDescription(source.description);
      if (source.variables.length > 0) {
        builder.addVariables(source.variables.map((v) => ({ ...v })));
      }
      if (source.secrets.length > 0) {
        builder.addSecrets(source.secrets.map((s) => ({ ...s })));
      }
      if (source.runFunction) builder.withRun(source.runFunction);
      return builder;
    }

    const action = source as Action;
    const builder = new ActionBuilder(action.name);
    if (action.title) builder.withTitle(action.title);
    if (action.description) builder.withDescription(action.description);
    if (action.variables && action.variables.length > 0) {
      builder.addVariables(action.variables.map((v) => ({ ...v })));
    }
    if (action.secrets && action.secrets.length > 0) {
      builder.addSecrets(action.secrets.map((s) => ({ ...s })));
    }
    if (action.run) builder.withRun(action.run);
    return builder;
  }

  /**
   * Backwards-compatible alias of from() for actions.
   */
  static fromAction(action: Action): ActionBuilder {
    return ActionBuilder.from(action);
  }

  /**
   * Duplicate this builder into a new one with a different name.
   * Title and other fields can be overridden on the returned builder.
   */
  duplicateAs(newName: string): ActionBuilder {
    return ActionBuilder.from(this).withName(newName);
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
export interface DefineActionFn {
  (name: string): ActionBuilder;
  from: (source: Action | ActionBuilder) => ActionBuilder;
  fromAction: (action: Action) => ActionBuilder;
}

export const defineAction: DefineActionFn = ((name: string) =>
  new ActionBuilder(name)) as DefineActionFn;

defineAction.from = (source: Action | ActionBuilder) =>
  ActionBuilder.from(source);

defineAction.fromAction = (action: Action) => ActionBuilder.from(action);
