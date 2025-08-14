import type { JSONSchema7 } from "json-schema";
import type { Collection, Model, MatchPattern } from "../types";
import { defineCollection } from "./collection";

/**
 * Creates a typed collection with proper type inference support.
 * 
 * This is a workaround for TypeScript limitations with the builder pattern.
 * Use this when you need proper type inference with Infer<>.
 * 
 * @example
 * ```typescript
 * const myCollection = createTypedCollection("my-collection", {
 *   user: {
 *     schema: {
 *       type: "object",
 *       properties: {
 *         id: { type: "string" },
 *         name: { type: "string" }
 *       },
 *       required: ["id", "name"]
 *     } as const
 *   },
 *   post: {
 *     schema: {
 *       type: "object",
 *       properties: {
 *         id: { type: "string" },
 *         title: { type: "string" }
 *       },
 *       required: ["id", "title"]  
 *     } as const
 *   }
 * });
 * 
 * // Type inference now works!
 * type User = Infer<typeof myCollection, "user">;
 * type Post = Infer<typeof myCollection, "post">;
 * ```
 */
export function createTypedCollection<
  TModels extends Record<string, {
    title?: string;
    schema?: JSONSchema7 | Readonly<any>;
    matchPattern?: MatchPattern;
  }>
>(
  name: string,
  models: TModels,
  options?: {
    title?: string;
  }
): Collection & {
  models: {
    [K in keyof TModels]: Model<TModels[K]["schema"], K extends string ? K : string>
  }[keyof TModels][];
} {
  // Build the collection using the regular builder
  let builder = defineCollection(name);
  
  if (options?.title) {
    builder = builder.withTitle(options.title);
  }
  
  // Add each model
  for (const [modelName, modelConfig] of Object.entries(models)) {
    builder = builder.addModel(modelName, {
      title: modelConfig.title,
      schema: modelConfig.schema,
      matchPattern: modelConfig.matchPattern,
    });
  }
  
  // Deploy and return with proper typing
  const collection = builder.deploy();
  
  // Return with type assertion that preserves model types
  return collection as any;
}