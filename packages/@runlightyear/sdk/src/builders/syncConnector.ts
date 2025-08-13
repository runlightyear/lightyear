import { z } from "zod";
import type { Collection, Model } from "../types";
import type { RestConnector } from "../connectors/RestConnector";
import type { HttpProxyResponse } from "../http";

export interface PaginationConfig {
  type: "cursor" | "page" | "offset";
  pageSize?: number;
  cursorField?: string;
  pageField?: string;
  offsetField?: string;
  limitField?: string;
}

export interface ListParams {
  cursor?: string;
  page?: number;
  offset?: number;
  limit?: number;
  [key: string]: any;
}

export interface ListConfig<T = any, R = any> {
  request: (params: ListParams) => {
    endpoint: string;
    method?: "GET" | "POST";
    params?: Record<string, any>;
    data?: any;
  };
  responseSchema?: z.ZodType<R>;
  pagination?: PaginationConfig;
  transform?: (response: R) => T[];
}

export interface CreateConfig<T = any> {
  request: {
    endpoint: string;
    method?: "POST" | "PUT";
  };
  transform?: (response: any) => T;
  transformRequest?: (data: T) => any;
}

export interface UpdateConfig<T = any> {
  request: {
    endpoint: string | ((id: string) => string);
    method?: "PUT" | "PATCH" | "POST";
  };
  transform?: (response: any) => T;
  transformRequest?: (data: Partial<T>) => any;
}

export interface DeleteConfig {
  request: {
    endpoint: string | ((id: string) => string);
    method?: "DELETE" | "POST";
  };
}

export interface BulkConfig {
  create?: {
    request: {
      endpoint: string;
      method?: "POST" | "PUT";
    };
    batchSize?: number;
  };
  update?: {
    request: {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
    };
    batchSize?: number;
  };
  delete?: {
    request: {
      endpoint: string;
      method?: "DELETE" | "POST";
    };
    batchSize?: number;
  };
}

export interface ModelConnectorConfig<T = any> {
  list?: ListConfig<T, any>;
  create?: CreateConfig<T>;
  update?: UpdateConfig<T>;
  delete?: DeleteConfig;
  bulk?: BulkConfig;
}

// Type-safe config builder interfaces
export interface TypedListConfig<TModel, TResponse> {
  request: (params: ListParams) => {
    endpoint: string;
    method?: "GET" | "POST";
    params?: Record<string, any>;
    data?: any;
  };
  responseSchema?: z.ZodType<TResponse>;
  pagination?: PaginationConfig;
  transform?: (response: TResponse) => TModel[];
}

export interface TypedModelConnectorConfig<TModel> {
  list?: TypedListConfig<TModel, any>;
  create?: CreateConfig<TModel>;
  update?: UpdateConfig<TModel>;
  delete?: DeleteConfig;
  bulk?: BulkConfig;
}

// Helper type to infer response type from schema
type InferResponseType<S> = S extends z.ZodType<infer R> ? R : any;

// Type-safe list config that infers response type from schema
export interface TypeSafeListConfig<TModel, TResponseSchema extends z.ZodType<any> | undefined = undefined> {
  request: (params: ListParams) => {
    endpoint: string;
    method?: "GET" | "POST";
    params?: Record<string, any>;
    data?: any;
  };
  responseSchema?: TResponseSchema;
  pagination?: PaginationConfig;
  transform?: TResponseSchema extends z.ZodType<any> 
    ? (response: InferResponseType<TResponseSchema>) => TModel[]
    : (response: any) => TModel[];
}

export interface ModelConnector<T = any> {
  modelName: string;
  config: ModelConnectorConfig<T>;
  list?: (params?: any) => Promise<{ items: T[]; nextCursor?: string }>;
  create?: (data: T) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<void>;
  bulkCreate?: (items: T[]) => Promise<T[]>;
  bulkUpdate?: (items: Array<{ id: string; data: Partial<T> }>) => Promise<T[]>;
  bulkDelete?: (ids: string[]) => Promise<void>;
}

type ExtractModels<T> = T extends Collection ? T["models"][number]["name"] : never;

type InferModelType<C extends Collection, M extends string> = 
  C["models"] extends ReadonlyArray<infer Model>
    ? Model extends { name: M; schema: infer S }
      ? S extends z.ZodType<infer T>
        ? T
        : any
      : any
    : any;

export class SyncConnectorBuilder<
  TRestConnector extends RestConnector = RestConnector,
  TCollection extends Collection = Collection
