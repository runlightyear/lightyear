import type { JSONSchema7 } from "json-schema";
import type { Collection, Model, MatchPattern } from "../types";
import { registerCollection, registerModel } from "../registry";

// Type to accept both JSONSchema7 and const schemas
type Schema = JSONSchema7 | Readonly<any>;

/**
 * Collection Builder - fluent API for creating collections
 */
export class CollectionBuilder<TModels extends readonly Model<any, any>[] = readonly []> {
  private name: string;
  private title?: string;
  private models: Model<any, any>[] = [];

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  withName(name: string): CollectionBuilder<TModels> {
    this.name = name;
    return this as any;
  }

  withTitle(title: string): CollectionBuilder<TModels> {
    this.title = title;
    return this as any;
  }

  withModel<M extends Model<any, any>>(
    model: M
  ): CollectionBuilder<readonly [...TModels, M]> {
    this.models.push(model);
    return this as any;
  }

  withModels<M extends readonly Model<any, any>[]>(
    models: M
  ): CollectionBuilder<readonly [...TModels, ...M]> {
    this.models.push(...models);
    return this as any;
  }

  addModel<N extends string, S extends Schema = any>(
    name: N,
    options?: {
      title?: string;
      schema?: S;
      matchPattern?: MatchPattern;
    }
  ): CollectionBuilder<readonly [...TModels, Model<S, N>]> {
    const model: Model<S, N> = {
      name,
      title: options?.title,
      schema: options?.schema,
      matchPattern: options?.matchPattern,
    } as Model<S, N>;

    // Register the model in the registry
    registerModel(model as Model<any, any>, {
      builderType: "CollectionBuilder",
      createdBy: "addModel",
      parentCollection: this.name,
    });

    this.models.push(model as Model<any, any>);
    return this as any;
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

    // Return with type assertion to preserve model types
    return collection as Collection & {
      models: TModels extends readonly [...infer M] ? M : Model<any, any>[];
    };
  }
}

/**
 * Factory function for creating a collection builder
 */
export function defineCollection(name: string): CollectionBuilder {
  return new CollectionBuilder(name);
}
