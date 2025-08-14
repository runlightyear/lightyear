import type { JSONSchema7 } from "json-schema";
import type { Collection, Model, MatchPattern } from "../types";
import { registerCollection, registerModel } from "../registry";

// Type to accept both JSONSchema7 and const schemas
type Schema = JSONSchema7 | Readonly<any>;

/**
 * Collection Builder - fluent API for creating collections
 */
export class CollectionBuilder {
  private name: string;
  private title?: string;
  private models: Model<any>[] = [];

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withModel(model: Model<any>): this {
    this.models.push(model);
    return this;
  }

  withModels(models: Model<any>[]): this {
    this.models.push(...models);
    return this;
  }

  addModel(
    name: string,
    options?: {
      title?: string;
      schema?: Schema;
      matchPattern?: MatchPattern;
    }
  ): this {
    const model: Model<any> = {
      name,
      title: options?.title,
      schema: options?.schema as any,
      matchPattern: options?.matchPattern,
    };

    // Register the model in the registry
    registerModel(model, {
      builderType: "CollectionBuilder",
      createdBy: "addModel",
      parentCollection: this.name,
    });

    this.models.push(model);
    return this;
  }

  deploy(): Collection {
    const collection: Collection = {
      name: this.name,
      title: this.title,
      models: this.models,
    };

    // Register the collection in the global registry
    registerCollection(collection, {
      builderType: "CollectionBuilder",
      createdBy: "defineCollection",
      modelCount: this.models.length,
    });

    return collection;
  }
}

/**
 * Factory function for creating a collection builder
 */
export function defineCollection(name: string): CollectionBuilder {
  return new CollectionBuilder(name);
}