> {
  private restConnector: TRestConnector;
  private collection: TCollection;
  private modelConnectors: Map<string, ModelConnector> = new Map();

  constructor(restConnector: TRestConnector, collection: TCollection) {
    this.restConnector = restConnector;
    this.collection = collection;
  }

  with<M extends ExtractModels<TCollection>>(
    modelName: M,
    config: ModelConnectorConfig<InferModelType<TCollection, M>>
  ): this {
    const model = this.collection.models.find(m => m.name === modelName);
    
    if (!model) {
      throw new Error(
        `Model "${modelName}" does not exist in collection "${this.collection.name}". ` +
        `Available models: ${this.collection.models.map(m => m.name).join(", ")}`
      );
    }

    const connector: ModelConnector = {
      modelName,
      config,
    };

    if (config.list) {
      connector.list = async (params?: ListParams) => {
        // Get request configuration from the function
        const requestConfig = config.list!.request(params || {});
        
        const response = await this.restConnector.request({
          method: requestConfig.method || "GET",
          url: requestConfig.endpoint,
          params: requestConfig.params,
          data: requestConfig.data,
        });

        let data = response.data;
        let items: any[] = [];

        if (config.list!.responseSchema) {
          data = config.list!.responseSchema.parse(data);
        }

        // Apply transform if provided
        if (config.list!.transform) {
          items = config.list!.transform(data);
        } else {
          // Default behavior: if data is an array, use it; otherwise wrap in array
          items = Array.isArray(data) ? data : [data];
        }

        // Extract pagination info based on pagination config
        let nextCursor: string | undefined;
        if (config.list!.pagination?.type === "cursor" && config.list!.pagination.cursorField) {
          nextCursor = data[config.list!.pagination.cursorField];
        }

        return {
          items,
          nextCursor,
        };
      };
    }

    if (config.create) {
      connector.create = async (data: any) => {
        const requestData = config.create!.transformRequest 
          ? config.create!.transformRequest(data)
          : data;

        const response = await this.restConnector.request({
          method: config.create!.request.method || "POST",
          url: config.create!.request.endpoint,
          data: requestData,
        });

        return config.create!.transform 
          ? config.create!.transform(response.data)
          : response.data;
      };
    }

    if (config.update) {
      connector.update = async (id: string, data: any) => {
        const endpoint = typeof config.update!.request.endpoint === "function"
          ? config.update!.request.endpoint(id)
          : config.update!.request.endpoint.replace("{id}", id);
        
        const requestData = config.update!.transformRequest 
          ? config.update!.transformRequest(data)
          : data;
          
        const response = await this.restConnector.request({
          method: config.update!.request.method || "PUT",
          url: endpoint,
          data: requestData,
        });
        
        return config.update!.transform 
          ? config.update!.transform(response.data)
          : response.data;
      };
    }

    if (config.delete) {
      connector.delete = async (id: string) => {
        const endpoint = typeof config.delete!.request.endpoint === "function"
          ? config.delete!.request.endpoint(id)
          : config.delete!.request.endpoint.replace("{id}", id);
          
        await this.restConnector.request({
          method: config.delete!.request.method || "DELETE",
          url: endpoint,
        });
      };
    }

    if (config.bulk?.create) {
      connector.bulkCreate = async (items: any[]) => {
        const batchSize = config.bulk!.create!.batchSize || 100;
        const results: any[] = [];
        
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const response = await this.restConnector.request({
            method: config.bulk!.create!.request.method || "POST",
            url: config.bulk!.create!.request.endpoint,
            data: batch,
          });
          results.push(...(Array.isArray(response.data) ? response.data : [response.data]));
        }
        
        return results;
      };
    }

    if (config.bulk?.update) {
      connector.bulkUpdate = async (items: Array<{ id: string; data: any }>) => {
        const batchSize = config.bulk!.update!.batchSize || 100;
        const results: any[] = [];
        
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const response = await this.restConnector.request({
            method: config.bulk!.update!.request.method || "PUT",
            url: config.bulk!.update!.request.endpoint,
            data: batch,
          });
          results.push(...(Array.isArray(response.data) ? response.data : [response.data]));
        }
        
        return results;
      };
    }

    if (config.bulk?.delete) {
      connector.bulkDelete = async (ids: string[]) => {
        const batchSize = config.bulk!.delete!.batchSize || 100;
        
        for (let i = 0; i < ids.length; i += batchSize) {
          const batch = ids.slice(i, i + batchSize);
          await this.restConnector.request({
            method: config.bulk!.delete!.request.method || "DELETE",
            url: config.bulk!.delete!.request.endpoint,
            data: batch,
          });
        }
      };
    }

    this.modelConnectors.set(modelName, connector);
    return this;
  }

  add<M extends ExtractModels<TCollection>>(
    modelName: M,
    configBuilder: (builder: ModelConnectorConfigBuilder<InferModelType<TCollection, M>>) => ModelConnectorConfigBuilder<InferModelType<TCollection, M>>
  ): this {
    const model = this.collection.models.find(m => m.name === modelName);
    
    if (!model) {
      throw new Error(
        `Model "${modelName}" does not exist in collection "${this.collection.name}". ` +
        `Available models: ${this.collection.models.map(m => m.name).join(", ")}`
      );
    }

    const builder = new ModelConnectorConfigBuilder<InferModelType<TCollection, M>>();
    const configuredBuilder = configBuilder(builder);
    const config = configuredBuilder.build();

    return this.with(modelName, config);
  }

  getModelConnector<M extends ExtractModels<TCollection>>(
    modelName: M
  ): ModelConnector<InferModelType<TCollection, M>> | undefined {
    return this.modelConnectors.get(modelName) as ModelConnector<InferModelType<TCollection, M>> | undefined;
  }

  build(): SyncConnector<TRestConnector, TCollection> {
    return new SyncConnector(this.restConnector, this.collection, this.modelConnectors);
  }
}

