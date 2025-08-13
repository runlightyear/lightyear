import { z } from "zod";
import type { RestConnector } from "../connectors/RestConnector";
import type { Model } from "../types";
import type {
  ListConfig,
  CreateConfig,
  UpdateConfig,
  DeleteConfig,
  BulkConfig,
  ListParams,
  ModelConnector as ModelConnectorInterface,
} from "./syncConnector";

/**
 * ModelConnectorBuilder - builds a connector for a specific model
 * This allows creating model connectors independently from sync connectors
 */
export class ModelConnectorBuilder<T = any> {
  private restConnector: RestConnector;
  private model: Model;
  private config: {
    list?: ListConfig<T>;
    create?: CreateConfig<T>;
    update?: UpdateConfig<T>;
    delete?: DeleteConfig;
    bulk?: BulkConfig<T>;
  } = {};

  constructor(restConnector: RestConnector, model: Model) {
    this.restConnector = restConnector;
    this.model = model;
  }

  list(config: ListConfig<T>): this {
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

  bulk(config: BulkConfig<T>): this {
    this.config.bulk = config;
    return this;
  }

  build(): ModelConnectorInterface<T> {
    const connector: ModelConnectorInterface<T> = {
      modelName: this.model.name,
      config: this.config,
    };

    // Add list implementation
    if (this.config.list) {
      connector.list = async (params?: ListParams) => {
        const requestConfig = this.config.list!.request(params || {});
        
        const response = await this.restConnector.request({
          method: requestConfig.method || "GET",
          url: requestConfig.endpoint,
          params: requestConfig.params,
          data: requestConfig.data,
        });

        let data = response.data;
        let items: T[] = [];

        if (this.config.list!.responseSchema) {
          data = this.config.list!.responseSchema.parse(data);
        }

        if (this.config.list!.transform) {
          items = this.config.list!.transform(data);
        } else {
          items = Array.isArray(data) ? data : [data];
        }

        let nextCursor: string | undefined;
        if (this.config.list!.pagination?.type === "cursor" && this.config.list!.pagination.cursorField) {
          nextCursor = data[this.config.list!.pagination.cursorField];
        }

        return {
          items,
          nextCursor,
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
    if (this.config.bulk?.create) {
      connector.bulkCreate = async (items: T[]) => {
        const batchSize = this.config.bulk!.create!.batchSize || 100;
        const results: T[] = [];
        
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const requestConfig = this.config.bulk!.create!.request(batch);
          
          const response = await this.restConnector.request({
            method: requestConfig.method || "POST",
            url: requestConfig.endpoint,
            data: requestConfig.data || batch,
          });
          results.push(...(Array.isArray(response.data) ? response.data : [response.data]));
        }
        
        return results;
      };
    }

    if (this.config.bulk?.update) {
      connector.bulkUpdate = async (items: Array<{ id: string; data: Partial<T> }>) => {
        const batchSize = this.config.bulk!.update!.batchSize || 100;
        const results: T[] = [];
        
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          const requestConfig = this.config.bulk!.update!.request(batch);
          
          const response = await this.restConnector.request({
            method: requestConfig.method || "PUT",
            url: requestConfig.endpoint,
            data: requestConfig.data || batch,
          });
          results.push(...(Array.isArray(response.data) ? response.data : [response.data]));
        }
        
        return results;
      };
    }

    if (this.config.bulk?.delete) {
      connector.bulkDelete = async (ids: string[]) => {
        const batchSize = this.config.bulk!.delete!.batchSize || 100;
        
        for (let i = 0; i < ids.length; i += batchSize) {
          const batch = ids.slice(i, i + batchSize);
          const requestConfig = this.config.bulk!.delete!.request(batch);
          
          await this.restConnector.request({
            method: requestConfig.method || "DELETE",
            url: requestConfig.endpoint,
            data: requestConfig.data || batch,
          });
        }
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
): ModelConnectorBuilder<T> {
  return new ModelConnectorBuilder<T>(restConnector, model);
}

/**
 * Type helper to extract model type from schema
 */
export type InferModelType<S> = S extends z.ZodType<infer T> ? T : any;