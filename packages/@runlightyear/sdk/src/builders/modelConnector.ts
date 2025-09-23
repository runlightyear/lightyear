import { z } from "zod";
import type { RestConnector } from "../connectors/RestConnector";
import type { Model, InferModelData } from "../types";
import type {
  ListConfig,
  CreateConfig,
  UpdateConfig,
  DeleteConfig,
  ModelConnectorConfig,
  BulkCreateOperationConfig,
  BulkCreateChange,
  BulkUpdateOperationConfig,
  BulkDeleteOperationConfig,
  ListParams,
  ModelConnector as ModelConnectorInterface,
  BulkConfirmation,
  BulkUpdateRequestItems,
  BulkDeleteRequestItems,
  BulkUpdateChange,
  BulkDeleteChange,
  SyncObject,
} from "./syncConnector";

/**
 * ModelConnectorBuilder - builds a connector for a specific model
 * This allows creating model connectors independently from sync connectors
 */
export class ModelConnectorBuilder<T = any> {
  private restConnector: RestConnector;
  private model: Model;
  private config: ModelConnectorConfig<T> = {};

  constructor(restConnector: RestConnector, model: Model) {
    this.restConnector = restConnector;
    this.model = model;
  }

  list(config: ListConfig<T, any>): this {
    this.config.list = config;
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
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    return this.bulkCreate(config as BulkCreateOperationConfig<T>);
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
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "items" | "changes";
  }): this {
    return this.bulkUpdate(config as BulkUpdateOperationConfig<T>);
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
    };
    responseSchema?: TSchema;
    extract?: (
      response: TSchema extends z.ZodType<any> ? z.infer<TSchema> : unknown
    ) => Array<BulkConfirmation>;
    batchSize?: number;
    payloadType?: "ids" | "changes";
  }): this {
    return this.bulkDelete(config as BulkDeleteOperationConfig);
  }

  build(): ModelConnectorInterface<T> {
    const connector: ModelConnectorInterface<T> = {
      modelName: this.model.name,
      config: this.config,
    };

    // Add list implementation
    if (this.config.list) {
      connector.list = async (params?: ListParams) => {
        const _params: ListParams = params || ({ syncType: "FULL" } as any);
        const requestConfig = this.config.list!.request(_params);

        const response = await this.restConnector.request({
          method: requestConfig.method || "GET",
          url: requestConfig.endpoint,
          params: requestConfig.params,
          // prefer json if provided; otherwise fall back to data
          json: (requestConfig as any).json ?? requestConfig.data,
        });

        let data = response.data;
        let items: Array<SyncObject<T>> = [];

        if (this.config.list!.responseSchema) {
          data = this.config.list!.responseSchema.parse(data);
        }

        if (this.config.list!.transform) {
          items = this.config.list!.transform(data);
        } else {
          items = data as Array<SyncObject<T>>;
        }

        if (this.config.list!.filter) {
          items = items.filter((obj) =>
            this.config.list!.filter!({
              obj,
              lastExternalId: _params.lastExternalId,
              lastExternalUpdatedAt: _params.lastExternalUpdatedAt,
              syncType: _params.syncType,
            })
          );
        }

        const pg = this.config.list!.pagination as
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

    // Add create implementation
    if (this.config.create) {
      connector.create = async (data: T) => {
        const transformedData = this.config.create!.transformRequest
          ? this.config.create!.transformRequest(data)
          : data;

        const requestConfig = this.config.create!.request(data);

        const response = await this.restConnector.request({
          method: requestConfig.method || "POST",
          url: requestConfig.endpoint,
          data: requestConfig.data || transformedData,
        });

        return this.config.create!.transform
          ? this.config.create!.transform(response.data)
          : response.data;
      };
    }

    // Add update implementation
    if (this.config.update) {
      connector.update = async (id: string, data: Partial<T>) => {
        const transformedData = this.config.update!.transformRequest
          ? this.config.update!.transformRequest(data)
          : data;

        const requestConfig = this.config.update!.request(id, data);

        const response = await this.restConnector.request({
          method: requestConfig.method || "PUT",
          url: requestConfig.endpoint,
          data: requestConfig.data || transformedData,
        });

        return this.config.update!.transform
          ? this.config.update!.transform(response.data)
          : response.data;
      };
    }

    // Add delete implementation
    if (this.config.delete) {
      connector.delete = async (id: string) => {
        const requestConfig = this.config.delete!.request(id);

        await this.restConnector.request({
          method: requestConfig.method || "DELETE",
          url: requestConfig.endpoint,
          data: requestConfig.data,
        });
      };
    }

    // Add bulk implementations
    if (this.config.bulkCreate) {
      connector.bulkCreate = async (items: any[]) => {
        const batchSize = this.config.bulkCreate!.batchSize || 100;
        const aggregatedResponses: any[] = [];
        const confirmations: BulkConfirmation[] = [];
        const isChangePayload =
          this.config.bulkCreate!.payloadType === "changes";

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
          const requestConfig = this.config.bulkCreate!.request(formattedBatch);

          const response = await this.restConnector.request({
            method: requestConfig.method || "POST",
            url: requestConfig.endpoint,
            data:
              requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });

          let responseData = response.data;
          if (this.config.bulkCreate!.responseSchema) {
            responseData = this.config.bulkCreate!.responseSchema!.parse(
              responseData
            );
          }

          if (this.config.bulkCreate!.extract) {
            const extracted = (this.config.bulkCreate!.extract(
              responseData
            ) ?? []) as Array<BulkConfirmation>;
            confirmations.push(
              ...extracted.map((item: BulkConfirmation) => ({
                changeId: String(item.changeId),
                externalId: String(item.externalId),
                externalUpdatedAt:
                  item.externalUpdatedAt === undefined ||
                  item.externalUpdatedAt === null
                    ? null
                    : String(item.externalUpdatedAt),
              }))
            );
          }

          aggregatedResponses.push(
            ...(Array.isArray(responseData) ? responseData : [responseData])
          );
        }

        return this.config.bulkCreate!.extract
          ? confirmations
          : aggregatedResponses;
      };
    }

    if (this.config.bulkUpdate) {
      connector.bulkUpdate = async (items: BulkUpdateRequestItems<any>) => {
        const batchSize = this.config.bulkUpdate!.batchSize || 100;
        const aggregatedResponses: any[] = [];
        const confirmations: BulkConfirmation[] = [];
        const payloadType =
          this.config.bulkUpdate!.payloadType ??
          (this.config.bulkUpdate!.extract ? "changes" : "items");

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
          const requestConfig = this.config.bulkUpdate!.request(
            formattedBatch as any
          );

          const response = await this.restConnector.request({
            method: requestConfig.method || "PUT",
            url: requestConfig.endpoint,
            data:
              requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });

          let responseData = response.data;
          if (this.config.bulkUpdate!.responseSchema) {
            responseData = this.config.bulkUpdate!.responseSchema!.parse(
              responseData
            );
          }

          if (this.config.bulkUpdate!.extract) {
            const extracted = (this.config.bulkUpdate!.extract!(
              responseData
            ) ?? []) as Array<BulkConfirmation>;
            confirmations.push(
              ...extracted.map((item: BulkConfirmation) => ({
                changeId: String(item.changeId),
                externalId: String(item.externalId),
                externalUpdatedAt:
                  item.externalUpdatedAt === undefined ||
                  item.externalUpdatedAt === null
                    ? null
                    : String(item.externalUpdatedAt),
              }))
            );
          }

          aggregatedResponses.push(
            ...(Array.isArray(responseData) ? responseData : [responseData])
          );
        }

        return this.config.bulkUpdate!.extract
          ? confirmations
          : aggregatedResponses;
      };
    }

    if (this.config.bulkDelete) {
      connector.bulkDelete = async (items: BulkDeleteRequestItems) => {
        const batchSize = this.config.bulkDelete!.batchSize || 100;
        const confirmations: BulkConfirmation[] = [];
        const payloadType =
          this.config.bulkDelete!.payloadType ??
          (this.config.bulkDelete!.extract ? "changes" : "ids");

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
          const requestConfig = this.config.bulkDelete!.request(
            formattedBatch as any
          );

          const response = await this.restConnector.request({
            method: requestConfig.method || "DELETE",
            url: requestConfig.endpoint,
            data:
              requestConfig.json ?? requestConfig.data ?? formattedBatch,
          });

          if (this.config.bulkDelete!.extract) {
            let responseData = response.data;
            if (this.config.bulkDelete!.responseSchema) {
              responseData = this.config.bulkDelete!.responseSchema!.parse(
                responseData
              );
            }
            const extracted = (this.config.bulkDelete!.extract!(
              responseData
            ) ?? []) as Array<BulkConfirmation>;
            confirmations.push(
              ...extracted.map((item: BulkConfirmation) => ({
                changeId: String(item.changeId),
                externalId: String(item.externalId),
                externalUpdatedAt:
                  item.externalUpdatedAt === undefined ||
                  item.externalUpdatedAt === null
                    ? null
                    : String(item.externalUpdatedAt),
              }))
            );
          }
        }

        return confirmations;
      };
    }

    return connector;
  }
}

/**
 * Factory function for creating a model connector
 */
export function createModelConnector<T = any>(
  restConnector: RestConnector,
  model: Model
): ModelConnectorBuilder<T>;
export function createModelConnector<M extends Model>(
  restConnector: RestConnector,
  model: M
): ModelConnectorBuilder<InferModelData<M>>;
export function createModelConnector(
  restConnector: RestConnector,
  model: Model
): ModelConnectorBuilder<any> {
  return new ModelConnectorBuilder<any>(restConnector, model);
}

/**
 * Type helper to extract model type from schema
 */
export type InferModelType<S> = S extends z.ZodType<infer T> ? T : any;
