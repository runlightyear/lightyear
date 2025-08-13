import type { JSONSchema7 } from "json-schema";
import type { Collection, Model, MatchPattern } from "../types";
import { registerCollection, registerModel } from "../registry";
import type { ExtractSchemaType, ModelWithSchema, CollectionWithSchema } from "./schemaTypes";
import type { JSONSchema } from "json-schema-to-ts";

export class ModelBuilder<TSchema extends JSONSchema> {
  private name: string;
  private title?: string;
  private schema: TSchema;
  private matchPattern?: MatchPattern;

  constructor(name: string, schema: TSchema) {
    this.name = name;
    this.schema = schema;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withMatchPattern(pattern: MatchPattern): this {
    this.matchPattern = pattern;
    return this;
  }

  build(): ModelWithSchema<TSchema> {
    const model: ModelWithSchema<TSchema> = {
      name: this.name,
      title: this.title,
      schema: this.schema,
      matchPattern: this.matchPattern,
    };

    registerModel(model as any, {
      builderType: "ModelBuilder",
      createdBy: "defineModel",
    });

    return model;
  }
}

/**
 * Collection Builder - fluent API for creating collections with type safety
 */
export class CollectionBuilder<TModels extends Record<string, ModelWithSchema<any>> = {}> {
  private name: string;
  private title?: string;
  private models: TModels;
  private modelsArray: Model[] = [];

  constructor(name: string) {
    this.name = name;
    this.models = {} as TModels;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  // Legacy method for backward compatibility
  withModel(model: Model): this {
    this.modelsArray.push(model);
    (this.models as any)[model.name] = model;
    return this;
  }

  // Legacy method for backward compatibility
  withModels(models: Model[]): this {
    models.forEach(model => this.withModel(model));
    return this;
  }

  // Type-safe method with schema
  addModel<TName extends string, TSchema extends JSONSchema>(
    name: TName,
    schema: TSchema,
    configure?: (builder: ModelBuilder<TSchema>) => ModelBuilder<TSchema>
  ): CollectionBuilder<TModels & Record<TName, ModelWithSchema<TSchema>>> {
    const builder = new ModelBuilder(name, schema);
    const configuredBuilder = configure ? configure(builder) : builder;
    const model = configuredBuilder.build();
    
    (this.models as any)[name] = model;
    this.modelsArray.push(model as any);
    
    return this as any;
  }

  // Legacy method for backward compatibility
  addModelLegacy(
    name: string,
    options?: {
      title?: string;
      schema?: JSONSchema7;
      matchPattern?: MatchPattern;
    }
  ): this {
    const model: Model = {
      name,
      title: options?.title,
      schema: options?.schema,
      matchPattern: options?.matchPattern,
    };

    registerModel(model, {
      builderType: "CollectionBuilder",
      createdBy: "addModel",
      parentCollection: this.name,
    });

    this.modelsArray.push(model);
    (this.models as any)[name] = model;
    return this;
  }

  deploy(): CollectionWithSchema<TModels> & {
    types: { [K in keyof TModels]: ExtractSchemaType<TModels[K]["schema"]> };
  } {
    const collection = {
      name: this.name,
      title: this.title,
      models: this.models,
    };

    // Register with array format for compatibility
    registerCollection({ 
      name: this.name, 
      title: this.title, 
      models: this.modelsArray
    }, {
      builderType: "CollectionBuilder",
      createdBy: "defineCollection",
      modelCount: this.modelsArray.length,
    });

    const types = {} as any;
    for (const [key, model] of Object.entries(this.models)) {
      types[key] = undefined;
    }

    return {
      ...collection,
      types,
    };
  }

  // Backward compatibility method
  deployLegacy(): Collection {
    const collection: Collection = {
      name: this.name,
      title: this.title,
      models: this.modelsArray,
    };

    registerCollection(collection, {
      builderType: "CollectionBuilder",
      createdBy: "defineCollection",
      modelCount: this.modelsArray.length,
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

export function defineModel<TSchema extends JSONSchema>(
  name: string,
  schema: TSchema
): ModelBuilder<TSchema> {
  return new ModelBuilder(name, schema);
}
