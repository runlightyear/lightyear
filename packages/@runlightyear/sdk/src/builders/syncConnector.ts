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

export interface BulkCreateChange<TModel = any> {
  changeId: string;
  data: TModel;
  obj: TModel;
  id?: string;
  [key: string]: any;
}

export interface BulkUpdateChange<TModel = any> {
  changeId: string;
  externalId: string;
  data: Partial<TModel>;
  obj: Partial<TModel>;
  id?: string;
  [key: string]: any;
}

export interface BulkDeleteChange {
  changeId: string;
  externalId: string;
  id?: string;
  [key: string]: any;
}

export interface BulkConfirmation {
  changeId: string;
  externalId: string;
  externalUpdatedAt?: string | null;
}

export type BulkCreateRequestItems<TModel> =
  | Array<TModel>
  | Array<BulkCreateChange<TModel>>;

type BulkCreateResponseItems<TModel> =
  | Array<TModel>
  | Array<BulkConfirmation>;

export type BulkUpdateRequestItems<TModel> = Array<BulkUpdateChange<TModel>>;

type BulkUpdateResponseItems<TModel> =
  | Array<TModel>
  | Array<BulkConfirmation>;

export type BulkDeleteRequestItems = Array<BulkDeleteChange>;

type BulkDeleteResponseItems = Array<BulkConfirmation>;

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

export interface BulkCreateOperationConfig<T = any> {
  request: (items: BulkCreateRequestItems<T>) => {
    endpoint: string;
    method?: "POST" | "PUT";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<any>;
  extract?: (response: any) => Array<BulkConfirmation>;
  payloadType?: "items" | "changes";
  batchSize?: number;
}

export interface BulkUpdateOperationConfig<T = any> {
  request: (items: BulkUpdateRequestItems<T>) => {
    endpoint: string;
    method?: "PUT" | "PATCH" | "POST";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<any>;
  extract?: (response: any) => Array<BulkConfirmation>;
  payloadType?: "items" | "changes";
  batchSize?: number;
}

export interface BulkDeleteOperationConfig {
  request: (items: BulkDeleteRequestItems) => {
    endpoint: string;
    method?: "DELETE" | "POST";
    /** @deprecated Use `json` for JSON payloads */
    data?: any;
    json?: any;
  };
  responseSchema?: z.ZodType<any>;
  extract?: (response: any) => Array<BulkConfirmation>;
  payloadType?: "ids" | "changes";
  batchSize?: number;
}

export interface ModelConnectorConfig<T = any> {
  list?: ListConfig<T, any>;
  create?: CreateConfig<T>;
  update?: UpdateConfig<T>;
  delete?: DeleteConfig;
  bulkCreate?: BulkCreateOperationConfig<T>;
  bulkUpdate?: BulkUpdateOperationConfig<T>;
  bulkDelete?: BulkDeleteOperationConfig;
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
  bulkCreate?: BulkCreateOperationConfig<TModel>;
  bulkUpdate?: BulkUpdateOperationConfig<TModel>;
  bulkDelete?: BulkDeleteOperationConfig;
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
  bulkCreate?: (
    items: BulkCreateRequestItems<T>
  ) => Promise<BulkCreateResponseItems<T>>;
  bulkUpdate?: (
    items: BulkUpdateRequestItems<T>
  ) => Promise<BulkUpdateResponseItems<T>>;
  bulkDelete?: (items: BulkDeleteRequestItems) => Promise<BulkDeleteResponseItems>;
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
          if (cfg.bulkCreate) bb.bulkCreate(cfg.bulkCreate as any);
          if (cfg.bulkUpdate) bb.bulkUpdate(cfg.bulkUpdate as any);
          if (cfg.bulkDelete) bb.bulkDelete(cfg.bulkDelete as any);
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

