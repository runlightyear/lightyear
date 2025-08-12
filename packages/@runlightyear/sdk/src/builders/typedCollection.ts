import type { MatchPattern } from "../types";
import { registerCollection, registerModel } from "../registry";
import type { ExtractSchemaType, ModelWithSchema, CollectionWithSchema } from "./schemaTypes";
import type { JSONSchema } from "json-schema-to-ts";

export class TypedModelBuilder<TSchema extends JSONSchema> {
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
      builderType: "TypedModelBuilder",
      createdBy: "defineTypedModel",
    });

    return model;
  }
}

export class TypedCollectionBuilder<TModels extends Record<string, ModelWithSchema<any>> = {}> {
  private name: string;
  private title?: string;
  private models: TModels;

  constructor(name: string) {
    this.name = name;
    this.models = {} as TModels;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  addModel<TName extends string, TSchema extends JSONSchema>(
    name: TName,
    schema: TSchema,
    configure?: (builder: TypedModelBuilder<TSchema>) => TypedModelBuilder<TSchema>
  ): TypedCollectionBuilder<TModels & Record<TName, ModelWithSchema<TSchema>>> {
    const builder = new TypedModelBuilder(name, schema);
    const configuredBuilder = configure ? configure(builder) : builder;
    const model = configuredBuilder.build();
    
    (this.models as any)[name] = model;
    
    return this as any;
  }

  deploy(): CollectionWithSchema<TModels> & {
    types: { [K in keyof TModels]: ExtractSchemaType<TModels[K]["schema"]> };
  } {
    const modelArray = Object.values(this.models);
    
    const collection = {
      name: this.name,
      title: this.title,
      models: this.models,
    };

    registerCollection({ 
      name: this.name, 
      title: this.title, 
      models: modelArray as any[] 
    }, {
      builderType: "TypedCollectionBuilder",
      createdBy: "defineTypedCollection",
      modelCount: modelArray.length,
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
}

export function defineTypedCollection(name: string): TypedCollectionBuilder {
  return new TypedCollectionBuilder(name);
}

export function defineTypedModel<TSchema extends JSONSchema>(
  name: string,
  schema: TSchema
): TypedModelBuilder<TSchema> {
  return new TypedModelBuilder(name, schema);
}