import { z } from "zod";
import type { Collection } from "../types";
import type { RestConnector } from "../connectors/RestConnector";

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

export interface ListConfig<T = any, R = unknown> {
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
  request: (data: T) => {
    endpoint: string;
    method?: "POST" | "PUT";
    data?: any;
  };
  responseSchema?: z.ZodType<T>;
  extract?: (item: T) => {
    externalId: string;
    externalUpdatedAt: string | null;
  };
}

export interface UpdateConfig<T = any> {
  request: (
    id: string,
    data: Partial<T>
  ) => {
    endpoint: string;
    method?: "PUT" | "PATCH" | "POST";
    data?: any;
  };
  responseSchema?: z.ZodType<T>;
  extract?: (item: T) => {
    externalId: string;
    externalUpdatedAt: string | null;
  };
}

export interface DeleteConfig {
  request: (id: string) => {
    endpoint: string;
    method?: "DELETE" | "POST";
    data?: any;
  };
}

export interface BulkConfig<T = any> {
  create?: {
    request: (items: T[]) => {
      endpoint: string;
      method?: "POST" | "PUT";
      data?: any;
    };
    batchSize?: number;
  };
  update?: {
    request: (items: Array<{ id: string; data: Partial<T> }>) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      data?: any;
    };
    batchSize?: number;
  };
  delete?: {
    request: (ids: string[]) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      data?: any;
    };
    batchSize?: number;
  };
}

export interface ModelConnectorConfig<T = any> {
  list?: ListConfig<T, any>;
  create?: CreateConfig<T>;
  update?: UpdateConfig<T>;
  delete?: DeleteConfig;
  bulk?: BulkConfig<T>;
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
  bulk?: BulkConfig<TModel>;
}

// Helper type to infer response type from schema
type InferResponseType<S> = S extends z.ZodType<infer R> ? R : any;

// Type-safe list config that infers response type from schema
export interface TypeSafeListConfig<
  TModel,
  TResponseSchema extends z.ZodType<any> | undefined = undefined
