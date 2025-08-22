import { z } from "zod";
import type { Collection } from "../types";
import type { RestConnector } from "../connectors/RestConnector";
import {
  getModels,
  getSync,
  updateSync,
  upsertObjectBatch,
  retrieveDelta,
  confirmChangeBatch,
  pauseSync,
  startSync,
  finishSync,
} from "../platform/sync";
import { getCurrentContext, getLogCapture } from "../logging";
import { isTemporaryHttpError } from "../utils/httpErrors";
import { isTimeLimitExceeded, resetTimeLimit } from "../utils/time";

// Removed legacy PaginationConfig (page/offset types no longer supported)

export interface ListParams {
  cursor?: string;
  page?: number;
  offset?: number;
  limit?: number;
  /** Nested pagination props for ergonomic access (backwards-compatible) */
  pagination?: {
    cursor?: string;
    page?: number;
    offset?: number;
    limit?: number;
  };
  [key: string]: any;
}

export interface ListConfig<TModel = any, TResponse = unknown> {
  request: (params: ListParams) => {
    endpoint: string;
    method?: "GET" | "POST";
    params?: Record<string, any>;
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<TResponse>;
  /**
   * Pagination: function that extracts the cursor for the next page from the response.
   * If omitted, a single request is made.
   */
  pagination?: (response: any) => {
    cursor?: string | null;
  };
  // Force transform to return objects ready for platform ingestion
  transform: (response: TResponse) => Array<{
    externalId: string;
    externalUpdatedAt: string | null;
    data: TModel;
  }>;
}

export interface CreateConfig<T = any> {
  request: (obj: T) => {
    endpoint: string;
    method?: "POST" | "PUT";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<T>;
  /** Optionally transform the user-provided data before sending the request */
  transformRequest?: (data: T) => any;
  /** Optionally transform the raw or validated response into the final model */
  transform?: (response: any) => T;
  extract: (item: T) => {
    externalId: string;
    externalUpdatedAt: string | null;
  };
}

export interface UpdateConfig<T = any> {
  request: (
    id: string,
    obj: Partial<T>
  ) => {
    endpoint: string;
    method?: "PUT" | "PATCH" | "POST";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<T>;
  /** Optionally transform the user-provided partial data before sending the request */
  transformRequest?: (data: Partial<T>) => any;
  /** Optionally transform the raw or validated response into the final model */
  transform?: (response: any) => T;
  extract: (item: T) => {
    externalId?: string;
    externalUpdatedAt: string | null;
  };
}

export interface DeleteConfig {
  request: (id: string) => {
    endpoint: string;
    method?: "DELETE" | "POST";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
}

export interface BulkConfig<T = any> {
  create?: {
    request: (items: T[]) => {
      endpoint: string;
      method?: "POST" | "PUT";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    batchSize?: number;
  };
  update?: {
    request: (items: Array<{ id: string; data: Partial<T> }>) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    batchSize?: number;
  };
  delete?: {
    request: (ids: string[]) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
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
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<TResponse>;
  pagination?: (response: any) => {
    cursor?: string | null;
  };
  transform: (response: TResponse) => Array<{
    externalId: string;
    externalUpdatedAt: string | null;
    data: TModel;
  }>;
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
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: TResponseSchema;
  pagination?: (response: any) => { cursor?: string | null };
  transform: TResponseSchema extends z.ZodType<any>
    ? (response: InferResponseType<TResponseSchema>) => Array<{
        externalId: string;
        externalUpdatedAt: string | null;
        data: TModel;
      }>
    : (response: unknown) => Array<{
        externalId: string;
        externalUpdatedAt: string | null;
        data: TModel;
      }>;
}

export interface ModelConnector<T = any> {
  modelName: string;
  config: ModelConnectorConfig<T>;
  list?: (params?: any) => Promise<{
    items: Array<{
      externalId: string;
      externalUpdatedAt: string | null;
      data: T;
    }>;
    nextCursor?: string;
  }>;
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
        const _params: ListParams = params || {};
        // Ensure nested pagination mirror exists for ergonomics
        if (!_params.pagination) {
          _params.pagination = {
            cursor: _params.cursor,
            page: _params.page,
            offset: _params.offset,
            limit: _params.limit,
          };
        } else {
          // Keep top-level in sync if nested is present
          _params.cursor = _params.cursor ?? _params.pagination.cursor;
          _params.page = _params.page ?? _params.pagination.page;
          _params.offset = _params.offset ?? _params.pagination.offset;
          _params.limit = _params.limit ?? _params.pagination.limit;
        }

        const requestConfig = config.list!.request(_params);

        const response = await this.restConnector.request({
          method: requestConfig.method || "GET",
          url: requestConfig.endpoint,
          params: requestConfig.params,
          json: requestConfig.json ?? requestConfig.data,
        });

        let data = response.data;
        let items: Array<{
          externalId: string;
          externalUpdatedAt: string | null;
          data: any;
        }> = [];

        if (config.list!.responseSchema) {
          data = config.list!.responseSchema.parse(data);
        }

        // Apply required transform into platform object shape
        items = config.list!.transform(data);

        // Extract pagination info based on pagination function
        let nextCursor: string | undefined;
        const pg = config.list!.pagination as
          | ((response: any) => { cursor?: string | null })
          | undefined;
        if (typeof pg === "function") {
          const res = pg(data);
          nextCursor = (res?.cursor ?? undefined) || undefined;
        }

        return {
          items,
          nextCursor,
        };
      };
    }

