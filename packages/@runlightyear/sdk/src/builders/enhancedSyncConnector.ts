import { z } from "zod";
import type { JSONSchema } from "json-schema-to-ts";
import type { CollectionWithSchema, ExtractModelTypes, ModelWithSchema } from "./schemaTypes";
import { RestConnector } from "../connectors/RestConnector";
import { validateWithSchema } from "./schemaValidation";

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage?: number;
    totalPages?: number;
    totalCount?: number;
    hasNext?: boolean;
    nextCursor?: string;
  };
}

// Sync operation types
export type SyncOperation = "create" | "update" | "delete";

export interface SyncChange<T> {
  operation: SyncOperation;
  data: T;
  previousData?: T;
  id: string;
}

// Model connector configuration
export interface ModelConnectorConfig<TListSchema extends z.ZodTypeAny, TModel> {
  // List endpoint configuration
  list: {
    endpoint: string | ((params: PaginationParams) => string);
    method?: "GET" | "POST";
    params?: Record<string, any> | ((pagination: PaginationParams) => Record<string, any>);
    headers?: Record<string, string>;
    responseSchema: TListSchema; // Zod schema for API response
    transform: (item: z.infer<TListSchema>) => TModel; // Type-safe transformation
    pagination?: {
      type: "page" | "cursor" | "offset";
      pageSize?: number;
      getNextPage?: (response: any) => PaginationParams | null;
    };
  };
  
  // Create endpoint configuration
  create?: {
    endpoint: string | ((data: TModel) => string);
    method?: "POST" | "PUT";
    transform: (model: TModel) => any; // Transform model to API format
    responseTransform?: (response: any) => Partial<TModel>;
  };
  
  // Update endpoint configuration
  update?: {
    endpoint: string | ((id: string, data: TModel) => string);
    method?: "PUT" | "PATCH" | "POST";
    transform: (model: TModel, previousModel?: TModel) => any;
    responseTransform?: (response: any) => Partial<TModel>;
  };
  
  // Delete endpoint configuration
  delete?: {
    endpoint: string | ((id: string) => string);
    method?: "DELETE" | "POST";
    params?: Record<string, any> | ((model: TModel) => Record<string, any>);
  };
  
  // ID field configuration
  idField?: keyof TModel | ((model: TModel) => string);
}

// Enhanced sync connector builder
export class EnhancedSyncConnectorBuilder<TCollection extends CollectionWithSchema<any> = never> {
  private name: string;
  private baseUrl?: string;
  private headers: Record<string, string> = {};
  private collection?: TCollection;
  private modelConnectors: Map<string, ModelConnectorConfig<any, any>> = new Map();
  private restConnector?: RestConnector;

  constructor(name: string) {
    this.name = name;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  withBaseUrl(baseUrl: string): this {
    this.baseUrl = baseUrl;
    return this;
  }

  withHeaders(headers: Record<string, string>): this {
    this.headers = { ...headers };
    return this;
  }

  addHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  withCollection<T extends CollectionWithSchema<any>>(
    collection: T
  ): EnhancedSyncConnectorBuilder<T> {
    (this as any).collection = collection;
    return this as any;
  }

  defineModelConnector<
    TModelName extends keyof ExtractModelTypes<TCollection>,
    TListSchema extends z.ZodTypeAny
  >(
    modelName: TModelName,
    config: ModelConnectorConfig<TListSchema, ExtractModelTypes<TCollection>[TModelName]>
  ): this {
    if (!this.collection) {
      throw new Error("Collection must be set before defining model connectors");
    }

    const model = (this.collection as any).models[modelName];
    if (!model) {
      throw new Error(`Model '${String(modelName)}' not found in collection`);
    }

    // Validate that transform function returns the correct type
    this.modelConnectors.set(String(modelName), config);
    return this;
  }

  deploy(): EnhancedSyncConnector<TCollection> {
    if (!this.baseUrl) {
      throw new Error("Base URL is required for sync connector");
    }

    if (!this.collection) {
      throw new Error("Collection is required for sync connector");
    }

    this.restConnector = new RestConnector({
      baseUrl: this.baseUrl,
      headers: this.headers,
    });

    return new EnhancedSyncConnector(
      this.name,
      this.collection,
      this.modelConnectors,
      this.restConnector
    );
  }
}

// Enhanced sync connector implementation
export class EnhancedSyncConnector<TCollection extends CollectionWithSchema<any>> {
  constructor(
    private name: string,
    private collection: TCollection,
    private modelConnectors: Map<string, ModelConnectorConfig<any, any>>,
    private restConnector: RestConnector
  ) {}

