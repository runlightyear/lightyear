import type { JSONSchema7 } from "json-schema";
import type { Model, MatchPattern, Collection } from "../types";
import { registerModel } from "../registry";
import { CollectionBuilder } from "./collection";

// Type to accept both JSONSchema7 and const schemas
type Schema = JSONSchema7 | Readonly<any>;

/**
 * Model Builder - fluent API for creating models that belong to a collection
 */
export class ModelBuilder {
  private collection: Collection | CollectionBuilder;
  private name: string;
  private title?: string;
  private schema?: JSONSchema7;
  private matchPattern?: MatchPattern;

  constructor(collection: Collection | CollectionBuilder, name: string) {
    this.collection = collection;
    this.name = name;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withSchema(schema: Schema): this {
    this.schema = schema as JSONSchema7;
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

    // If collection is a CollectionBuilder, add the model to it
    if (this.collection instanceof CollectionBuilder) {
      this.collection.withModel(model);
    } else {
      // If it's already a deployed collection, add to its models array
      if (!this.collection.models.some(m => m.name === model.name)) {
        this.collection.models.push(model);
      }
    }

    // Register the model in the global registry
    const collectionName = this.collection instanceof CollectionBuilder 
      ? this.collection.getName() 
      : this.collection.name;

    registerModel(model, {
      builderType: "ModelBuilder",
      createdBy: "defineModel",
      parentCollection: collectionName,
    });

    return model;
  }
}

/**
 * Factory function for creating a model builder
 * @param collection - The collection this model belongs to
 * @param name - The name of the model
 */
export function defineModel(collection: Collection | CollectionBuilder, name: string): ModelBuilder {
  return new ModelBuilder(collection, name);
}