> {
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
    : (response: unknown) => TModel[];
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

type ExtractModels<T> = T extends { __modelData?: infer Map }
  ? Extract<keyof Map, string>
  : T extends { models: ReadonlyArray<{ name: infer N }> }
  ? Extract<N, string>
  : string;

type InferModelType<C extends Collection, M extends string> = C extends {
  __modelData?: infer Map extends Record<string, any>;
}
  ? M extends keyof Map
    ? Map[M]
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

  /**
   * Copy-constructor: create a builder from an existing SyncConnectorBuilder or SyncConnector
   */
  static from<RC extends RestConnector, C extends Collection>(
    source: SyncConnectorBuilder<RC, C> | SyncConnector<RC, C>
  ): SyncConnectorBuilder<RC, C> {
    if (source instanceof SyncConnectorBuilder) {
      const builder = new SyncConnectorBuilder<RC, C>(
        (source as any).restConnector,
        (source as any).collection
      );
      const existing = (source as any).modelConnectors as Map<
        string,
        ModelConnector
      >;
      existing.forEach((connector, name) => {
        builder.add(name as any, (b: any) => {
          const cfg = (connector as any).config as ModelConnectorConfig<any>;
          const bb = new ModelConnectorConfigBuilder<any>();
          if (cfg.list) bb.list(cfg.list as any);
          if (cfg.create) bb.create(cfg.create);
          if (cfg.update) bb.update(cfg.update);
          if (cfg.delete) bb.delete(cfg.delete);
          if (cfg.bulk) bb.bulk(cfg.bulk);
          return bb;
        });
      });
      return builder;
    }

    const restConnector = (source as SyncConnector<RC, C>).getRestConnector();
    const collection = (source as SyncConnector<RC, C>).getCollection();
    const builder = new SyncConnectorBuilder<RC, C>(restConnector, collection);
    for (const model of collection.models) {
      const connector = (source as SyncConnector<RC, C>).getModelConnector(
        model.name as any
      ) as ModelConnector<any> | undefined;
      if (connector && (connector as any).config) {
        const cfg = (connector as any).config as ModelConnectorConfig<any>;
        builder.with(model.name as any, cfg as ModelConnectorConfig<any>);
      }
    }
    return builder;
  }

  with<M extends ExtractModels<TCollection>>(
    modelName: M,
    config: ModelConnectorConfig<InferModelType<TCollection, M>>
  ): this {
    const model = this.collection.models.find((m) => m.name === modelName);

    if (!model) {
      throw new Error(
        `Model "${modelName}" does not exist in collection "${this.collection.name}". ` +
          `Available models: ${this.collection.models
            .map((m) => m.name)
            .join(", ")}`
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
        if (
          config.list!.pagination?.type === "cursor" &&
          config.list!.pagination.cursorField
        ) {
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
        // Get request configuration from the function
        const requestConfig = config.create!.request(data);

        const response = await this.restConnector.request({
          method: requestConfig.method || "POST",
          url: requestConfig.endpoint,
          data: requestConfig.data ?? data,
        });

        // Validate response if schema provided
        const validated = (config.create as any).responseSchema
          ? (config.create as any).responseSchema.parse(response.data)
          : response.data;
        return validated as any;
      };
    }

    if (config.update) {
      connector.update = async (externalId: string, data: any) => {
        // Get request configuration from the function
        const requestConfig = config.update!.request(externalId, data);

        const response = await this.restConnector.request({
          method: requestConfig.method || "PUT",
          url: requestConfig.endpoint,
          data: requestConfig.data ?? data,
        });

        // Validate response if schema provided
        const validated = (config.update as any).responseSchema
          ? (config.update as any).responseSchema.parse(response.data)
          : response.data;
        return validated as any;
      };
    }

    if (config.delete) {
      connector.delete = async (externalId: string) => {
        // Get request configuration from the function
        const requestConfig = config.delete!.request(externalId);

        await this.restConnector.request({
          method: requestConfig.method || "DELETE",
          url: requestConfig.endpoint,
          data: requestConfig.data,
        });
      };
    }

    if (config.bulk?.create) {
      connector.bulkCreate = async (items: any[]) => {
        const batchSize = config.bulk!.create!.batchSize || 100;
        const results: any[] = [];

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const requestConfig = config.bulk!.create!.request(batch);

          const response = await this.restConnector.request({
            method: requestConfig.method || "POST",
            url: requestConfig.endpoint,
            data: requestConfig.data || batch,
          });
          results.push(
            ...(Array.isArray(response.data) ? response.data : [response.data])
          );
        }

        return results;
      };
    }

    if (config.bulk?.update) {
      connector.bulkUpdate = async (
        items: Array<{ id: string; data: any }>
      ) => {
        const batchSize = config.bulk!.update!.batchSize || 100;
        const results: any[] = [];

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const requestConfig = config.bulk!.update!.request(batch);

          const response = await this.restConnector.request({
            method: requestConfig.method || "PUT",
            url: requestConfig.endpoint,
            data: requestConfig.data || batch,
          });
          results.push(
            ...(Array.isArray(response.data) ? response.data : [response.data])
          );
        }

        return results;
      };
    }

    if (config.bulk?.delete) {
      connector.bulkDelete = async (ids: string[]) => {
        const batchSize = config.bulk!.delete!.batchSize || 100;

        for (let i = 0; i < ids.length; i += batchSize) {
          const batch = ids.slice(i, i + batchSize);
          const requestConfig = config.bulk!.delete!.request(batch);

          await this.restConnector.request({
            method: requestConfig.method || "DELETE",
            url: requestConfig.endpoint,
            data: requestConfig.data || batch,
          });
        }
      };
    }

    this.modelConnectors.set(modelName, connector);
    return this;
  }

  withModelConnector<M extends ExtractModels<TCollection>>(
    modelName: M,
    configBuilder: (
      builder: SyncModelConnectorBuilder<InferModelType<TCollection, M>>
    ) => SyncModelConnectorBuilder<InferModelType<TCollection, M>>
  ): this {
    const model = this.collection.models.find((m) => m.name === modelName);

    if (!model) {
      throw new Error(
        `Model "${modelName}" does not exist in collection "${this.collection.name}". ` +
          `Available models: ${this.collection.models
            .map((m) => m.name)
            .join(", ")}`
      );
    }

    const builder = new SyncModelConnectorBuilder<
      InferModelType<TCollection, M>
    >();
    const configuredBuilder = configBuilder(builder);
    const config = configuredBuilder.build();

    // Reduce type computation depth by casting here; the builder itself remains strongly typed
    return this.with(modelName, config as ModelConnectorConfig<any>);
  }

  add<M extends ExtractModels<TCollection>>(
    modelName: M,
    configBuilder: (
      builder: ModelConnectorConfigBuilder<InferModelType<TCollection, M>>
    ) => ModelConnectorConfigBuilder<InferModelType<TCollection, M>>
  ): this {
    const model = this.collection.models.find((m) => m.name === modelName);

    if (!model) {
      throw new Error(
        `Model "${modelName}" does not exist in collection "${this.collection.name}". ` +
          `Available models: ${this.collection.models
            .map((m) => m.name)
            .join(", ")}`
      );
    }

    const builder = new ModelConnectorConfigBuilder<
      InferModelType<TCollection, M>
    >();
    const configuredBuilder = configBuilder(builder);
    const config = configuredBuilder.build();

    // Reduce type computation depth by casting here; the builder itself remains strongly typed
    return this.with(modelName, config as ModelConnectorConfig<any>);
  }

  getModelConnector<M extends ExtractModels<TCollection>>(
    modelName: M
  ): ModelConnector<InferModelType<TCollection, M>> | undefined {
    return this.modelConnectors.get(modelName) as
      | ModelConnector<InferModelType<TCollection, M>>
      | undefined;
  }

  build(): SyncConnector<TRestConnector, TCollection> {
    return new SyncConnector(
      this.restConnector,
      this.collection,
      this.modelConnectors
    );
  }
}

