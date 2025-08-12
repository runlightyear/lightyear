import type { FromSchema, JSONSchema } from "json-schema-to-ts";

export type ExtractSchemaType<T> = T extends JSONSchema ? FromSchema<T> : any;

export type ModelWithSchema<TSchema> = {
  name: string;
  title?: string;
  schema: TSchema;
  matchPattern?: any;
  _schemaType?: ExtractSchemaType<TSchema>;
};

export type CollectionWithSchema<TModels extends Record<string, ModelWithSchema<any>>> = {
  name: string;
  title?: string;
  models: TModels;
};

export type ExtractModelTypes<T> = T extends CollectionWithSchema<infer TModels> ? {
  [K in keyof TModels]: TModels[K] extends { schema: infer S } ? 
    S extends JSONSchema ? FromSchema<S> : any
  : never;
} : never;