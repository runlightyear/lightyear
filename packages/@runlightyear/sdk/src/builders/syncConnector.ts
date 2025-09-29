import { z } from "zod";
import type { Collection, InferModelDataFromCollection } from "../types";
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
  getUnconfirmedChanges,
} from "../platform/sync";
import { getCurrentContext, getLogCapture } from "../logging";
import { isTemporaryHttpError } from "../utils/httpErrors";
import { isTimeLimitExceeded, resetTimeLimit } from "../utils/time";
import { ChangeProcessor } from "../platform/changeProcessor";

// Removed legacy PaginationConfig (page/offset types no longer supported)

export interface ListParams {
  cursor?: string;
  page?: number;
  offset?: number;
  limit?: number;
  lastExternalId?: string;
  lastExternalUpdatedAt?: string;
  syncType: "FULL" | "INCREMENTAL";
}

// Prevents TypeScript from inferring a type parameter from a usage site.
// Useful when we want inference to come solely from another argument (e.g., a literal model name).
type NoInfer<T> = [T][T extends any ? 0 : never];

export type SyncObject<TModel> = {
  externalId: string;
  externalUpdatedAt: string | null;
  data: TModel;
};

export interface BatchCreateChange<TModel = any> {
  changeId: string;
  data: TModel;
  obj: TModel;
  id?: string;
  [key: string]: any;
}

export interface BatchUpdateChange<TModel = any> {
  changeId: string;
  externalId: string;
  data: Partial<TModel>;
  obj: Partial<TModel>;
  id?: string;
  [key: string]: any;
}

export interface BatchDeleteChange {
  changeId: string;
  externalId: string;
  id?: string;
  [key: string]: any;
}

export interface BatchConfirmation {
  changeId: string;
  externalId: string;
  externalUpdatedAt?: string | null;
}

export type BatchCreateRequestItems<TModel> =
  | Array<TModel>
  | Array<BatchCreateChange<TModel>>;

type BatchCreateResponseItems<TModel> =
  | Array<TModel>
  | Array<BatchConfirmation>;

export type BatchUpdateRequestItems<TModel> = Array<BatchUpdateChange<TModel>>;

type BatchUpdateResponseItems<TModel> =
  | Array<TModel>
  | Array<BatchConfirmation>;

export type BatchDeleteRequestItems = Array<BatchDeleteChange>;

type BatchDeleteResponseItems = Array<BatchConfirmation>;

export interface ListFilterArgs<TModel = any> {
  obj: SyncObject<TModel>;
  lastExternalId?: string;
  lastExternalUpdatedAt?: string;
  syncType: "FULL" | "INCREMENTAL";
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
   * Pagination: function that extracts pagination state from the response.
   * If omitted, a single request is made.
   */
  pagination?: (args: {
    response: any;
    cursor?: string;
    page?: number;
    offset?: number;
    limit?: number;
    lastExternalId?: string;
    lastExternalUpdatedAt?: string;
    syncType: "FULL" | "INCREMENTAL";
  }) => {
    cursor?: string | null;
    page?: number | null;
    offset?: number | null;
    hasMore: boolean;
  };
  // Optional transform to map raw response to an array of sync-ready objects
  transform?: (response: TResponse) => Array<SyncObject<TModel>>;
  filter?: (args: ListFilterArgs<TModel>) => boolean;
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

export interface BatchCreateOperationConfig<T = any> {
  request: (items: BatchCreateRequestItems<T>) => {
    endpoint: string;
    method?: "POST" | "PUT";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<any>;
  extract?: (response: any) => Array<BatchConfirmation>;
  payloadType?: "items" | "changes";
  batchSize?: number;
}

export interface BatchUpdateOperationConfig<T = any> {
  request: (items: BatchUpdateRequestItems<T>) => {
    endpoint: string;
    method?: "PUT" | "PATCH" | "POST";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<any>;
  extract?: (response: any) => Array<BatchConfirmation>;
  payloadType?: "items" | "changes";
  batchSize?: number;
}

export interface BatchDeleteOperationConfig {
  request: (items: BatchDeleteRequestItems) => {
    endpoint: string;
    method?: "DELETE" | "POST";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<any>;
  extract?: (response: any) => Array<BatchConfirmation>;
  payloadType?: "ids" | "changes";
  batchSize?: number;
}

export interface ModelConnectorConfig<T = any> {
  list?: ListConfig<T, any>;
  create?: CreateConfig<T>;
  update?: UpdateConfig<T>;
  delete?: DeleteConfig;
  batchCreate?: BatchCreateOperationConfig<T>;
  batchUpdate?: BatchUpdateOperationConfig<T>;
  batchDelete?: BatchDeleteOperationConfig;
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
  pagination?: (args: {
    response: any;
    cursor?: string;
    page?: number;
    offset?: number;
    limit?: number;
    syncType: "FULL" | "INCREMENTAL";
  }) => {
    cursor?: string | null;
    page?: number | null;
    offset?: number | null;
    hasMore: boolean;
  };
  transform?: (response: TResponse) => Array<SyncObject<TModel>>;
  filter?: (args: ListFilterArgs<TModel>) => boolean;
}

export interface TypedModelConnectorConfig<TModel> {
  list?: TypedListConfig<TModel, any>;
  create?: CreateConfig<TModel>;
  update?: UpdateConfig<TModel>;
  delete?: DeleteConfig;
  batchCreate?: BatchCreateOperationConfig<TModel>;
  batchUpdate?: BatchUpdateOperationConfig<TModel>;
  batchDelete?: BatchDeleteOperationConfig;
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
  pagination?: (args: {
    response: any;
    cursor?: string;
    page?: number;
    offset?: number;
    limit?: number;
    syncType: "FULL" | "INCREMENTAL";
  }) => {
    cursor?: string | null;
    page?: number | null;
    offset?: number | null;
    hasMore: boolean;
  };
  transform?: TResponseSchema extends z.ZodType<any>
    ? (
        response: InferResponseType<TResponseSchema>
      ) => Array<SyncObject<TModel>>
    : (response: unknown) => Array<SyncObject<TModel>>;
  filter?: (args: ListFilterArgs<TModel>) => boolean;
}

export interface ModelConnector<T = any> {
  modelName: string;
  config: ModelConnectorConfig<T>;
  list?: (params?: ListParams) => Promise<{
    items: Array<SyncObject<T>>;
    pagination: {
      cursor?: string;
      page?: number;
      offset?: number;
      hasMore: boolean;
    };
  }>;
  create?: (data: T) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<void>;
  batchCreate?: (
    items: BatchCreateRequestItems<T>
  ) => Promise<BatchCreateResponseItems<T>>;
  batchUpdate?: (
    items: BatchUpdateRequestItems<T>
  ) => Promise<BatchUpdateResponseItems<T>>;
  batchDelete?: (
    items: BatchDeleteRequestItems
  ) => Promise<BatchDeleteResponseItems>;
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

// Force distribution over union types
type DistributiveInferModelType<C extends Collection, M> = M extends string
  ? InferModelType<C, M>
  : never;

// Distributive conditional type to handle model type extraction
type DistributeModelType<C extends Collection, M> = M extends string
  ? InferModelType<C, M>
  : never;

// Helper to extract the exact type for a specific model name
type ExtractSpecificModelType<
  C extends Collection,
  M extends string
> = C extends { __modelData?: infer Data }
  ? Data extends Record<string, any>
    ? M extends keyof Data
      ? Data[M]
      : never
    : never
  : never;

// Create a mapped type for model connectors
type ModelConnectorMap<C extends Collection> = {
  [K in ExtractModels<C>]: (
    builder: SyncModelConnectorBuilder<InferModelType<C, K>>
  ) => SyncModelConnectorBuilder<any>;
};

/**
 * Builder for creating sync connectors with model configurations.
 *
 * By default, uses async writes for batch operations to improve performance.
 *
 * @example
 * ```typescript
 * // Default: async writes enabled
 * const connector = createSyncConnector(restConnector, collection)
 *   .withModelConnector("contacts", builder => ...)
 *   .build();
 *
 * // Disable async writes
 * const syncConnector = createSyncConnector(restConnector, collection)
 *   .withModelConnector("contacts", builder => ...)
 *   .withSyncWrites() // Use synchronous writes
 *   .build();
 * ```
 */
export class SyncConnectorBuilder<
  TRestConnector extends RestConnector = RestConnector,
  TCollection extends Collection = Collection
> {
  private restConnector: TRestConnector;
  private collection: TCollection;
  private modelConnectors: Map<string, ModelConnector> = new Map();
  private useAsyncWrites: boolean = true; // Default to async writes

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
          if (cfg.batchCreate) bb.batchCreate(cfg.batchCreate as any);
          if (cfg.batchUpdate) bb.batchUpdate(cfg.batchUpdate as any);
          if (cfg.batchDelete) bb.batchDelete(cfg.batchDelete as any);
          return bb;
        });
      });
      // Copy async writes setting if available
      if (typeof (source as any).useAsyncWrites === "boolean") {
        builder.useAsyncWrites = (source as any).useAsyncWrites;
      }
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