    if (config.create) {
      connector.create = async (obj: any) => {
        // Allow optional request transformation
        const requestData = config.create!.transformRequest
          ? config.create!.transformRequest(obj)
          : obj;

        // Get request configuration from the function
        const requestConfig = config.create!.request(obj);

        const response = await this.restConnector.request({
          method: requestConfig.method || "POST",
          url: requestConfig.endpoint,
          json: requestConfig.json ?? requestConfig.data ?? requestData,
        });

        // Validate response if schema provided
        const validated = (config.create as any).responseSchema
          ? (config.create as any).responseSchema.parse(response.data)
          : response.data;

        // Optionally transform response into final model
        const result = (config.create as any).transform
          ? (config.create as any).transform(validated)
          : validated;

        return result as any;
      };
    }

    if (config.update) {
      connector.update = async (externalId: string, obj: any) => {
        // Allow optional request transformation
        const requestData = config.update!.transformRequest
          ? config.update!.transformRequest(obj)
          : obj;

        // Get request configuration from the function
        const requestConfig = config.update!.request(externalId, obj);

        const response = await this.restConnector.request({
          method: requestConfig.method || "PUT",
          url: requestConfig.endpoint,
          json: requestConfig.json ?? requestConfig.data ?? requestData,
        });

        // Validate response if schema provided
        const validated = (config.update as any).responseSchema
          ? (config.update as any).responseSchema.parse(response.data)
          : response.data;

        // Optionally transform response into final model
        const result = (config.update as any).transform
          ? (config.update as any).transform(validated)
          : validated;

        return result as any;
      };
    }