export class SyncModelConnectorBuilder<T = any> {
  private config: ModelConnectorConfig<T> = {};

  withList<TSchema extends z.ZodType<any> = any>(config: {
    request: (params: ListParams) => {
      endpoint: string;
      method?: "GET" | "POST";
      params?: Record<string, any>;
      data?: any;
    };
    responseSchema?: TSchema;
    pagination?: PaginationConfig;
    transform?: TSchema extends z.ZodType<any>
      ? (response: z.infer<TSchema>) => T[]
      : (response: unknown) => T[];
  }): this {
    this.config.list = config as any;
    return this;
  }

  withCreate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (data: T) => {
      endpoint: string;
      method?: "POST" | "PUT";
      data?: any;
    };
    responseSchema?: TSchema;
    extract?: (item: T) => {
      externalId: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.create = config;
    return this;
  }

  withUpdate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (
      externalId: string,
      data: Partial<T>
    ) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      data?: any;
    };
    responseSchema?: TSchema;
    extract?: (item: T) => {
      externalId: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.update = config;
    return this;
  }

  withDelete(config: {
    request: (externalId: string) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      data?: any;
    };
  }): this {
    this.config.delete = config;
    return this;
  }

  withBulk(config: BulkConfig<T>): this {
    this.config.bulk = config;
    return this;
  }

  build(): ModelConnectorConfig<T> {
    return this.config;
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

  create<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (data: T) => {
      endpoint: string;
      method?: "POST" | "PUT";
      data?: any;
    };
    responseSchema?: TSchema;
    extract?: (item: T) => {
      externalId: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.create = config;
    return this;
  }

  update<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (
      externalId: string,
      data: Partial<T>
    ) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      data?: any;
    };
    responseSchema?: TSchema;
    extract?: (item: T) => {
      externalId: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.update = config;
    return this;
  }

  delete(config: {
    request: (externalId: string) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      data?: any;
    };
  }): this {
    this.config.delete = config;
    return this;
  }

  bulk(config: BulkConfig<T>): this {
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
    return this.modelConnectors.get(modelName) as
      | ModelConnector<InferModelType<TCollection, M>>
      | undefined;
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

export interface CreateSyncConnectorFn<
  TRestConnector extends RestConnector,
  TCollection extends Collection
> {
  (
    restConnector: TRestConnector,
    collection: TCollection
  ): SyncConnectorBuilder<TRestConnector, TCollection>;
  from: (
    source:
      | SyncConnectorBuilder<TRestConnector, TCollection>
      | SyncConnector<TRestConnector, TCollection>
  ) => SyncConnectorBuilder<TRestConnector, TCollection>;
}

export const createSyncConnector: CreateSyncConnectorFn<
  RestConnector,
  Collection
> = ((restConnector: any, collection: any) =>
  new SyncConnectorBuilder(restConnector, collection)) as any;

(createSyncConnector as any).from = (source: any) =>
  SyncConnectorBuilder.from(source);

// Type-safe config factory for better inference
export function createListConfig<TModel, TResponse>(config: {
  request: (params: ListParams) => {
    endpoint: string;
    method?: "GET" | "POST";
    params?: Record<string, any>;
    data?: any;
  };
  responseSchema: z.ZodType<TResponse>;
  pagination?: PaginationConfig;
  transform: (response: TResponse) => TModel[];
}): ListConfig<TModel, TResponse> {
  return config;
}

// Type-safe create config factory for better inference
export function createCreateConfig<TModel>(config: {
  request: (data: TModel) => {
    endpoint: string;
    method?: "POST" | "PUT";
    data?: any;
  };
  responseSchema?: z.ZodType<TModel>;
  extract?: (item: TModel) => {
    externalId: string;
    externalUpdatedAt: string | null;
  };
}): CreateConfig<TModel> {
  return config;
}

// Type-safe update config factory for better inference
export function createUpdateConfig<TModel>(config: {
  request: (
    id: string,
    data: Partial<TModel>
  ) => {
    endpoint: string;
    method?: "PUT" | "PATCH" | "POST";
    data?: any;
  };
  responseSchema?: z.ZodType<TModel>;
  extract?: (item: TModel) => {
    externalId: string;
    externalUpdatedAt: string | null;
  };
}): UpdateConfig<TModel> {
  return config;
}

// Type-safe delete config factory
export function createDeleteConfig(config: {
  request: (id: string) => {
    endpoint: string;
    method?: "DELETE" | "POST";
    data?: any;
  };
}): DeleteConfig {
  return config;
}