  // List all items with pagination
  async list<TModelName extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModelName,
    options?: {
      pagination?: PaginationParams;
      maxPages?: number;
    }
  ): Promise<{
    data: ExtractModelTypes<TCollection>[TModelName][];
    errors: Array<{ index: number; errors: any }>;
    totalCount?: number;
  }> {
    const config = this.modelConnectors.get(String(modelName));
    if (!config) {
      throw new Error(`No model connector defined for '${String(modelName)}'`);
    }

    const model = (this.collection as any).models[modelName];
    const allData: ExtractModelTypes<TCollection>[TModelName][] = [];
    const allErrors: Array<{ index: number; errors: any }> = [];
    let currentPage = 0;
    let paginationParams: PaginationParams = options?.pagination || {};
    let totalCount: number | undefined;

    while (true) {
      // Build endpoint
      const endpoint = typeof config.list.endpoint === "function"
        ? config.list.endpoint(paginationParams)
        : config.list.endpoint;

      // Build params
      const params = typeof config.list.params === "function"
        ? config.list.params(paginationParams)
        : config.list.params;

      // Make request
      const response = await this.restConnector.request({
        url: endpoint,
        method: config.list.method || "GET",
        params,
        headers: config.list.headers,
      });

      // Validate response with Zod schema
      const listValidation = config.list.responseSchema.safeParse(response.data);
      if (!listValidation.success) {
        throw new Error(`Invalid API response: ${listValidation.error.message}`);
      }

      // Extract data array from response
      const responseData = Array.isArray(listValidation.data)
        ? listValidation.data
        : listValidation.data.data || listValidation.data.items || [];

      // Transform and validate each item
      responseData.forEach((item: any, index: number) => {
        try {
          // Transform using type-safe transformation
          const transformed = config.list.transform(item);
          
          // Validate against model schema
          const validation = validateWithSchema<ExtractModelTypes<TCollection>[TModelName]>(
            transformed,
            model.schema
          );

          if (validation.success && validation.data) {
            allData.push(validation.data);
          } else {
            allErrors.push({
              index: allData.length + index,
              errors: validation.errors,
            });
          }
        } catch (error) {
          allErrors.push({
            index: allData.length + index,
            errors: [{ message: error instanceof Error ? error.message : "Transform error" }],
          });
        }
      });

      // Update total count if available
      if (!totalCount && response.data.total) {
        totalCount = response.data.total;
      }

      // Check for next page
      currentPage++;
      if (options?.maxPages && currentPage >= options.maxPages) {
        break;
      }

      if (config.list.pagination?.getNextPage) {
        const nextParams = config.list.pagination.getNextPage(response.data);
        if (!nextParams) break;
        paginationParams = nextParams;
      } else {
        // Default pagination
        if (config.list.pagination?.type === "page") {
          paginationParams.page = (paginationParams.page || 1) + 1;
          if (response.data.hasMore === false || responseData.length === 0) break;
        } else if (config.list.pagination?.type === "cursor" && response.data.nextCursor) {
          paginationParams.cursor = response.data.nextCursor;
        } else {
          break; // No pagination or single page
        }
      }
    }

    return { data: allData, errors: allErrors, totalCount };
  }