    if (config.delete) {
      connector.delete = async (externalId: string) => {
        // Get request configuration from the function
        const requestConfig = config.delete!.request(externalId);

        await this.restConnector.request({
          method: requestConfig.method || "DELETE",
          url: requestConfig.endpoint,
          json: requestConfig.json ?? requestConfig.data,
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
            json: requestConfig.json ?? requestConfig.data ?? batch,
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
            json: requestConfig.json ?? requestConfig.data ?? batch,
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
            json: requestConfig.json ?? requestConfig.data ?? batch,
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
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    pagination?: TSchema extends z.ZodType<any>
      ? (response: z.infer<TSchema>) => { cursor?: string | null }
      : (response: unknown) => { cursor?: string | null };
    transform: TSchema extends z.ZodType<any>
      ? (response: z.infer<TSchema>) => Array<{
          externalId: string;
          externalUpdatedAt: string | null;
          data: T;
        }>
      : (response: unknown) => Array<{
          externalId: string;
          externalUpdatedAt: string | null;
          data: T;
        }>;
  }): this {
    this.config.list = config as any;
    return this;
  }

  withCreate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (obj: T) => {
      endpoint: string;
      method?: "POST" | "PUT";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract: (
      item: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => {
      externalId: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.create = config as unknown as CreateConfig<T>;
    return this;
  }

  withUpdate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (
      externalId: string,
      obj: Partial<T>
    ) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract: (
      item: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => {
      externalId?: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.update = config as unknown as UpdateConfig<T>;
    return this;
  }

  withDelete(config: {
    request: (externalId: string) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
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
    pagination?: (response: z.infer<TSchema>) => { cursor?: string | null };
    transform: (response: z.infer<TSchema>) => Array<{
      externalId: string;
      externalUpdatedAt: string | null;
      data: T;
    }>;
  }): this {
    this.config.list = config as any;
    return this;
  }

  create<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (obj: T) => {
      endpoint: string;
      method?: "POST" | "PUT";
      data?: any;
    };
    responseSchema?: TSchema;
    extract: (
      item: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => {
      externalId: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.create = config as unknown as CreateConfig<T>;
    return this;
  }

  update<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (
      externalId: string,
      obj: Partial<T>
    ) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      data?: any;
    };
    responseSchema?: TSchema;
    extract: (
      item: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => {
      externalId?: string;
      externalUpdatedAt: string | null;
    };
  }): this {
    this.config.update = config as unknown as UpdateConfig<T>;
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
    // High-level orchestration per sync-requirements

    const ctx = getCurrentContext();
    let syncId: string | undefined = (ctx as any)?.syncId;
    const managedUserId: string | undefined = (ctx as any)?.managedUserId;
    const app: string | undefined = (ctx as any)?.appName ?? undefined;
    const customApp: string | undefined =
      (ctx as any)?.customAppName ?? undefined;
    const runId: string | undefined = (ctx as any)?.runId ?? undefined;

    // If syncId is not provided in context, start a new sync via API
    if (!syncId) {
      if (!managedUserId) {
        console.warn(
          "No managedUserId in context; attempting to start sync without it"
        );
      }
      const collectionName = this.collection.name;
      const sync = await startSync({
        collectionName,
        appName: app ?? null,
        customAppName: customApp ?? null,
        managedUserId,
        runId,
      });
      console.info(
        `Started sync ${sync?.id} (${
          sync?.type || "UNKNOWN"
        }) for collection ${collectionName}`
      );
      syncId = sync?.id;
      if (!syncId) {
        throw new Error("Failed to start sync: missing id in response");
      }
      // Set syncId into the log/context so subsequent platform calls can read it
      getLogCapture()?.setContext({ syncId } as any);
    }
    // Require managed user for sync execution
    if (!managedUserId) {
      throw new Error("Missing managedUserId in context");
    }

    // Reset time budget for this run
    resetTimeLimit();

    // Determine models to sync from platform
    const collectionName = this.collection.name;
    const orderedModels = await getModels({ collectionName });
    let modelsToSync = orderedModels.map((m: any) => m.name);

    const sync = await getSync({ syncId });

    const currentModelName: string | undefined =
      sync.currentModel?.name ?? undefined;
    if (currentModelName) {
      const idx = modelsToSync.indexOf(currentModelName);
      if (idx >= 0) modelsToSync = modelsToSync.slice(idx);
    }

    let hadError = false;
    let errorMessage: string | undefined = undefined;
    let unrecoverableError = false;

    const isUnrecoverableSyncError = (err: any): boolean => {
      let status: number | undefined = undefined;
      if (err && typeof err === "object") {
        if (typeof (err as any).status === "number") {
          status = (err as any).status as number;
        } else if (
          (err as any).response &&
          typeof (err as any).response.status === "number"
        ) {
          status = (err as any).response.status as number;
        }
      }
      if (typeof status === "number") {
        return !isTemporaryHttpError(status);
      }
      // No status available: treat as temporary
      return false;
    };

    try {
      for (const modelName of modelsToSync) {
        const connector = this.modelConnectors.get(modelName);
        if (!connector) continue; // Skip missing connectors

        await updateSync({ syncId, currentModelName: modelName });

        // Load latest sync state before starting model
        let state = await getSync({ syncId });
        const requestedDirection: "pull" | "push" | "bidirectional" =
          (state.requestedDirection as any) || "bidirectional";
        let currentDirection: "PULL" | "PUSH" | null =
          state.currentDirection ?? null;

        // Read model watermarks
        let cursor: string | undefined =
          state.lastBatch?.modelName === modelName
            ? state.lastBatch?.cursor
            : undefined;
        let lastExternalId: string | undefined =
          state.modelStatuses?.[modelName]?.lastExternalId ?? undefined;
        let lastExternalUpdatedAt: string | undefined =
          state.modelStatuses?.[modelName]?.lastExternalUpdatedAt ?? undefined;
        const syncType: "FULL" | "INCREMENTAL" = state.type || "FULL";

        // PULL phase
        if (
          (requestedDirection === "pull" ||
            requestedDirection === "bidirectional") &&
          currentDirection !== "PUSH"
        ) {
          await updateSync({ syncId, currentDirection: "PULL" });
          console.info(`PULL phase started for model ${modelName}`);
          // Paginate using the configured list
          const listFn = connector.list;
          if (listFn) {
            const pagination = (connector as any).config?.list?.pagination as
              | ((response: any) => { cursor?: string | null })
              | undefined;
            const isCursorViaFunction = typeof pagination === "function";

            while (true) {
              if (isTimeLimitExceeded()) {
                await pauseSync(syncId);
                throw "RERUN";
              }

              // Build params with pagination + watermarks
              const params: any = {};
              if (isCursorViaFunction) {
                params.cursor = cursor;
              } else {
                // no pagination config; single request
              }
              if (lastExternalId) params.lastExternalId = lastExternalId;
              if (lastExternalUpdatedAt)
                params.lastExternalUpdatedAt = lastExternalUpdatedAt;
              params.syncType = syncType;

              const { items, nextCursor } = await listFn(params);
              console.info(
                `Fetched ${
                  items?.length ?? 0
                } items for model ${modelName} (nextCursor=${
                  nextCursor ?? "none"
                })`
              );

              if (!items || items.length === 0) {
                console.info(
                  `No more items for model ${modelName}; ending pull page`
                );
                break; // page/offset end or no data
              }

              // Items are already in platform-ready shape from transform
              const objects = items.map((it: any) => ({
                externalId: String(it.externalId),
                externalUpdatedAt: it.externalUpdatedAt
                  ? String(it.externalUpdatedAt)
                  : null,
                data: it.data,
              }));

              console.info(
                `Upserting ${
                  objects.length
                } objects for model ${modelName} (cursor=${
                  nextCursor ?? "none"
                })`
              );
              await upsertObjectBatch({
                collectionName,
                syncId,
                modelName,
                app,
                customApp,
                objects,
                cursor: nextCursor,
                async: true,
              });
              console.info(
                `Queued ${objects.length} upserts for model ${modelName}`
              );

              // advance watermarks
              const last = objects[objects.length - 1];
              lastExternalId = last.externalId;
              lastExternalUpdatedAt = last.externalUpdatedAt || undefined;
              cursor = nextCursor;

              // Continue pagination
              if (isCursorViaFunction) {
                if (!cursor) break;
              } else {
                // no pagination; single page
                break;
              }
            }
          }
        }

        // PUSH phase
        if (
          requestedDirection === "push" ||
          requestedDirection === "bidirectional"
        ) {
          await updateSync({ syncId, currentDirection: "PUSH" });
          console.info(`PUSH phase started for model ${modelName}`);

          while (true) {
            if (isTimeLimitExceeded()) {
              await pauseSync(syncId);
              throw "RERUN";
            }

            const delta = await retrieveDelta({
              collectionName,
              syncId,
              modelName,
            });
            console.info(
              `Delta received for model ${modelName}: operation=${
                (delta as any).operation
              } count=${(delta as any).changes?.length ?? 0}`
            );

            if (!delta.changes || delta.changes.length === 0) break;

            if (connector.bulkCreate && delta.operation === "CREATE") {
              console.info(
                `Creating ${delta.changes.length} items for model ${modelName} (bulk)`
              );
              const created = await connector.bulkCreate(
                delta.changes.map((c: any) => c.data)
              );
              const changesToConfirm = created.map((item: any, i: number) => {
                const change = delta.changes[i];
                const externalId = (
                  connector.config.create?.extract
                    ? connector.config.create.extract(item)
                    : {
                        externalId: (item.id ?? item.externalId) as string,
                        externalUpdatedAt: (item.updatedAt ?? null) as any,
                      }
                ) as any;
                return {
                  changeId: change.changeId,
                  externalId: String(
                    externalId.externalId ?? externalId.id ?? item.id
                  ),
                  externalUpdatedAt: externalId.externalUpdatedAt ?? null,
                };
              });
              await confirmChangeBatch({
                syncId,
                changes: changesToConfirm,
                async: true,
              });
              console.info(
                `Confirmed ${changesToConfirm.length} CREATE changes for model ${modelName}`
              );
            } else if (connector.bulkUpdate && delta.operation === "UPDATE") {
              console.info(
                `Updating ${delta.changes.length} items for model ${modelName} (bulk)`
              );
              const payload = delta.changes.map((c: any) => ({
                id: c.externalId,
                data: c.data,
              }));
              const updated = await connector.bulkUpdate(payload);
              const changesToConfirm = updated.map((item: any, i: number) => {
                const change = delta.changes[i];
                const extracted = (
                  connector.config.update?.extract
                    ? connector.config.update.extract(item)
                    : {
                        externalId: change.externalId,
                        externalUpdatedAt: (item.updatedAt ?? null) as any,
                      }
                ) as any;
                return {
                  changeId: change.changeId,
                  externalId: String(extracted.externalId ?? change.externalId),
                  externalUpdatedAt: extracted.externalUpdatedAt ?? null,
                };
              });
              await confirmChangeBatch({
                syncId,
                changes: changesToConfirm,
                async: true,
              });
              console.info(
                `Confirmed ${changesToConfirm.length} UPDATE changes for model ${modelName}`
              );
            } else if (connector.bulkDelete && delta.operation === "DELETE") {
              console.info(
                `Deleting ${delta.changes.length} items for model ${modelName} (bulk)`
              );
              await connector.bulkDelete(
                delta.changes.map((c: any) => c.externalId)
              );
              const changesToConfirm = delta.changes.map((c: any) => ({
                changeId: c.changeId,
                externalId: String(c.externalId),
              }));
              await confirmChangeBatch({
                syncId,
                changes: changesToConfirm,
                async: true,
              });
              console.info(
                `Confirmed ${changesToConfirm.length} DELETE changes for model ${modelName}`
              );
            } else {
              // Fallback to non-bulk
              if (delta.operation === "CREATE" && connector.create) {
                console.info(
                  `Creating ${delta.changes.length} items for model ${modelName} (non-bulk)`
                );
                const confirmations: Array<{
                  changeId: string;
                  externalId: string;
                  externalUpdatedAt: string | null;
                }> = [];
                for (const change of delta.changes) {
                  const created = await connector.create(change.data);
                  const extracted = (
                    connector.config.create?.extract
                      ? connector.config.create.extract(created)
                      : {
                          externalId: (created as any).id as string,
                          externalUpdatedAt: ((created as any).updatedAt ??
                            null) as any,
                        }
                  ) as any;
                  confirmations.push({
                    changeId: change.changeId,
                    externalId: String(
                      extracted.externalId ?? (created as any).id
                    ),
                    externalUpdatedAt: extracted.externalUpdatedAt ?? null,
                  });
                }
                await confirmChangeBatch({
                  syncId,
                  changes: confirmations,
                  async: true,
                });
                console.info(
                  `Confirmed ${confirmations.length} CREATE changes for model ${modelName}`
                );
              } else if (delta.operation === "UPDATE" && connector.update) {
                console.info(
                  `Updating ${delta.changes.length} items for model ${modelName} (non-bulk)`
                );
                const confirmations: Array<{
                  changeId: string;
                  externalId: string;
                  externalUpdatedAt: string | null;
                }> = [];
                for (const change of delta.changes) {
                  const updated = await connector.update(
                    change.externalId,
                    change.data
                  );
                  const extracted = (
                    connector.config.update?.extract
                      ? connector.config.update.extract(updated)
                      : {
                          externalId: change.externalId,
                          externalUpdatedAt: ((updated as any).updatedAt ??
                            null) as any,
                        }
                  ) as any;
                  confirmations.push({
                    changeId: change.changeId,
                    externalId: String(
                      extracted.externalId ?? change.externalId
                    ),
                    externalUpdatedAt: extracted.externalUpdatedAt ?? null,
                  });
                }
                await confirmChangeBatch({
                  syncId,
                  changes: confirmations,
                  async: true,
                });
                console.info(
                  `Confirmed ${confirmations.length} UPDATE changes for model ${modelName}`
                );
              } else if (delta.operation === "DELETE" && connector.delete) {
                console.info(
                  `Deleting ${delta.changes.length} items for model ${modelName} (non-bulk)`
                );
                const confirmations: Array<{
                  changeId: string;
                  externalId: string;
                }> = [];
                for (const change of delta.changes) {
                  await connector.delete(change.externalId);
                  confirmations.push({
                    changeId: change.changeId,
                    externalId: String(change.externalId),
                  });
                }
                await confirmChangeBatch({
                  syncId,
                  changes: confirmations,
                  async: true,
                });
                console.info(
                  `Confirmed ${confirmations.length} DELETE changes for model ${modelName}`
                );
              } else {
                // No applicable operation configured; nothing to push
                break;
              }
            }
          }
        }

        // Clear direction after model finishes
        await updateSync({ syncId, currentDirection: null });
      }
    } catch (e: any) {
      if (e === "RERUN") throw e;
      if (e === "SKIPPED") {
        console.warn(
          "Sync start was skipped by server policy; exiting cleanly"
        );
        return;
      }
      hadError = true;
      errorMessage = e instanceof Error ? e.message : String(e);
      unrecoverableError = isUnrecoverableSyncError(e);
      console.error(`Sync encountered an error:`, e);
    }

    // Finish the sync (use error body only if we encountered failures)
    try {
      console.info(
        `Finishing sync ${syncId}${hadError ? " (with error)" : ""} force=${
          hadError && unrecoverableError
        }`
      );
      if (hadError) {
        try {
          await finishSync(syncId, {
            error: errorMessage,
            force: true,
          });
        } catch (finishErr: any) {
          console.warn(`finishSync(force=true) failed:`, finishErr);
        }
      } else {
        await finishSync(syncId);
      }
      console.info(`Finished sync ${syncId}`);
    } catch (e) {
      console.warn(`Failed to finish sync ${syncId}:`, e);
      // Treat inability to finish the sync as a run-level failure
      hadError = true;
      errorMessage =
        (e instanceof Error ? e.message : String(e)) ||
        errorMessage ||
        "Failed to finish sync";
      // Do not force unless unrecoverable; we already included force above
    }

    // If the sync had errors, propagate failure to the caller so the run fails
    if (hadError) {
      throw new Error(errorMessage || "Sync failed");
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

export function createSyncConnector<
  RC extends RestConnector,
  C extends Collection
>(restConnector: RC, collection: C): SyncConnectorBuilder<RC, C> {
  return new SyncConnectorBuilder<RC, C>(restConnector, collection);
}

createSyncConnector.from = (source: any) => SyncConnectorBuilder.from(source);

// Type-safe config factory for better inference
export function createListConfig<TModel, TResponse>(config: {
  request: (params: ListParams) => {
    endpoint: string;
    method?: "GET" | "POST";
    params?: Record<string, any>;
    data?: any;
  };
  responseSchema: z.ZodType<TResponse>;
  pagination?: (response: any) => { cursor?: string | null };
  transform: (response: TResponse) => Array<{
    externalId: string;
    externalUpdatedAt: string | null;
    data: TModel;
  }>;
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
  transform?: (response: any) => TModel;
  extract: (item: TModel) => {
    externalId: string;
    externalUpdatedAt: string | null;
  };
}): CreateConfig<TModel> {
  return config as CreateConfig<TModel>;
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
  transform?: (response: any) => TModel;
  extract: (item: TModel) => {
    externalId?: string;
    externalUpdatedAt: string | null;
  };
}): UpdateConfig<TModel> {
  return config as UpdateConfig<TModel>;
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