  with<const M extends ExtractModels<TCollection>>(
    modelName: M,
    config: ModelConnectorConfig<InferModelType<TCollection, NoInfer<M>>>
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
      connector.list = async (params: ListParams = { syncType: "FULL" }) => {
        // Build request from provided params (no nested pagination)
        const _params: ListParams = params || ({ syncType: "FULL" } as any);
        const requestConfig = config.list!.request(_params);

        const listReq: any = {
          method: requestConfig.method || "GET",
          url: requestConfig.endpoint,
          params: requestConfig.params,
        };
        const maybeData = requestConfig.json ?? requestConfig.data;
        if (maybeData !== undefined) listReq.data = maybeData;
        const response = await this.restConnector.request(listReq);

        let data = response.data;
        let items: Array<SyncObject<any>> = [];

        if (config.list!.responseSchema) {
          data = config.list!.responseSchema.parse(data);
        }

        // Apply required transform into platform object shape
        items = config.list!.transform
          ? config.list!.transform(data)
          : (data as Array<SyncObject<any>>);

        if (config.list!.filter) {
          items = items.filter((obj) =>
            config.list!.filter!({
              obj,
              lastExternalId: _params.lastExternalId,
              lastExternalUpdatedAt: _params.lastExternalUpdatedAt,
              syncType: _params.syncType,
            })
          );
        }

        // Extract pagination info
        const pg = config.list!.pagination as
          | ((args: {
              response: any;
              cursor?: string;
              page?: number;
              offset?: number;
              limit?: number;
              lastExternalId?: string;
              lastExternalUpdatedAt?: string;
              syncType: "FULL" | "INCREMENTAL";
            }) => {
              cursor?: string | null;
              page?: number | null;
              offset?: number | null;
              hasMore: boolean;
            })
          | undefined;
        const res =
          typeof pg === "function"
            ? pg({
                response: data,
                cursor: _params.cursor,
                page: _params.page,
                offset: _params.offset,
                limit: _params.limit,
                lastExternalId: _params.lastExternalId,
                lastExternalUpdatedAt: _params.lastExternalUpdatedAt,
                syncType: _params.syncType,
              })
            : undefined;
        const pagination = {
          cursor: res?.cursor ?? undefined,
          page: res?.page ?? undefined,
          offset: res?.offset ?? undefined,
          hasMore: res?.hasMore ?? false,
        } as {
          cursor?: string;
          page?: number;
          offset?: number;
          hasMore: boolean;
        };

        return {
          items,
          pagination,
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
          data: requestConfig.json ?? requestConfig.data ?? requestData,
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
          data: requestConfig.json ?? requestConfig.data ?? requestData,
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

    if (config.batchCreate) {
      connector.batchCreate = async (items: any[]) => {
        const batchSize = config.batchCreate!.batchSize || 100;
        const aggregatedResponses: any[] = [];
        const confirmations: BatchConfirmation[] = [];
        const isChangePayload = config.batchCreate!.payloadType === "changes";

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const formattedBatch = isChangePayload
            ? batch.map((item: any) => {
                const payload = item.data ?? item.obj ?? item.payload ?? item;
                return {
                  ...item,
                  data: payload,
                  obj: item.obj ?? payload,
                };
              })
            : batch;
          const requestConfig = config.batchCreate!.request(formattedBatch);

          const response = await this.restConnector.request({
            method: requestConfig.method || "POST",
            url: requestConfig.endpoint,
            data: requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });

          let responseData = response.data;
          if (config.batchCreate!.responseSchema) {
            responseData =
              config.batchCreate!.responseSchema.parse(responseData);
          }

          if (config.batchCreate!.extract) {
            const extracted = config.batchCreate!.extract(responseData) ?? [];
            confirmations.push(
              ...extracted.map((result) => ({
                changeId: String(result.changeId),
                externalId: String(result.externalId),
                externalUpdatedAt:
                  result.externalUpdatedAt === undefined ||
                  result.externalUpdatedAt === null
                    ? null
                    : String(result.externalUpdatedAt),
              }))
            );
          }

          aggregatedResponses.push(
            ...(Array.isArray(responseData) ? responseData : [responseData])
          );
        }

        return config.batchCreate!.extract
          ? confirmations
          : aggregatedResponses;
      };
    }

    if (config.batchUpdate) {
      connector.batchUpdate = async (items: BatchUpdateRequestItems<any>) => {
        const batchSize = config.batchUpdate!.batchSize || 100;
        const aggregatedResponses: any[] = [];
        const confirmations: BatchConfirmation[] = [];
        const payloadType =
          config.batchUpdate!.payloadType ??
          (config.batchUpdate!.extract ? "changes" : "items");

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const formattedBatch =
            payloadType === "changes"
              ? batch.map((item: BatchUpdateChange<any>) => {
                  const payload = item.data ?? item.obj ?? {};
                  const externalId = String(item.externalId ?? item.id);
                  return {
                    ...item,
                    externalId,
                    id: item.id ?? externalId,
                    data: payload,
                    obj: item.obj ?? payload,
                  };
                })
              : batch;
          const requestConfig = config.batchUpdate!.request(
            formattedBatch as any
          );

          const response = await this.restConnector.request({
            method: requestConfig.method || "PUT",
            url: requestConfig.endpoint,
            data: requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });
          let responseData = response.data;
          if (config.batchUpdate!.responseSchema) {
            responseData =
              config.batchUpdate!.responseSchema!.parse(responseData);
          }

          if (config.batchUpdate!.extract) {
            const extracted = config.batchUpdate!.extract!(responseData) ?? [];
            confirmations.push(
              ...extracted.map((result) => ({
                changeId: String(result.changeId),
                externalId: String(result.externalId),
                externalUpdatedAt:
                  result.externalUpdatedAt === undefined ||
                  result.externalUpdatedAt === null
                    ? null
                    : String(result.externalUpdatedAt),
              }))
            );
          }

          aggregatedResponses.push(
            ...(Array.isArray(responseData) ? responseData : [responseData])
          );
        }

        return config.batchUpdate!.extract
          ? confirmations
          : aggregatedResponses;
      };
    }

    if (config.batchDelete) {
      connector.batchDelete = async (items: BatchDeleteRequestItems) => {
        const batchSize = config.batchDelete!.batchSize || 100;
        const confirmations: BatchConfirmation[] = [];
        const payloadType =
          config.batchDelete!.payloadType ??
          (config.batchDelete!.extract ? "changes" : "ids");

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const formattedBatch =
            payloadType === "changes"
              ? batch.map((item: BatchDeleteChange) => {
                  const externalId = String(item.externalId ?? item.id);
                  return {
                    ...item,
                    externalId,
                    id: item.id ?? externalId,
                  };
                })
              : batch;
          const requestConfig = config.batchDelete!.request(
            formattedBatch as any
          );

          const response = await this.restConnector.request({
            method: requestConfig.method || "DELETE",
            url: requestConfig.endpoint,
            data: requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });

          if (config.batchDelete!.extract) {
            let responseData = response.data;
            if (config.batchDelete!.responseSchema) {
              responseData =
                config.batchDelete!.responseSchema!.parse(responseData);
            }
            const extracted = config.batchDelete!.extract!(responseData) ?? [];
            confirmations.push(
              ...extracted.map((result) => ({
                changeId: String(result.changeId),
                externalId: String(result.externalId),
                externalUpdatedAt:
                  result.externalUpdatedAt === undefined ||
                  result.externalUpdatedAt === null
                    ? null
                    : String(result.externalUpdatedAt),
              }))
            );
          }
        }

        return confirmations;
      };
    }