  // Create a new item
  async create<TModelName extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModelName,
    data: ExtractModelTypes<TCollection>[TModelName]
  ): Promise<ExtractModelTypes<TCollection>[TModelName]> {
    const config = this.modelConnectors.get(String(modelName));
    if (!config || !config.create) {
      throw new Error(`Create operation not defined for model '${String(modelName)}'`);
    }

    const endpoint = typeof config.create.endpoint === "function"
      ? config.create.endpoint(data)
      : config.create.endpoint;

    const body = config.create.transform(data);

    const response = await this.restConnector.request({
      url: endpoint,
      method: config.create.method || "POST",
      data: body,
    });

    if (config.create.responseTransform) {
      const updates = config.create.responseTransform(response.data);
      return { ...data, ...updates };
    }

    return data;
  }

  // Update an existing item
  async update<TModelName extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModelName,
    data: ExtractModelTypes<TCollection>[TModelName],
    previousData?: ExtractModelTypes<TCollection>[TModelName]
  ): Promise<ExtractModelTypes<TCollection>[TModelName]> {
    const config = this.modelConnectors.get(String(modelName));
    if (!config || !config.update) {
      throw new Error(`Update operation not defined for model '${String(modelName)}'`);
    }

    const id = this.extractId(modelName, data);
    const endpoint = typeof config.update.endpoint === "function"
      ? config.update.endpoint(id, data)
      : config.update.endpoint;

    const body = config.update.transform(data, previousData);

    const response = await this.restConnector.request({
      url: endpoint,
      method: config.update.method || "PUT",
      data: body,
    });

    if (config.update.responseTransform) {
      const updates = config.update.responseTransform(response.data);
      return { ...data, ...updates };
    }

    return data;
  }

  // Delete an item
  async delete<TModelName extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModelName,
    data: ExtractModelTypes<TCollection>[TModelName]
  ): Promise<void> {
    const config = this.modelConnectors.get(String(modelName));
    if (!config || !config.delete) {
      throw new Error(`Delete operation not defined for model '${String(modelName)}'`);
    }

    const id = this.extractId(modelName, data);
    const endpoint = typeof config.delete.endpoint === "function"
      ? config.delete.endpoint(id)
      : config.delete.endpoint;

    const params = typeof config.delete.params === "function"
      ? config.delete.params(data)
      : config.delete.params;

    await this.restConnector.request({
      url: endpoint,
      method: config.delete.method || "DELETE",
      params,
    });
  }

  // Sync changes (create, update, delete)
  async syncChanges<TModelName extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModelName,
    changes: SyncChange<ExtractModelTypes<TCollection>[TModelName]>[]
  ): Promise<{
    successful: number;
    failed: Array<{ change: SyncChange<any>; error: Error }>;
  }> {
    let successful = 0;
    const failed: Array<{ change: SyncChange<any>; error: Error }> = [];

    for (const change of changes) {
      try {
        switch (change.operation) {
          case "create":
            await this.create(modelName, change.data);
            break;
          case "update":
            await this.update(modelName, change.data, change.previousData);
            break;
          case "delete":
            await this.delete(modelName, change.data);
            break;
        }
        successful++;
      } catch (error) {
        failed.push({
          change,
          error: error instanceof Error ? error : new Error("Unknown error"),
        });
      }
    }

    return { successful, failed };
  }

  private extractId<TModelName extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModelName,
    data: ExtractModelTypes<TCollection>[TModelName]
  ): string {
    const config = this.modelConnectors.get(String(modelName));
    if (!config) {
      throw new Error(`No model connector defined for '${String(modelName)}'`);
    }

    if (typeof config.idField === "function") {
      return config.idField(data);
    } else if (config.idField) {
      return String(data[config.idField]);
    } else {
      return String((data as any).id);
    }
  }

  getCollection(): TCollection {
    return this.collection;
  }

  getName(): string {
    return this.name;
  }
}

export function defineEnhancedSyncConnector(name: string): EnhancedSyncConnectorBuilder {
  return new EnhancedSyncConnectorBuilder(name);
}