import type { JSONSchema7 } from "json-schema";
import type { Collection, Model, MatchPattern } from "../types";

/**
 * Collection Builder - fluent API for creating collections
 */
export class CollectionBuilder {
  private name: string;
  private title?: string;
  private models: Model[] = [];

  constructor(name: string) {
    this.name = name;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withModel(model: Model): this {
    this.models.push(model);
    return this;
  }

  withModels(models: Model[]): this {
    this.models.push(...models);
    return this;
  }

  addModel(
    name: string,
    options?: {
      title?: string;
      schema?: JSONSchema7;
      matchPattern?: MatchPattern;
    }
  ): this {
    this.models.push({
      name,
      title: options?.title,
      schema: options?.schema,
      matchPattern: options?.matchPattern,
    });
    return this;
  }

  build(): Collection {
    return {
      name: this.name,
      title: this.title,
      models: this.models,
    };
  }
}

/**
 * Factory function for creating a collection builder
 */
export function defineCollection(name: string): CollectionBuilder {
  return new CollectionBuilder(name);
}
