import type { Collection, Model } from "../types";

/**
 * Type-safe collection wrapper that provides getModel with proper type inference
 */
export class TypedCollectionWrapper<TModelMap extends Record<string, Model<any, any>>> {
  private modelMap: TModelMap;
  
  constructor(public readonly collection: Collection) {
    // Build a map of models by name
    this.modelMap = {} as TModelMap;
    for (const model of collection.models) {
      (this.modelMap as any)[model.name] = model;
    }
  }
  
  /**
   * Get a model by name with full type preservation
   */
  getModel<K extends keyof TModelMap & string>(name: K): TModelMap[K] {
    return this.modelMap[name];
  }
  
  /**
   * Check if a model exists
   */
  hasModel(name: string): boolean {
    return name in this.modelMap;
  }
  
  /**
   * Get all model names
   */
  getModelNames(): (keyof TModelMap & string)[] {
    return Object.keys(this.modelMap) as (keyof TModelMap & string)[];
  }
}

/**
 * Create a typed collection wrapper from a models object
 * 
 * @example
 * ```typescript
 * const models = {
 *   user: {
 *     name: "user" as const,
 *     schema: {
 *       type: "object",
 *       properties: {
 *         id: { type: "string" },
 *         name: { type: "string" }
 *       },
 *       required: ["id", "name"]
 *     } as const
 *   }
 * };
 * 
 * const collection = createTypedCollectionWrapper("myCollection", models);
 * const userModel = collection.getModel("user"); // Fully typed!
 * type User = InferModelData<typeof userModel>; // Works!
 * ```
 */
export function createTypedCollectionWrapper<
  TModels extends Record<string, { 
    name?: string;
    schema?: any;
    title?: string;
    matchPattern?: any;
  }>
>(
  name: string, 
  models: TModels,
  options?: { title?: string }
): TypedCollectionWrapper<{
  [K in keyof TModels]: Model<
    TModels[K]["schema"],
    K extends string ? K : string
  >
}> {
  // Convert models object to array
  const modelArray: Model<any, any>[] = Object.entries(models).map(([key, config]) => ({
    name: config.name || key,
    schema: config.schema,
    title: config.title,
    matchPattern: config.matchPattern,
  }));
  
  const collection: Collection = {
    name,
    title: options?.title,
    models: modelArray,
  };
  
  return new TypedCollectionWrapper(collection) as any;
}