    if (config.bulkCreate) {
      connector.bulkCreate = async (items: any[]) => {
        const batchSize = config.bulkCreate!.batchSize || 100;
        const aggregatedResponses: any[] = [];
        const confirmations: BulkConfirmation[] = [];
        const isChangePayload = config.bulkCreate!.payloadType === "changes";

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const formattedBatch = isChangePayload
            ? batch.map((item: any) => {
                const payload =
                  item.data ?? item.obj ?? item.payload ?? item;
                return {
                  ...item,
                  data: payload,
                  obj: item.obj ?? payload,
                };
              })
            : batch;
          const requestConfig = config.bulkCreate!.request(formattedBatch);

          const response = await this.restConnector.request({
            method: requestConfig.method || "POST",
            url: requestConfig.endpoint,
            data:
              requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });

          let responseData = response.data;
          if (config.bulkCreate!.responseSchema) {
            responseData = config.bulkCreate!.responseSchema.parse(responseData);
          }

          if (config.bulkCreate!.extract) {
            const extracted = config.bulkCreate!.extract(responseData) ?? [];
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

        return config.bulkCreate!.extract ? confirmations : aggregatedResponses;
      };
    }

    if (config.bulkUpdate) {
      connector.bulkUpdate = async (
        items: BulkUpdateRequestItems<any>
      ) => {
        const batchSize = config.bulkUpdate!.batchSize || 100;
        const aggregatedResponses: any[] = [];
        const confirmations: BulkConfirmation[] = [];
        const payloadType =
          config.bulkUpdate!.payloadType ??
          (config.bulkUpdate!.extract ? "changes" : "items");

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const formattedBatch =
            payloadType === "changes"
              ? batch.map((item: BulkUpdateChange<any>) => {
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
          const requestConfig =
            config.bulkUpdate!.request(formattedBatch as any);

          const response = await this.restConnector.request({
            method: requestConfig.method || "PUT",
            url: requestConfig.endpoint,
            data:
              requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });
          let responseData = response.data;
          if (config.bulkUpdate!.responseSchema) {
            responseData = config.bulkUpdate!.responseSchema!.parse(
              responseData
            );
          }

          if (config.bulkUpdate!.extract) {
            const extracted = config.bulkUpdate!.extract!(responseData) ?? [];
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

        return config.bulkUpdate!.extract
          ? confirmations
          : aggregatedResponses;
      };
    }

    if (config.bulkDelete) {
      connector.bulkDelete = async (
        items: BulkDeleteRequestItems
      ) => {
        const batchSize = config.bulkDelete!.batchSize || 100;
        const confirmations: BulkConfirmation[] = [];
        const payloadType =
          config.bulkDelete!.payloadType ??
          (config.bulkDelete!.extract ? "changes" : "ids");

        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const formattedBatch =
            payloadType === "changes"
              ? batch.map((item: BulkDeleteChange) => {
                  const externalId = String(item.externalId ?? item.id);
                  return {
                    ...item,
                    externalId,
                    id: item.id ?? externalId,
                  };
                })
              : batch;
          const requestConfig = config.bulkDelete!.request(formattedBatch as any);

          const response = await this.restConnector.request({
            method: requestConfig.method || "DELETE",
            url: requestConfig.endpoint,
            data:
              requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });

          if (config.bulkDelete!.extract) {
            let responseData = response.data;
            if (config.bulkDelete!.responseSchema) {
              responseData = config.bulkDelete!.responseSchema!.parse(
                responseData
              );
            }
            const extracted = config.bulkDelete!.extract!(responseData) ?? [];
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

  withBulkCreate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (changes: Array<BulkCreateChange<T>>) => {
      endpoint: string;
      method?: "POST" | "PUT";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    this.config.bulkCreate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as unknown as BulkCreateOperationConfig<T>;
    return this;
  }

  withBulkUpdate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (changes: Array<BulkUpdateChange<T>>) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    this.config.bulkUpdate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as unknown as BulkUpdateOperationConfig<T>;
    return this;
  }

  withBulkDelete<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (changes: Array<BulkDeleteChange>) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      /** @deprecated Use `json` for JSON payloads */
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "ids" | "changes";
  }): this {
    this.config.bulkDelete = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as unknown as BulkDeleteOperationConfig;
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

  bulkCreate(config: BulkCreateOperationConfig<T>): this {
    this.config.bulkCreate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as BulkCreateOperationConfig<T>;
    return this;
  }

  withBulkCreate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (changes: Array<BulkCreateChange<T>>) => {
      endpoint: string;
      method?: "POST" | "PUT";
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    return this.bulkCreate(config as unknown as BulkCreateOperationConfig<T>);
  }

  bulkUpdate(config: BulkUpdateOperationConfig<T>): this {
    this.config.bulkUpdate = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as BulkUpdateOperationConfig<T>;
    return this;
  }

  withBulkUpdate<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (changes: Array<BulkUpdateChange<T>>) => {
      endpoint: string;
      method?: "PUT" | "PATCH" | "POST";
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    return this.bulkUpdate(config as unknown as BulkUpdateOperationConfig<T>);
  }

  bulkDelete(config: BulkDeleteOperationConfig): this {
    this.config.bulkDelete = {
      ...config,
      payloadType: config.payloadType ?? "changes",
    } as BulkDeleteOperationConfig;
    return this;
  }

  withBulkDelete<TSchema extends z.ZodType<any> | undefined = undefined>(config: {
    request: (changes: Array<BulkDeleteChange>) => {
      endpoint: string;
      method?: "DELETE" | "POST";
      data?: any;
      json?: any;
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "ids" | "changes";
  }): this {
    return this.bulkDelete(config as unknown as BulkDeleteOperationConfig);
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

  async sync(type?: "FULL" | "INCREMENTAL"): Promise<void> {
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

            if (connector.bulkCreate && delta.operation === "CREATE") {
              console.info(
                `Creating ${delta.changes.length} items for model ${modelName} (bulk)`
              );
              const payloadType =
                connector.config.bulkCreate?.payloadType ??
                (connector.config.bulkCreate?.extract ? "changes" : "items");
              const bulkInput =
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

              const created = await connector.bulkCreate(bulkInput as any);

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
                  if (externalIdCandidate === undefined || externalIdCandidate === null) {
                    throw new Error(
                      `Bulk create extract did not provide externalId for change ${item.changeId}`
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
                  `Confirming ${changesToConfirm.length} CREATE (bulk) changes for model ${modelName}:`,
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
            } else if (connector.bulkUpdate && delta.operation === "UPDATE") {
              console.info(
                `Updating ${delta.changes.length} items for model ${modelName} (bulk)`
              );
              const payloadType =
                connector.config.bulkUpdate?.payloadType ??
                (connector.config.bulkUpdate?.extract ? "changes" : "items");
              const bulkInput =
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
                      } as BulkUpdateChange<any>;
                    })
                  : delta.changes.map((c: any) => ({
                      id: c.externalId,
                      data: c.data,
                    }));
              const updated = await connector.bulkUpdate(bulkInput as any);

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
                  if (externalIdCandidate === undefined || externalIdCandidate === null) {
                    throw new Error(
                      `Bulk update extract did not provide externalId for change ${item.changeId}`
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
                    externalId: String(extracted.externalId ?? change.externalId),
                    externalUpdatedAt: extracted.externalUpdatedAt ?? null,
                  };
                });
              }

              try {
                console.debug(
                  `Confirming ${changesToConfirm.length} UPDATE (bulk) changes for model ${modelName}:`,
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
            } else if (connector.bulkDelete && delta.operation === "DELETE") {
              console.info(
                `Deleting ${delta.changes.length} items for model ${modelName} (bulk)`
              );
              const payloadType =
                connector.config.bulkDelete?.payloadType ??
                (connector.config.bulkDelete?.extract ? "changes" : "ids");
              const bulkInput =
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
              const deleted = await connector.bulkDelete(bulkInput as any);
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
                  if (externalIdCandidate === undefined || externalIdCandidate === null) {
                    throw new Error(
                      `Bulk delete extract did not provide externalId for change ${item.changeId}`
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
                  try {
                    console.debug(
                      `Confirming CREATE (non-bulk) change for model ${modelName}:`,
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
                  try {
                    console.debug(
                      `Confirming UPDATE (non-bulk) change for model ${modelName}:`,
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