    this.modelConnectors.set(modelName, connector);
    return this;
  }

  withModelConnector<const M extends ExtractModels<TCollection>>(
    modelName: M,
    configBuilder: (
      builder: SyncModelConnectorBuilder<
        InferModelDataFromCollection<TCollection, M>
      >
    ) => SyncModelConnectorBuilder<InferModelDataFromCollection<TCollection, M>>
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
      InferModelDataFromCollection<TCollection, M>
    >();
    const configuredBuilder = configBuilder(builder);
    const config = configuredBuilder.build();

    // Reduce type computation depth by casting here
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

  /**
   * Enable or disable async writes (enabled by default)
   * When enabled, batch operations use async HTTP requests with polling
   */
  withAsyncWrites(enabled: boolean = true): this {
    this.useAsyncWrites = enabled;
    return this;
  }

  /**
   * Use synchronous writes (convenience method)
   */
  withSyncWrites(): this {
    return this.withAsyncWrites(false);
  }

  build(): SyncConnector<TRestConnector, TCollection> {
    return new SyncConnector(
      this.restConnector,
      this.collection,
      this.modelConnectors,
      this.useAsyncWrites
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
      ? (args: {
          response: z.infer<TSchema>;
          cursor?: string;
          page?: number;
          offset?: number;
          limit?: number;
          syncType: "FULL" | "INCREMENTAL";
        }) => {
          cursor?: string | null;
          page?: number | null;
          offset?: number | null;
          hasMore: boolean;
        }
      : (args: {
          response: unknown;
          cursor?: string;
          page?: number;
          offset?: number;
          limit?: number;
          syncType: "FULL" | "INCREMENTAL";
        }) => {
          cursor?: string | null;
          page?: number | null;
          offset?: number | null;
          hasMore: boolean;
        };
    transform?: TSchema extends z.ZodType<any>
      ? (response: z.infer<TSchema>) => Array<SyncObject<T>>
      : (response: unknown) => Array<SyncObject<T>>;
    filter?: (args: ListFilterArgs<T>) => boolean;
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
    /** Optionally transform the user-provided data before sending the request */
    transformRequest?: (data: T) => any;
    /** Optionally transform the raw or validated response into the final model */
    transform?: TSchema extends z.ZodType<any>
      ? (response: z.infer<TSchema>) => T
      : (response: unknown) => T;
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
    /** Optionally transform the user-provided partial data before sending the request */
    transformRequest?: (data: Partial<T>) => any;
    /** Optionally transform the raw or validated response into the final model */
    transform?: TSchema extends z.ZodType<any>
      ? (response: z.infer<TSchema>) => T
      : (response: unknown) => T;
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

  withBatchCreate<
    TSchema extends z.ZodType<any> | undefined = undefined
  >(config: {
    request: (changes: Array<BatchCreateChange<T>>) => {
      endpoint: string;
      method?: "POST" | "PUT";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BatchConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    this.config.batchCreate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as unknown as BatchCreateOperationConfig<T>;
    return this;
  }

  withBatchUpdate<
    TSchema extends z.ZodType<any> | undefined = undefined
  >(config: {
    request: (changes: Array<BatchUpdateChange<T>>) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BatchConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    this.config.batchUpdate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as unknown as BatchUpdateOperationConfig<T>;
    return this;
  }

  withBatchDelete<
    TSchema extends z.ZodType<any> | undefined = undefined
  >(config: {
    request: (changes: Array<BatchDeleteChange>) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BatchConfirmation>;
    batchSize?: number;
    payloadType?: "ids" | "changes";
  }): this {
    this.config.batchDelete = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as unknown as BatchDeleteOperationConfig;
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
    pagination?: (response: z.infer<TSchema>) => {
      cursor?: string | null;
      page?: number | null;
      offset?: number | null;
      hasMore: boolean;
    };
    transform?: (response: z.infer<TSchema>) => Array<SyncObject<T>>;
    filter?: (args: ListFilterArgs<T>) => boolean;
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

  batchCreate(config: BatchCreateOperationConfig<T>): this {
    this.config.batchCreate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as BatchCreateOperationConfig<T>;
    return this;
  }

  withBatchCreate<
    TSchema extends z.ZodType<any> | undefined = undefined
  >(config: {
    request: (changes: Array<BatchCreateChange<T>>) => {
      endpoint: string;
      method?: "POST" | "PUT";
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BatchConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    return this.batchCreate(config as unknown as BatchCreateOperationConfig<T>);
  }

  batchUpdate(config: BatchUpdateOperationConfig<T>): this {
    this.config.batchUpdate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as BatchUpdateOperationConfig<T>;
    return this;
  }

  withBatchUpdate<
    TSchema extends z.ZodType<any> | undefined = undefined
  >(config: {
    request: (changes: Array<BatchUpdateChange<T>>) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BatchConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    return this.batchUpdate(config as unknown as BatchUpdateOperationConfig<T>);
  }

  batchDelete(config: BatchDeleteOperationConfig): this {
    this.config.batchDelete = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as BatchDeleteOperationConfig;
    return this;
  }

  withBatchDelete<
    TSchema extends z.ZodType<any> | undefined = undefined
  >(config: {
    request: (changes: Array<BatchDeleteChange>) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BatchConfirmation>;
    batchSize?: number;
    payloadType?: "ids" | "changes";
  }): this {
    return this.batchDelete(config as unknown as BatchDeleteOperationConfig);
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
  private useAsyncWrites: boolean;

  constructor(
    restConnector: TRestConnector,
    collection: TCollection,
    modelConnectors: Map<string, ModelConnector>,
    useAsyncWrites: boolean = true
  ) {
    this.restConnector = restConnector;
    this.collection = collection;
    this.modelConnectors = modelConnectors;
    this.useAsyncWrites = useAsyncWrites;
  }

  /**
   * Process batch create operations asynchronously
   * Uses regular http-request endpoint with async flag since the API supports batch operations
   */
  private async processBatchCreateAsync(
    connector: ModelConnector,
    changes: Array<any>,
    modelName: string,
    processor: ChangeProcessor
  ): Promise<void> {
    const batchSize = connector.config.batchCreate?.batchSize || 100;
    const payloadType =
      connector.config.batchCreate?.payloadType ??
      (connector.config.batchCreate?.extract ? "changes" : "items");

    console.info(
      `Processing ${changes.length} CREATE changes for model ${modelName} (native batch API)`
    );

    for (let i = 0; i < changes.length; i += batchSize) {
      const batch = changes.slice(i, i + batchSize);
      const formattedBatch = payloadType === "changes"
        ? batch.map((change: any) => ({
            ...change,
            data: change.data ?? change.obj ?? change.payload ?? null,
            obj: change.obj ?? change.data ?? change.payload ?? null,
          }))
        : batch.map((c: any) => c.data);

      const requestConfig = connector.config.batchCreate!.request(formattedBatch);

      // Track all changes in this batch
      const batchExtractFn = connector.config.batchCreate?.extract;
      

      // For batch operations with async, pass changeIds at top level
      const requestBody: any = {
        method: requestConfig.method || "POST",
        url: requestConfig.endpoint,
        json: requestConfig.json ?? requestConfig.data ?? formattedBatch,
        async: true,
        changeIds: batch.map(c => c.changeId),
      };
      const response = await this.restConnector.request(requestBody);
      
      console.debug(
        `Batch CREATE response:`,
        {
          hasHttpRequestId: !!response.httpRequestId,
          httpRequestId: response.httpRequestId,
          responseKeys: Object.keys(response),
          hasBatchExtractFn: !!batchExtractFn,
          changeIds: batch.map(c => c.changeId)
        }
      );
      
      // If we have a batch extract function and got a httpRequestId, register it
      if (batchExtractFn && response.httpRequestId) {
        processor.registerBatchExtractFunction(response.httpRequestId, batchExtractFn);
      } else if (batchExtractFn && !response.httpRequestId) {
        console.warn(
          `Batch CREATE request completed but no httpRequestId returned. Cannot register extract function.`
        );
      }

      console.info(
        `Sent batch CREATE request for ${batch.length} items to ${requestConfig.endpoint}`
      );
    }
  }

  /**
   * Process batch update operations asynchronously
   * Uses regular http-request endpoint with async flag since the API supports batch operations
   */
  private async processBatchUpdateAsync(
    connector: ModelConnector,
    changes: Array<any>,
    modelName: string,
    processor: ChangeProcessor
  ): Promise<void> {
    const batchSize = connector.config.batchUpdate?.batchSize || 100;
    const payloadType =
      connector.config.batchUpdate?.payloadType ??
      (connector.config.batchUpdate?.extract ? "changes" : "items");

    console.info(
      `Processing ${changes.length} UPDATE changes for model ${modelName} (native batch API)`
    );

    for (let i = 0; i < changes.length; i += batchSize) {
      const batch = changes.slice(i, i + batchSize);
      const formattedBatch = payloadType === "changes"
        ? batch.map((change: any) => ({
            ...change,
            externalId: String(change.externalId ?? change.id),
            id: change.id ?? change.externalId,
            data: change.data ?? change.obj ?? {},
            obj: change.obj ?? change.data ?? {},
          }))
        : batch.map((c: any) => ({ id: c.externalId, data: c.data }));

      const requestConfig = connector.config.batchUpdate!.request(formattedBatch);

      // Track the batch extract function if provided
      const batchExtractFn = connector.config.batchUpdate?.extract;

      // Send single async request for the entire batch
      const requestBody: any = {
        method: requestConfig.method || "PUT",
        url: requestConfig.endpoint,
        json: requestConfig.json ?? requestConfig.data ?? formattedBatch,
        async: true,
        changeIds: batch.map(c => c.changeId),
      };
      const response = await this.restConnector.request(requestBody);
      
      console.debug(
        `Batch UPDATE response:`,
        {
          hasHttpRequestId: !!response.httpRequestId,
          httpRequestId: response.httpRequestId,
          responseKeys: Object.keys(response),
          hasBatchExtractFn: !!batchExtractFn,
          changeIds: batch.map(c => c.changeId)
        }
      );
      
      // If we have a batch extract function and got a httpRequestId, register it
      if (batchExtractFn && response.httpRequestId) {
        processor.registerBatchExtractFunction(response.httpRequestId, batchExtractFn);
      } else if (batchExtractFn && !response.httpRequestId) {
        console.warn(
          `Batch UPDATE request completed but no httpRequestId returned. Cannot register extract function.`
        );
      }

      console.info(
        `Sent batch UPDATE request for ${batch.length} items to ${requestConfig.endpoint}`
      );
    }
  }

  /**
   * Process batch delete operations asynchronously
   * Uses regular http-request endpoint with async flag since the API supports batch operations
   */
  private async processBatchDeleteAsync(
    connector: ModelConnector,
    changes: Array<any>,
    modelName: string,
    processor: ChangeProcessor
  ): Promise<void> {
    const batchSize = connector.config.batchDelete?.batchSize || 100;
    const payloadType =
      connector.config.batchDelete?.payloadType ??
      (connector.config.batchDelete?.extract ? "changes" : "ids");

    console.info(
      `Processing ${changes.length} DELETE changes for model ${modelName} (native batch API)`
    );

    for (let i = 0; i < changes.length; i += batchSize) {
      const batch = changes.slice(i, i + batchSize);
      const formattedBatch = payloadType === "changes"
        ? batch.map((change: any) => ({
            ...change,
            externalId: String(change.externalId ?? change.id),
            id: change.id ?? change.externalId,
          }))
        : batch.map((c: any) => ({
            changeId: c.changeId,
            externalId: String(c.externalId),
          }));

      const requestConfig = connector.config.batchDelete!.request(formattedBatch);

      // Track the batch extract function if provided
      const batchExtractFn = connector.config.batchDelete?.extract;

      // Send single async request for the entire batch
      const requestBody: any = {
        method: requestConfig.method || "DELETE",
        url: requestConfig.endpoint,
        json: requestConfig.json ?? requestConfig.data ?? formattedBatch,
        async: true,
        changeIds: batch.map(c => c.changeId),
      };
      const response = await this.restConnector.request(requestBody);
      
      console.debug(
        `Batch DELETE response:`,
        {
          hasHttpRequestId: !!response.httpRequestId,
          httpRequestId: response.httpRequestId,
          responseKeys: Object.keys(response),
          hasBatchExtractFn: !!batchExtractFn,
          changeIds: batch.map(c => c.changeId)
        }
      );
      
      // If we have a batch extract function and got a httpRequestId, register it
      if (batchExtractFn && response.httpRequestId) {
        processor.registerBatchExtractFunction(response.httpRequestId, batchExtractFn);
      } else if (batchExtractFn && !response.httpRequestId) {
        console.warn(
          `Batch DELETE request completed but no httpRequestId returned. Cannot register extract function.`
        );
      }

      console.info(
        `Sent batch DELETE request for ${batch.length} items to ${requestConfig.endpoint}`
      );
    }
  }

  /**
   * Process individual create/update/delete operations asynchronously using batch endpoint
   * This simulates batch behavior for APIs that don't have native batch support
   */
  private async processIndividualChangesAsync(
    connector: ModelConnector,
    delta: any,
    modelName: string,
    processor: ChangeProcessor
  ): Promise<void> {
    if (delta.operation === "CREATE" && connector.create) {
      console.info(
        `Processing ${delta.changes.length} CREATE changes for model ${modelName} (individual requests via batch endpoint)`
      );
      
      const requests = delta.changes.map((change: any) => {
        const requestConfig = connector.config.create!.request(change.data);

        return {
          method: requestConfig.method || "POST",
          url: requestConfig.endpoint,
          json: requestConfig.json ?? requestConfig.data ?? change.data,
          changeId: change.changeId,
        };
      });

      // Send all requests in parallel using batch endpoint
      await this.restConnector.batchRequest({
        requests,
        syncId: processor.getSyncId(),
      });
      
      console.info(
        `Sent ${requests.length} parallel CREATE requests for model ${modelName}`
      );
    } else if (delta.operation === "UPDATE" && connector.update) {
      console.info(
        `Processing ${delta.changes.length} UPDATE changes for model ${modelName} (individual requests via batch endpoint)`
      );
      
      const requests = delta.changes.map((change: any) => {
        const requestConfig = connector.config.update!.request(change.externalId, change.data);

        return {
          method: requestConfig.method || "PUT",
          url: requestConfig.endpoint,
          json: requestConfig.json ?? requestConfig.data ?? change.data,
          changeId: change.changeId,
        };
      });

      // Send all requests in parallel using batch endpoint
      await this.restConnector.batchRequest({
        requests,
        syncId: processor.getSyncId(),
      });
      
      console.info(
        `Sent ${requests.length} parallel UPDATE requests for model ${modelName}`
      );
    } else if (delta.operation === "DELETE" && connector.delete) {
      console.info(
        `Processing ${delta.changes.length} DELETE changes for model ${modelName} (individual requests via batch endpoint)`
      );
      
      const requests = delta.changes.map((change: any) => {
        const requestConfig = connector.config.delete!.request(change.externalId);

        return {
          method: requestConfig.method || "DELETE",
          url: requestConfig.endpoint,
          json: requestConfig.json ?? requestConfig.data,
          changeId: change.changeId,
        };
      });

      // Send all requests in parallel using batch endpoint
      await this.restConnector.batchRequest({
        requests,
        syncId: processor.getSyncId(),
      });
      
      console.info(
        `Sent ${requests.length} parallel DELETE requests for model ${modelName}`
      );
    }
  }

  /**
   * Process changes synchronously (fallback when async is disabled)
   */
  private async processSyncChanges(
    connector: ModelConnector,
    delta: any,
    modelName: string,
    syncId: string
  ): Promise<void> {
    if (delta.operation === "CREATE" && connector.create) {
      console.info(
        `Creating ${delta.changes.length} items for model ${modelName} (non-batch)`
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
                externalUpdatedAt: ((created as any).updatedAt ?? null) as any,
              }
        ) as any;
        confirmations.push({
          changeId: change.changeId,
          externalId: String(extracted.externalId ?? (created as any).id),
          externalUpdatedAt: extracted.externalUpdatedAt ?? null,
        });
      }
      await confirmChangeBatch({
        syncId,
        changes: confirmations,
        async: false,
      });
    } else if (delta.operation === "UPDATE" && connector.update) {
      console.info(
        `Updating ${delta.changes.length} items for model ${modelName} (non-batch)`
      );
      const confirmations: Array<{
        changeId: string;
        externalId: string;
        externalUpdatedAt: string | null;
      }> = [];
      for (const change of delta.changes) {
        const updated = await connector.update(change.externalId, change.data);
        const extracted = (
          connector.config.update?.extract
            ? connector.config.update.extract(updated)
            : {
                externalId: change.externalId,
                externalUpdatedAt: ((updated as any).updatedAt ?? null) as any,
              }
        ) as any;
        confirmations.push({
          changeId: change.changeId,
          externalId: String(extracted.externalId ?? change.externalId),
          externalUpdatedAt: extracted.externalUpdatedAt ?? null,
        });
      }
      await confirmChangeBatch({
        syncId,
        changes: confirmations,
        async: false,
      });
    } else if (delta.operation === "DELETE" && connector.delete) {
      console.info(
        `Deleting ${delta.changes.length} items for model ${modelName} (non-batch)`
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
        async: false,
      });
    }
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

  /**
   * Sync implementation with async writes for batch operations
   */
  private async syncWithAsyncWrites(
    type?: "FULL" | "INCREMENTAL"
  ): Promise<void> {
    let changeProcessor: ChangeProcessor | null = null;

    try {
      // Test/offline mode: perform a local sync without platform API calls
      try {
        if (process?.env?.NODE_ENV === "test") {
          for (const model of this.collection.models) {
            const connector = this.modelConnectors.get(model.name);
            if (!connector?.list) continue;
            const { items } = await connector.list({
              syncType: type || "FULL",
            });
            console.log(
              `Synced ${items?.length ?? 0} items for model ${model.name}`
            );
          }
          return;
        }
      } catch {}

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
          type,
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

      // Initialize ChangeProcessor with syncId
      changeProcessor = new ChangeProcessor(syncId);

      // Require managed user for sync execution
      if (!managedUserId) {
        throw new Error("Missing managedUserId in context");
      }

      // Reset time budget for this run
      resetTimeLimit();

      // Start polling for async changes
      changeProcessor.startPolling(2000);

      // Determine models to sync from platform
      const collectionName = this.collection.name;
      const orderedModels = await getModels({ collectionName });
      let modelsToSync = orderedModels.map((m: any) => m.name);

      const sync = await getSync({ syncId });
      console.log("sync", sync);

      const currentModelName: string | undefined =
        sync.currentModel?.name ?? undefined;
      if (currentModelName) {
        const idx = modelsToSync.indexOf(currentModelName);
        if (idx >= 0) modelsToSync = modelsToSync.slice(idx);
      }

      let hadError = false;
      let errorMessage: string | undefined = undefined;
      let unrecoverableError = false;
      let canceledByServer = false;

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
          if (!connector) continue;

          await updateSync({ syncId, currentModelName: modelName });

          // Load latest sync state before starting model
          let state = await getSync({ syncId });
          const requestedDirection: "pull" | "push" | "bidirectional" =
            (state.requestedDirection as any) || "bidirectional";
          let currentDirection: "PULL" | "PUSH" | null =
            state.currentDirection ?? null;

          // PULL phase remains synchronous
          if (
            (requestedDirection === "pull" ||
              requestedDirection === "bidirectional") &&
            currentDirection !== "PUSH"
          ) {
            await updateSync({ syncId, currentDirection: "PULL" });
            console.info(`PULL phase started for model ${modelName}`);

            // ... existing PULL logic remains unchanged ...
            const listFn = connector.list;
            if (listFn) {
              let hasMore: boolean = true;
              let cursor: string | undefined =
                state.modelStatuses?.[modelName]?.cursor;
              let page: number | undefined =
                state.modelStatuses?.[modelName]?.page;
              let offset: number | undefined =
                state.modelStatuses?.[modelName]?.offset;
              let lastExternalId: string | undefined =
                state.modelStatuses?.[modelName]?.lastExternalId;
              let lastExternalUpdatedAt: string | undefined =
                state.modelStatuses?.[modelName]?.lastExternalUpdatedAt;
              const syncType = state.type || "FULL";

              while (hasMore) {
                if (isTimeLimitExceeded()) {
                  await pauseSync(syncId);
                  throw "RERUN";
                }

                const params: any = {
                  cursor,
                  page,
                  offset,
                  lastExternalId,
                  lastExternalUpdatedAt,
                  syncType,
                };

                const { items, pagination } = await listFn(params);
                console.info(
                  `Fetched ${items?.length ?? 0} items for model ${modelName}`
                );

                if (!items || items.length === 0) {
                  break;
                }

                const objects = items.map((it) => ({
                  externalId: String(it.externalId),
                  externalUpdatedAt: it.externalUpdatedAt
                    ? String(it.externalUpdatedAt)
                    : null,
                  data: it.data,
                }));

                await upsertObjectBatch({
                  collectionName,
                  syncId,
                  modelName,
                  app,
                  customApp,
                  objects,
                  cursor: pagination?.cursor,
                  page: pagination?.page,
                  offset: pagination?.offset,
                  async: true,
                });

                const last = objects[objects.length - 1];
                lastExternalId = last.externalId;
                lastExternalUpdatedAt = last.externalUpdatedAt || undefined;
                cursor = pagination?.cursor;
                page = pagination?.page;
                offset = pagination?.offset;
                hasMore = !!pagination?.hasMore;
              }
            }
          }

          // PUSH phase with async HTTP
          if (
            requestedDirection === "push" ||
            requestedDirection === "bidirectional"
          ) {
            await updateSync({ syncId, currentDirection: "PUSH" });
            console.info(`PUSH phase started for model ${modelName}`);

            while (true) {
              if (isTimeLimitExceeded()) {
                // Wait for pending changes before pausing
                await changeProcessor.waitForPendingChanges(10000);
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

              // Process changes with async HTTP
              if (connector.batchCreate && delta.operation === "CREATE") {
                await this.processBatchCreateAsync(
                  connector,
                  delta.changes,
                  modelName,
                  changeProcessor
                );
              } else if (
                connector.batchUpdate &&
                delta.operation === "UPDATE"
              ) {
                await this.processBatchUpdateAsync(
                  connector,
                  delta.changes,
                  modelName,
                  changeProcessor
                );
              } else if (
                connector.batchDelete &&
                delta.operation === "DELETE"
              ) {
                await this.processBatchDeleteAsync(
                  connector,
                  delta.changes,
                  modelName,
                  changeProcessor
                );
              } else {
                // Process individual operations asynchronously
                await this.processIndividualChangesAsync(
                  connector,
                  delta,
                  modelName,
                  changeProcessor
                );
              }
            }
          }

          // Clear direction after model finishes
          await updateSync({ syncId, currentDirection: null });
        }

        // Wait for all pending async operations
        console.info("Waiting for pending async operations to complete...");
        await changeProcessor.waitForPendingChanges(60000);
      } catch (e: any) {
        if (e === "RERUN") throw e;
        if (e === "SKIPPED") {
          console.warn(
            "Sync start was skipped by server policy; exiting cleanly"
          );
          return;
        }

        let status: number | undefined = undefined;
        if (e && typeof e === "object") {
          if (typeof (e as any).status === "number") {
            status = (e as any).status as number;
          } else if (
            (e as any).response &&
            typeof (e as any).response.status === "number"
          ) {
            status = (e as any).response.status as number;
          }
        }

        if (status === 409) {
          canceledByServer = true;
          hadError = true;
          errorMessage = e instanceof Error ? e.message : String(e);
          unrecoverableError = isUnrecoverableSyncError(e);
          console.error(`Sync encountered an error:`, e);
        } else {
          hadError = true;
          errorMessage = e instanceof Error ? e.message : String(e);
          unrecoverableError = isUnrecoverableSyncError(e);
          console.error(`Sync encountered an error:`, e);
        }
      } finally {
        if (changeProcessor) {
          changeProcessor.stopPolling();
        }
      }

      // Finish the sync
      if (!canceledByServer) {
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
          hadError = true;
          errorMessage =
            (e instanceof Error ? e.message : String(e)) ||
            errorMessage ||
            "Failed to finish sync";
        }
      }

      if (hadError) {
        throw new Error(errorMessage || "Sync failed");
      }
    } finally {
      if (changeProcessor) {
        changeProcessor.stopPolling();
      }
    }
  }

  async sync(
    type?: "FULL" | "INCREMENTAL",
    options?: { useAsyncWrites?: boolean }
  ): Promise<void> {
    // Priority order:
    // 1. Options parameter (if provided)
    // 2. Instance configuration (from builder)
    // 3. Environment variable override (can force disable)
    let useAsync = options?.useAsyncWrites;

    if (useAsync === undefined) {
      // Check environment variable for forced disable
      if (
        process.env.LIGHTYEAR_ASYNC_WRITES === "false" ||
        process.env.LIGHTYEAR_ASYNC_WRITES === "0"
      ) {
        useAsync = false;
      } else {
        // Use instance configuration (defaults to true)
        useAsync = this.useAsyncWrites;
      }
    }

    if (useAsync) {
      console.info("Using async writes for batch operations");
      return this.syncWithAsyncWrites(type);
    }

    console.info("Using synchronous writes for batch operations");
    return this.syncLegacy(type);
  }

  private async syncLegacy(type?: "FULL" | "INCREMENTAL"): Promise<void> {
    // Test/offline mode: perform a local sync without platform API calls
    try {
      if (process?.env?.NODE_ENV === "test") {
        for (const model of this.collection.models) {
          const connector = this.modelConnectors.get(model.name);
          if (!connector?.list) continue;
          const { items } = await connector.list({ syncType: type || "FULL" });
          console.log(
            `Synced ${items?.length ?? 0} items for model ${model.name}`
          );
        }
        return;
      }
    } catch {}

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
        type,
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
    console.log("sync", sync);
    // Log current model and pagination state at the moment the sync starts/resumes
    try {
      const currentModel = sync?.currentModel?.name ?? "none";
      const modelStatus =
        (sync as any)?.modelStatuses?.[
          (sync as any)?.currentModel?.name as any
        ] ?? undefined;
      const initialCursor =
        modelStatus?.cursor ?? (sync as any)?.lastBatch?.cursor ?? null;
      const initialPage =
        (typeof modelStatus?.page === "number" ? modelStatus.page : null) ??
        (typeof (sync as any)?.page === "number" ? (sync as any).page : null);
      const initialOffset =
        (typeof modelStatus?.offset === "number" ? modelStatus.offset : null) ??
        (typeof (sync as any)?.offset === "number"
          ? (sync as any).offset
          : null);
      console.info(
        `Sync start state → collection=${collectionName} sync=${syncId} currentModel=${currentModel} cursor=${
          initialCursor ?? "none"
        } page=${initialPage ?? "none"} offset=${initialOffset ?? "none"}`
      );
    } catch {}

    const currentModelName: string | undefined =
      sync.currentModel?.name ?? undefined;
    if (currentModelName) {
      const idx = modelsToSync.indexOf(currentModelName);
      if (idx >= 0) modelsToSync = modelsToSync.slice(idx);
    }

    let hadError = false;
    let errorMessage: string | undefined = undefined;
    let unrecoverableError = false;
    let canceledByServer = false; // 409 Conflict → sync canceled: log but don't fail run

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
        let cursor: string | undefined;
        if (
          state.lastBatch?.modelName === modelName &&
          state.lastBatch?.cursor
        ) {
          cursor = state.lastBatch.cursor;
        } else if (state.modelStatuses?.[modelName]?.cursor) {
          cursor = state.modelStatuses[modelName].cursor;
        }
        let lastExternalId: string | undefined =
          state.modelStatuses?.[modelName]?.lastExternalId ?? undefined;
        let lastExternalUpdatedAt: string | undefined =
          state.modelStatuses?.[modelName]?.lastExternalUpdatedAt ?? undefined;
        const syncType: "FULL" | "INCREMENTAL" = state.type || "FULL";
        // Determine page/offset using model-specific status when available
        let page: number | undefined =
          typeof state.modelStatuses?.[modelName]?.page === "number"
            ? state.modelStatuses[modelName].page
            : typeof state.page === "number"
            ? state.page
            : undefined;
        let offset: number | undefined =
          typeof state.modelStatuses?.[modelName]?.offset === "number"
            ? state.modelStatuses[modelName].offset
            : typeof state.offset === "number"
            ? state.offset
            : undefined;

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
            let hasMore: boolean = true;
            while (hasMore) {
              if (isTimeLimitExceeded()) {
                await pauseSync(syncId);
                throw "RERUN";
              }

              // Build params with pagination + watermarks
              const params: any = {};
              if (cursor) params.cursor = cursor;
              if (typeof page === "number") params.page = page;
              if (typeof offset === "number") params.offset = offset;
              if (lastExternalId) params.lastExternalId = lastExternalId;
              if (lastExternalUpdatedAt)
                params.lastExternalUpdatedAt = lastExternalUpdatedAt;
              params.syncType = syncType;

              const { items, pagination } = await listFn(params);
              console.info(
                `Fetched ${
                  items?.length ?? 0
                } items for model ${modelName} (cursor=${
                  pagination?.cursor ?? "none"
                } page=${pagination?.page ?? "-"} offset=${
                  pagination?.offset ?? "-"
                } hasMore=${pagination?.hasMore ?? false})`
              );

              if (!items || items.length === 0) {
                console.info(
                  `No more items for model ${modelName}; ending pull page`
                );
                break; // no data
              }

              // Items are already in platform-ready shape from transform
              const objects = items.map((it) => ({
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
                  pagination?.cursor ?? "none"
                })`
              );
              await upsertObjectBatch({
                collectionName,
                syncId,
                modelName,
                app,
                customApp,
                objects,
                cursor: pagination?.cursor,
                page:
                  typeof pagination?.page === "number"
                    ? pagination.page
                    : undefined,
                offset:
                  typeof pagination?.offset === "number"
                    ? pagination.offset
                    : undefined,
                async: true,
              });
              console.info(
                `Queued ${objects.length} upserts for model ${modelName}`
              );

              // advance watermarks
              const last = objects[objects.length - 1];
              lastExternalId = last.externalId;
              lastExternalUpdatedAt = last.externalUpdatedAt || undefined;
              cursor = pagination?.cursor;
              if (typeof pagination?.page === "number") page = pagination.page;
              if (typeof pagination?.offset === "number")
                offset = pagination.offset;
              hasMore = !!pagination?.hasMore;
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

            if (connector.batchCreate && delta.operation === "CREATE") {
              console.info(
                `Creating ${delta.changes.length} items for model ${modelName} (batch)`
              );
              const payloadType =
                connector.config.batchCreate?.payloadType ??
                (connector.config.batchCreate?.extract ? "changes" : "items");
              const batchInput =
                payloadType === "changes"
                  ? delta.changes.map((change: any) => {
                      const payload =
                        change.data ?? change.obj ?? change.payload ?? null;
                      return {
                        ...change,
                        data: payload,
                        obj: change.obj ?? payload,
                      };
                    })
                  : delta.changes.map((c: any) => c.data);

              const created = await connector.batchCreate(batchInput as any);

              let changesToConfirm: Array<{
                changeId: string;
                externalId: string;
                externalUpdatedAt: string | null;
              }> = [];

              const looksLikeConfirmations =
                Array.isArray(created) &&
                created.length > 0 &&
                created.every(
                  (item: any) =>
                    item &&
                    typeof item === "object" &&
                    "changeId" in item &&
                    ("externalId" in item || "externalUpdatedAt" in item)
                );

              if (looksLikeConfirmations) {
                const changeById = new Map(
                  delta.changes.map((change: any) => [change.changeId, change])
                );
                changesToConfirm = (created as any).map((item: any) => {
                  const change = changeById.get(String(item.changeId));
                  const externalIdCandidate =
                    item.externalId ??
                    change?.externalId ??
                    change?.data?.id ??
                    change?.data?.externalId;
                  if (
                    externalIdCandidate === undefined ||
                    externalIdCandidate === null
                  ) {
                    throw new Error(
                      `Batch create extract did not provide externalId for change ${item.changeId}`
                    );
                  }
                  return {
                    changeId: String(item.changeId),
                    externalId: String(externalIdCandidate),
                    externalUpdatedAt:
                      item.externalUpdatedAt === undefined ||
                      item.externalUpdatedAt === null
                        ? null
                        : String(item.externalUpdatedAt),
                  };
                });
              } else {
                const createdArray = Array.isArray(created) ? created : [];
                changesToConfirm = createdArray.map((item: any, i: number) => {
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
              }

              try {
                console.debug(
                  `Confirming ${changesToConfirm.length} CREATE (batch) changes for model ${modelName}:`,
                  changesToConfirm.map((c) => ({
                    changeId: c.changeId,
                    externalId: c.externalId,
                    externalUpdatedAt: c.externalUpdatedAt,
                  }))
                );
              } catch {}
              await confirmChangeBatch({
                syncId,
                changes: changesToConfirm,
                async: true,
              });
              console.info(
                `Confirmed ${changesToConfirm.length} CREATE changes for model ${modelName}`
              );
            } else if (connector.batchUpdate && delta.operation === "UPDATE") {
              console.info(
                `Updating ${delta.changes.length} items for model ${modelName} (batch)`
              );
              const payloadType =
                connector.config.batchUpdate?.payloadType ??
                (connector.config.batchUpdate?.extract ? "changes" : "items");
              const batchInput =
                payloadType === "changes"
                  ? delta.changes.map((change: any) => {
                      const payload =
                        change.data ?? change.obj ?? change.payload ?? {};
                      const externalId = String(change.externalId ?? change.id);
                      return {
                        ...change,
                        externalId,
                        id: change.id ?? externalId,
                        data: payload,
                        obj: change.obj ?? payload,
                      } as BatchUpdateChange<any>;
                    })
                  : delta.changes.map((c: any) => ({
                      id: c.externalId,
                      data: c.data,
                    }));
              const updated = await connector.batchUpdate(batchInput as any);

              let changesToConfirm: Array<{
                changeId: string;
                externalId: string;
                externalUpdatedAt: string | null;
              }> = [];

              const looksLikeConfirmations =
                Array.isArray(updated) &&
                updated.length > 0 &&
                updated.every(
                  (item: any) =>
                    item &&
                    typeof item === "object" &&
                    "changeId" in item &&
                    ("externalId" in item || "externalUpdatedAt" in item)
                );

              if (looksLikeConfirmations) {
                const changeById = new Map(
                  delta.changes.map((change: any) => [change.changeId, change])
                );
                changesToConfirm = (updated as any).map((item: any) => {
                  const change = changeById.get(String(item.changeId));
                  const externalIdCandidate =
                    item.externalId ??
                    change?.externalId ??
                    change?.data?.id ??
                    change?.data?.externalId;
                  if (
                    externalIdCandidate === undefined ||
                    externalIdCandidate === null
                  ) {
                    throw new Error(
                      `Batch update extract did not provide externalId for change ${item.changeId}`
                    );
                  }
                  return {
                    changeId: String(item.changeId),
                    externalId: String(externalIdCandidate),
                    externalUpdatedAt:
                      item.externalUpdatedAt === undefined ||
                      item.externalUpdatedAt === null
                        ? null
                        : String(item.externalUpdatedAt),
                  };
                });
              } else {
                const updatedArray = Array.isArray(updated) ? updated : [];
                changesToConfirm = updatedArray.map((item: any, i: number) => {
                  const change = delta.changes[i];
                  const extracted = (
                    connector.config.update?.extract
                      ? connector.config.update.extract(item)
                      : {
                          externalId: change.externalId,
                          externalUpdatedAt: (item?.updatedAt ?? null) as any,
                        }
                  ) as any;
                  return {
                    changeId: change.changeId,
                    externalId: String(
                      extracted.externalId ?? change.externalId
                    ),
                    externalUpdatedAt: extracted.externalUpdatedAt ?? null,
                  };
                });
              }

              try {
                console.debug(
                  `Confirming ${changesToConfirm.length} UPDATE (batch) changes for model ${modelName}:`,
                  changesToConfirm.map((c) => ({
                    changeId: c.changeId,
                    externalId: c.externalId,
                    externalUpdatedAt: c.externalUpdatedAt,
                  }))
                );
              } catch {}
              await confirmChangeBatch({
                syncId,
                changes: changesToConfirm,
                async: true,
              });
              console.info(
                `Confirmed ${changesToConfirm.length} UPDATE changes for model ${modelName}`
              );
            } else if (connector.batchDelete && delta.operation === "DELETE") {
              console.info(
                `Deleting ${delta.changes.length} items for model ${modelName} (batch)`
              );
              const payloadType =
                connector.config.batchDelete?.payloadType ??
                (connector.config.batchDelete?.extract ? "changes" : "ids");
              const batchInput =
                payloadType === "changes"
                  ? delta.changes.map((change: any) => ({
                      ...change,
                      externalId: String(change.externalId ?? change.id),
                      id: change.id ?? change.externalId,
                    }))
                  : delta.changes.map((c: any) => ({
                      changeId: c.changeId,
                      externalId: String(c.externalId),
                    }));
              const deleted = await connector.batchDelete(batchInput as any);
              let changesToConfirm: Array<{
                changeId: string;
                externalId: string;
              }> = [];

              const looksLikeConfirmations =
                Array.isArray(deleted) &&
                deleted.length > 0 &&
                deleted.every(
                  (item: any) =>
                    item &&
                    typeof item === "object" &&
                    "changeId" in item &&
                    ("externalId" in item || "externalUpdatedAt" in item)
                );

              if (looksLikeConfirmations) {
                const changeById = new Map(
                  delta.changes.map((change: any) => [change.changeId, change])
                );
                changesToConfirm = (deleted as any).map((item: any) => {
                  const change = changeById.get(String(item.changeId));
                  const externalIdCandidate =
                    item.externalId ?? change?.externalId ?? change?.id;
                  if (
                    externalIdCandidate === undefined ||
                    externalIdCandidate === null
                  ) {
                    throw new Error(
                      `Batch delete extract did not provide externalId for change ${item.changeId}`
                    );
                  }
                  return {
                    changeId: String(item.changeId),
                    externalId: String(externalIdCandidate),
                  };
                });
              } else {
                changesToConfirm = delta.changes.map((c: any) => ({
                  changeId: c.changeId,
                  externalId: String(c.externalId),
                }));
              }

              await confirmChangeBatch({
                syncId,
                changes: changesToConfirm,
                async: true,
              });
              console.info(
                `Confirmed ${changesToConfirm.length} DELETE changes for model ${modelName}`
              );
            } else {
              // Fallback to non-batch
              if (delta.operation === "CREATE" && connector.create) {
                console.info(
                  `Creating ${delta.changes.length} items for model ${modelName} (non-batch)`
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
                  try {
                    console.debug(
                      `Confirming CREATE (non-batch) change for model ${modelName}:`,
                      {
                        changeId: change.changeId,
                        externalId: String(
                          extracted.externalId ?? (created as any).id
                        ),
                        externalUpdatedAt: extracted.externalUpdatedAt ?? null,
                      }
                    );
                  } catch {}
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
                  `Updating ${delta.changes.length} items for model ${modelName} (non-batch)`
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
                  try {
                    console.debug(
                      `Confirming UPDATE (non-batch) change for model ${modelName}:`,
                      {
                        changeId: change.changeId,
                        externalId: String(
                          extracted.externalId ?? change.externalId
                        ),
                        externalUpdatedAt: extracted.externalUpdatedAt ?? null,
                      }
                    );
                  } catch {}
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
                  `Deleting ${delta.changes.length} items for model ${modelName} (non-batch)`
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
      // Detect HTTP status if present on error
      let status: number | undefined = undefined;
      if (e && typeof e === "object") {
        if (typeof (e as any).status === "number") {
          status = (e as any).status as number;
        } else if (
          (e as any).response &&
          typeof (e as any).response.status === "number"
        ) {
          status = (e as any).response.status as number;
        }
      }

      // Treat 409 as a canceled sync: log error and finish gracefully without failing run
      if (status === 409) {
        canceledByServer = true;
        hadError = true; // preserve finishSync(error) semantics and logs
        errorMessage = e instanceof Error ? e.message : String(e);
        unrecoverableError = isUnrecoverableSyncError(e);
        console.error(`Sync encountered an error:`, e);
      } else {
        hadError = true;
        errorMessage = e instanceof Error ? e.message : String(e);
        unrecoverableError = isUnrecoverableSyncError(e);
        console.error(`Sync encountered an error:`, e);
      }
    }

    // Finish the sync unless the server has already canceled it (409)
    if (canceledByServer) {
      try {
        console.info(
          `Sync ${syncId} was canceled by server; skipping finishSync`
        );
      } catch {}
    } else {
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
  pagination?: (response: any) => {
    cursor?: string | null;
    page?: number | null;
    offset?: number | null;
    hasMore: boolean;
  };
  transform?: (response: TResponse) => Array<SyncObject<TModel>>;
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
