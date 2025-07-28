import type { JSONSchema7 } from "json-schema";
import type { Model, MatchPattern } from "../types";
import { registerModel } from "../registry";

/**
 * Model Builder - fluent API for creating models
 */
export class ModelBuilder {
  private name: string;
  private title?: string;
  private schema?: JSONSchema7;
  private matchPattern?: MatchPattern;

  constructor(name: string) {
    this.name = name;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withSchema(schema: JSONSchema7): this {
    this.schema = schema;
    return this;
  }

  withMatchPattern(pattern: MatchPattern): this {
    this.matchPattern = pattern;
    return this;
  }

  deploy(): Model {
    const model: Model = {
      name: this.name,
      title: this.title,
      schema: this.schema,
      matchPattern: this.matchPattern,
    };

    // Register the model in the global registry
    registerModel(model, {
      builderType: "ModelBuilder",
      createdBy: "defineModel",
    });

    return model;
  }
}

/**
 * Factory function for creating a model builder
 */
export function defineModel(name: string): ModelBuilder {
  return new ModelBuilder(name);
}
