import type { JSONSchema7 } from "json-schema";
import type { z } from "zod";
import type { Collection, Model, MatchPattern } from "../types";
import { registerCollection, registerModel } from "../registry";

// Type to accept JSONSchema7, const schemas, and Zod schemas
type Schema = JSONSchema7 | Readonly<any> | z.ZodType<any>;

// Helper type to convert TModels array to a name->model mapping
type ModelsToMap<TModels> = TModels extends readonly Model<any, any>[]
  ? { [M in TModels[number] as M["name"]]: M }
  : {};

// Helper types to produce a name -> model data mapping for stronger inference
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type ModelNameToDataMap<TModels> = UnionToIntersection<
  TModels extends readonly any[]
    ? TModels[number] extends Model<infer S, infer N extends string>
      ? { [K in N]: import("../types").InferModelData<Model<S, N>> }
      : {}
    : {}
>;

// Type for the getModel method with proper overloads
interface TypedCollectionMethods<TModels> {
  getModel<K extends keyof ModelsToMap<TModels> & string>(
    name: K
  ): ModelsToMap<TModels>[K] | undefined;
  getModel(name: string): Model<any, any> | undefined;
}

/**
 * Collection Builder - fluent API for creating collections
 */
export class CollectionBuilder<
  TModels extends readonly Model<any, any>[] = readonly [],
  TSchemas extends Record<string, any> = {}
> {
  private name: string;
  private title?: string;
  private models: Model<any, any>[] = [];

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  withName(name: string): CollectionBuilder<TModels, TSchemas> {
    this.name = name;
    return this as any;
  }

  withTitle(title: string): CollectionBuilder<TModels, TSchemas> {
    this.title = title;
    return this as any;
  }

  withModel<M extends Model<any, any>>(
    model: M
  ): CollectionBuilder<readonly [...TModels, M], TSchemas> {
    this.models.push(model);
    return this as any;
  }

  withModels<M extends readonly Model<any, any>[]>(
    models: M
  ): CollectionBuilder<readonly [...TModels, ...M], TSchemas> {
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
  ): CollectionBuilder<readonly [...TModels, Model<S, N>], TSchemas & { [K in N]: S }> {
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

  deploy(): Collection &
    TypedCollectionMethods<TModels> &
    { __schemas?: TSchemas; __models?: TModels; __modelData?: ModelNameToDataMap<TModels> } {
    // Build model map for efficient lookup
    const modelMap = new Map<string, Model<any, any>>();
    for (const model of this.models) {
      modelMap.set(model.name, model);
    }

    // Create collection with getModel method
    const collection: Collection = {
      name: this.name,
      title: this.title,
      models: this.models,
      getModel: (name: string) => modelMap.get(name),
    };

    // Register the collection in the global registry
    registerCollection(collection, {
      builderType: "CollectionBuilder",
      createdBy: "defineCollection",
      modelCount: this.models.length,
    });

    // Return with type assertion to preserve schema and model generic types for inference via phantom properties
    return collection as Collection &
      TypedCollectionMethods<TModels> &
      { __schemas?: TSchemas; __models?: TModels; __modelData?: ModelNameToDataMap<TModels> };
  }
}

/**
 * Factory function for creating a collection builder
 */
export function defineCollection(name: string): CollectionBuilder {
  return new CollectionBuilder(name);
}