export class ModelConnectorConfigBuilder<T = any> {
  private config: ModelConnectorConfig<T> = {};

  list<TSchema extends z.ZodType<any>>(config: {
    request: (params: ListParams) => {
      endpoint: string;
      method?: "GET" | "POST";
      params?: Record<string, any>;
      data?: any;
    };
    responseSchema: TSchema;
    pagination?: PaginationConfig;
    transform: (response: z.infer<TSchema>) => T[];
  }): this {
    this.config.list = config as any;
    return this;
  }

  create(config: CreateConfig<T>): this {
    this.config.create = config;
    return this;
  }

  update(config: UpdateConfig<T>): this {
    this.config.update = config;
    return this;
  }

  delete(config: DeleteConfig): this {
    this.config.delete = config;
    return this;
  }

  bulk(config: BulkConfig): this {
    this.config.bulk = config;
    return this;
  }

  build(): ModelConnectorConfig<T> {
    return this.config;
  }
}

export class SyncConnector<
  TRestConnector extends RestConnector = RestConnector,
  TCollection extends Collection = Collection
> {
  private restConnector: TRestConnector;
  private collection: TCollection;
  private modelConnectors: Map<string, ModelConnector>;

  constructor(
    restConnector: TRestConnector,
    collection: TCollection,
    modelConnectors: Map<string, ModelConnector>
  ) {
    this.restConnector = restConnector;
    this.collection = collection;
    this.modelConnectors = modelConnectors;
  }

  getRestConnector(): TRestConnector {
    return this.restConnector;
  }

  getCollection(): TCollection {
    return this.collection;
  }

  getModelConnector<M extends ExtractModels<TCollection>>(
    modelName: M
  ): ModelConnector<InferModelType<TCollection, M>> | undefined {
    return this.modelConnectors.get(modelName) as ModelConnector<InferModelType<TCollection, M>> | undefined;
  }

  async sync(): Promise<void> {
    for (const [modelName, connector] of this.modelConnectors) {
      if (connector.list) {
        const { items } = await connector.list();
        console.log(`Synced ${items.length} items for model ${modelName}`);
      }
    }
  }
}

export function createSyncConnector<
  TRestConnector extends RestConnector,
  TCollection extends Collection
>(
  restConnector: TRestConnector,
  collection: TCollection
): SyncConnectorBuilder<TRestConnector, TCollection> {
  return new SyncConnectorBuilder(restConnector, collection);
}

// Type-safe config factory for better inference
export function createListConfig<TModel, TResponse>(
  config: {
    request: (params: ListParams) => {
      endpoint: string;
      method?: "GET" | "POST";
      params?: Record<string, any>;
      data?: any;
    };
    responseSchema: z.ZodType<TResponse>;
    pagination?: PaginationConfig;
    transform: (response: TResponse) => TModel[];
  }
): ListConfig<TModel, TResponse> {
  return config;
}