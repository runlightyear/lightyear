import { JSONSchema7 } from 'json-schema';
import { Collection, Model, MatchPattern } from './types';
import { getDisplayTitle } from './utils';

/**
 * Model Builder
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

  build(): Model {
    return {
      name: this.name,
      title: this.title,
      schema: this.schema,
      matchPattern: this.matchPattern
    };
  }
}

/**
 * Collection Builder
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
      matchPattern: options?.matchPattern
    });
    return this;
  }

  build(): Collection {
    return {
      name: this.name,
      title: this.title,
      models: this.models
    };
  }
}

/**
 * Factory functions
 */
export function defineModel(name: string): ModelBuilder {
  return new ModelBuilder(name);
}

export function defineCollection(name: string): CollectionBuilder {
  return new CollectionBuilder(name);
}

/**
 * Match pattern helpers
 */
export const match = {
  property: (prop: string): MatchPattern => prop,
  
  jsonPath: (path: string): MatchPattern => `$${path}` as const,
  
  or: (...patterns: MatchPattern[]): MatchPattern => ({
    or: patterns
  }),
  
  and: (...patterns: MatchPattern[]): MatchPattern => ({
    and: patterns
  })
};