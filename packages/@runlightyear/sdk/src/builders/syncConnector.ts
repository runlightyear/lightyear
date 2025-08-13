import { z } from "zod";
import type { FromSchema } from "json-schema-to-ts";
import type { CollectionWithSchema, ExtractModelTypes, ModelWithSchema } from "./schemaTypes";
import type { RestConnector } from "../connectors/RestConnector";
import { validateWithSchema } from "./schemaValidation";

// Pagination types
export interface PagePagination {
  type: "page";
  page: number;
  limit: number;
}

export interface CursorPagination {
  type: "cursor";
  cursor?: string;
  limit: number;
}

export interface OffsetPagination {
  type: "offset";
  offset: number;
  limit: number;
}

export type Pagination = PagePagination | CursorPagination | OffsetPagination;

// Response types
export interface ListResponse<T> {
  data: T[];
  hasMore?: boolean;
  nextCursor?: string;
  totalCount?: number;
}

export interface BulkResponse<T> {
  successful: T[];
  failed: Array<{ data: T; error: string }>;
}

// Model connector types
export interface ListConfig<TApiSchema extends z.ZodTypeAny, TModel> {
  responseSchema: TApiSchema;
  // Transform receives the full validated response and returns an array of models
  transform: (response: z.infer<TApiSchema>) => TModel[];
  // Optional: override default pagination for this model
  getNextPage?: (response: any, currentPagination: Pagination) => Pagination | null;
}

export interface CreateConfig<TModel, TApiRequest = any> {
  transform: (model: TModel) => TApiRequest;
  responseTransform?: (response: any) => Partial<TModel>;
}

export interface UpdateConfig<TModel, TApiRequest = any> {
  transform: (model: TModel, previous?: TModel) => TApiRequest;
  responseTransform?: (response: any) => Partial<TModel>;
}

export interface DeleteConfig<TModel> {
  getId?: (model: TModel) => string;
}

export interface BulkConfig<TModel, TApiRequest = any> {
  maxBatchSize?: number;
  transform: (models: TModel[]) => TApiRequest;
  responseTransform?: (response: any, models: TModel[]) => TModel[];
}

// Model connector definition
export class ModelConnector<
  TModelName extends string,
  TModel,
  TListSchema extends z.ZodTypeAny = z.ZodNever
> {
  constructor(
    private modelName: TModelName,
    private restConnector: RestConnector,
    private modelSchema: any,
    private defaultPaginationStrategy?: PaginationStrategy,
    private syncConnectorBuilder?: any
  ) {}

  private listConfig?: ListConfig<TListSchema, TModel>;
  private createConfig?: CreateConfig<TModel>;
  private updateConfig?: UpdateConfig<TModel>;
  private deleteConfig?: DeleteConfig<TModel>;
  private bulkCreateConfig?: BulkConfig<TModel>;
  private bulkUpdateConfig?: BulkConfig<TModel>;
  private bulkDeleteConfig?: BulkConfig<TModel>;

  withList<TSchema extends z.ZodTypeAny>(
    endpoint: string | ((pagination: Pagination) => string),
    config: ListConfig<TSchema, TModel>
  ): ModelConnector<TModelName, TModel, TSchema> {
    const connector = this as any;
    connector.listConfig = config;
    connector.listEndpoint = endpoint;
    return connector;
  }

  withCreate(
    endpoint: string,
    config: CreateConfig<TModel>
  ): this {
    this.createConfig = config;
    this.createEndpoint = endpoint;
    return this;
  }

  withUpdate(
    endpoint: string | ((id: string) => string),
    config: UpdateConfig<TModel>
  ): this {
    this.updateConfig = config;
    this.updateEndpoint = endpoint;
    return this;
  }

  withDelete(
    endpoint: string | ((id: string) => string),
    config?: DeleteConfig<TModel>
  ): this {
    this.deleteConfig = config || {};
    this.deleteEndpoint = endpoint;
    return this;
  }

  withBulkCreate(
    endpoint: string,
    config: BulkConfig<TModel>
  ): this {
    this.bulkCreateConfig = config;
    this.bulkCreateEndpoint = endpoint;
    return this;
  }

  withBulkUpdate(
    endpoint: string,
    config: BulkConfig<TModel>
  ): this {
    this.bulkUpdateConfig = config;
    this.bulkUpdateEndpoint = endpoint;
    return this;
  }

  withBulkDelete(
    endpoint: string,
    config: BulkConfig<TModel>
  ): this {
    this.bulkDeleteConfig = config;
    this.bulkDeleteEndpoint = endpoint;
    return this;
  }

  // Return to sync connector builder for chaining
  and(): any {
    return this.syncConnectorBuilder;
  }

  // Convenience method to add another model connector
  addModelConnector<TNewModel extends string>(modelName: TNewModel): any {
    if (this.syncConnectorBuilder) {
      return this.syncConnectorBuilder.addModelConnector(modelName);
    }
    throw new Error("Sync connector builder not available");
  }

  // Runtime methods
  private listEndpoint?: string | ((pagination: Pagination) => string);
  private createEndpoint?: string;
  private updateEndpoint?: string | ((id: string) => string);
  private deleteEndpoint?: string | ((id: string) => string);
  private bulkCreateEndpoint?: string;
  private bulkUpdateEndpoint?: string;
  private bulkDeleteEndpoint?: string;

  async list(pagination?: Pagination): Promise<ListResponse<TModel>> {
    if (!this.listConfig || !this.listEndpoint) {
      throw new Error(`List operation not configured for model '${this.modelName}'`);
    }

    const paginationParams = pagination || { type: "page" as const, page: 1, limit: 100 };
    const endpoint = typeof this.listEndpoint === "function" 
      ? this.listEndpoint(paginationParams)
      : this.listEndpoint;

    const response = await this.restConnector.request({
      url: endpoint,
      method: "GET"
    });

    // Validate with Zod
    const validation = this.listConfig.responseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error(`Invalid API response: ${validation.error.message}`);
    }

    // Transform the validated response to get array of models
    const transformedItems = this.listConfig.transform(validation.data);

    // Validate each transformed item against model schema
    const validData: TModel[] = [];
    const errors: any[] = [];

    for (let i = 0; i < transformedItems.length; i++) {
      const item = transformedItems[i];
      try {
        const modelValidation = validateWithSchema<TModel>(item, this.modelSchema);
        if (modelValidation.success && modelValidation.data) {
          validData.push(modelValidation.data);
        } else {
          errors.push({ index: i, item, errors: modelValidation.errors });
        }
      } catch (error) {
        errors.push({ index: i, item, error: error instanceof Error ? error.message : "Validation error" });
      }
    }

    // Extract pagination info using strategy or defaults
    const strategy = this.defaultPaginationStrategy;
    const hasMore = strategy?.extractHasMore 
      ? strategy.extractHasMore(validation.data)
      : validation.data.hasMore || validation.data.has_more || 
        validation.data.paging?.next || false;
    const nextCursor = strategy?.extractNextCursor
      ? strategy.extractNextCursor(validation.data)
      : validation.data.nextCursor || validation.data.next_cursor ||
        validation.data.paging?.next?.after;
    const totalCount = strategy?.extractTotalCount
      ? strategy.extractTotalCount(validation.data)
      : validation.data.total || validation.data.totalCount || 
        validation.data.total_count;

    return {
      data: validData,
      hasMore,
      nextCursor,
      totalCount
    };
  }

  async listAll(options?: { maxPages?: number; pageSize?: number }): Promise<TModel[]> {
    if (!this.listConfig) {
      throw new Error(`List operation not configured for model '${this.modelName}'`);
    }

    const allData: TModel[] = [];
    let pagination: Pagination = { type: "page", page: 1, limit: options?.pageSize || 100 };
    let pageCount = 0;

    while (true) {
      const response = await this.list(pagination);
      allData.push(...response.data);

      pageCount++;
      if (options?.maxPages && pageCount >= options.maxPages) break;
      if (!response.hasMore) break;

      // Get next page using configured or default pagination
      const paginationStrategy = this.listConfig.getNextPage || this.defaultPaginationStrategy?.getNextPage;
      if (paginationStrategy) {
        const next = paginationStrategy(response, pagination);
        if (!next) break;
        pagination = next;
      } else if (!response.hasMore) {
        break;
      } else {
        // Fallback: simple increment for page-based
        if (pagination.type === "page") {
          pagination = { ...pagination, page: pagination.page + 1 };
        } else {
          break;
        }
      }
    }

    return allData;
  }

  async create(model: TModel): Promise<TModel> {
    if (!this.createConfig || !this.createEndpoint) {
      throw new Error(`Create operation not configured for model '${this.modelName}'`);
    }

    const body = this.createConfig.transform(model);
    const response = await this.restConnector.request({
      url: this.createEndpoint,
      method: "POST",
      data: body
    });

    if (this.createConfig.responseTransform) {
      const updates = this.createConfig.responseTransform(response.data);
      return { ...model, ...updates };
    }

    return model;
  }

  async update(model: TModel, previous?: TModel): Promise<TModel> {
    if (!this.updateConfig || !this.updateEndpoint) {
      throw new Error(`Update operation not configured for model '${this.modelName}'`);
    }

    const id = this.getId(model);
    const endpoint = typeof this.updateEndpoint === "function"
      ? this.updateEndpoint(id)
      : this.updateEndpoint;

    const body = this.updateConfig.transform(model, previous);
    const response = await this.restConnector.request({
      url: endpoint,
      method: "PATCH",
      data: body
    });

    if (this.updateConfig.responseTransform) {
      const updates = this.updateConfig.responseTransform(response.data);
      return { ...model, ...updates };
    }

    return model;
  }

  async delete(model: TModel): Promise<void> {
    if (!this.deleteEndpoint) {
      throw new Error(`Delete operation not configured for model '${this.modelName}'`);
    }

    const id = this.getId(model);
    const endpoint = typeof this.deleteEndpoint === "function"
      ? this.deleteEndpoint(id)
      : this.deleteEndpoint;

    await this.restConnector.request({
      url: endpoint,
      method: "DELETE"
    });
  }

  async bulkCreate(models: TModel[]): Promise<BulkResponse<TModel>> {
    if (!this.bulkCreateConfig || !this.bulkCreateEndpoint) {
      // Fall back to individual creates
      return this.bulkFallback(models, (model) => this.create(model));
    }

    const batches = this.batchModels(models, this.bulkCreateConfig.maxBatchSize);
    const results: BulkResponse<TModel> = { successful: [], failed: [] };

    for (const batch of batches) {
      try {
        const body = this.bulkCreateConfig.transform(batch);
        const response = await this.restConnector.request({
          url: this.bulkCreateEndpoint,
          method: "POST",
          data: body
        });

        const transformed = this.bulkCreateConfig.responseTransform
          ? this.bulkCreateConfig.responseTransform(response.data, batch)
          : batch;

        results.successful.push(...transformed);
      } catch (error) {
        batch.forEach(model => {
          results.failed.push({
            data: model,
            error: error instanceof Error ? error.message : "Bulk create failed"
          });
        });
      }
    }

    return results;
  }

  async bulkUpdate(models: TModel[]): Promise<BulkResponse<TModel>> {
    if (!this.bulkUpdateConfig || !this.bulkUpdateEndpoint) {
      return this.bulkFallback(models, (model) => this.update(model));
    }

    const batches = this.batchModels(models, this.bulkUpdateConfig.maxBatchSize);
    const results: BulkResponse<TModel> = { successful: [], failed: [] };

    for (const batch of batches) {
      try {
        const body = this.bulkUpdateConfig.transform(batch);
        const response = await this.restConnector.request({
          url: this.bulkUpdateEndpoint,
          method: "PATCH",
          data: body
        });

        const transformed = this.bulkUpdateConfig.responseTransform
          ? this.bulkUpdateConfig.responseTransform(response.data, batch)
          : batch;

        results.successful.push(...transformed);
      } catch (error) {
        batch.forEach(model => {
          results.failed.push({
            data: model,
            error: error instanceof Error ? error.message : "Bulk update failed"
          });
        });
      }
    }

    return results;
  }

  async bulkDelete(models: TModel[]): Promise<BulkResponse<TModel>> {
    if (!this.bulkDeleteConfig || !this.bulkDeleteEndpoint) {
      return this.bulkFallback(models, async (model) => {
        await this.delete(model);
        return model;
      });
    }

    const batches = this.batchModels(models, this.bulkDeleteConfig.maxBatchSize);
    const results: BulkResponse<TModel> = { successful: [], failed: [] };

    for (const batch of batches) {
      try {
        const body = this.bulkDeleteConfig.transform(batch);
        await this.restConnector.request({
          url: this.bulkDeleteEndpoint,
          method: "DELETE",
          data: body
        });

        results.successful.push(...batch);
      } catch (error) {
        batch.forEach(model => {
          results.failed.push({
            data: model,
            error: error instanceof Error ? error.message : "Bulk delete failed"
          });
        });
      }
    }

    return results;
  }

  private getId(model: TModel): string {
    if (this.deleteConfig?.getId) {
      return this.deleteConfig.getId(model);
    }
    return String((model as any).id);
  }

  private batchModels(models: TModel[], maxBatchSize?: number): TModel[][] {
    const batchSize = maxBatchSize || 100;
    const batches: TModel[][] = [];
    
    for (let i = 0; i < models.length; i += batchSize) {
      batches.push(models.slice(i, i + batchSize));
    }
    
    return batches;
  }

  private async bulkFallback(
    models: TModel[],
    operation: (model: TModel) => Promise<TModel>
  ): Promise<BulkResponse<TModel>> {
    const results: BulkResponse<TModel> = { successful: [], failed: [] };
    
    for (const model of models) {
      try {
        const result = await operation(model);
        results.successful.push(result);
      } catch (error) {
        results.failed.push({
          data: model,
          error: error instanceof Error ? error.message : "Operation failed"
        });
      }
    }
    
    return results;
  }
}

// Default pagination strategy
export interface PaginationStrategy {
  getNextPage: (response: any, currentPagination: Pagination) => Pagination | null;
  extractHasMore?: (response: any) => boolean;
  extractNextCursor?: (response: any) => string | undefined;
  extractTotalCount?: (response: any) => number | undefined;
}

// Common pagination strategies
export const PaginationStrategies = {
  // HubSpot style: response.paging.next.after
  hubspot: {
    getNextPage: (response: any, current: Pagination) => {
      if (response.paging?.next?.after) {
        return {
          type: "cursor",
          cursor: response.paging.next.after,
          limit: current.limit
        };
      }
      return null;
    },
    extractHasMore: (response: any) => !!response.paging?.next,
    extractNextCursor: (response: any) => response.paging?.next?.after
  },
  
  // Standard cursor: response.nextCursor or response.next_cursor
  cursor: {
    getNextPage: (response: any, current: Pagination) => {
      const cursor = response.nextCursor || response.next_cursor;
      if (cursor) {
        return {
          type: "cursor",
          cursor,
          limit: current.limit
        };
      }
      return null;
    },
    extractHasMore: (response: any) => !!(response.nextCursor || response.next_cursor),
    extractNextCursor: (response: any) => response.nextCursor || response.next_cursor
  },
  
  // Page-based: response.hasMore or response.has_more
  page: {
    getNextPage: (response: any, current: Pagination) => {
      if (current.type === "page" && (response.hasMore || response.has_more)) {
        return {
          type: "page",
          page: current.page + 1,
          limit: current.limit
        };
      }
      return null;
    },
    extractHasMore: (response: any) => response.hasMore || response.has_more
  },
  
  // Offset-based: using total count
  offset: {
    getNextPage: (response: any, current: Pagination) => {
      if (current.type === "offset") {
        const total = response.total || response.totalCount || response.total_count;
        const currentOffset = current.offset;
        const nextOffset = currentOffset + current.limit;
        if (total && nextOffset < total) {
          return {
            type: "offset",
            offset: nextOffset,
            limit: current.limit
          };
        }
      }
      return null;
    },
    extractTotalCount: (response: any) => response.total || response.totalCount || response.total_count
  }
} as const;

// Sync connector instance
export class SyncConnector<TCollection extends CollectionWithSchema<any>> {
  constructor(
    private restConnector: RestConnector,
    private collection: TCollection,
    private modelConnectors: Map<string, ModelConnector<any, any, any>>,
    private defaultPaginationStrategy?: PaginationStrategy
  ) {}

  getModelConnector<TModelName extends keyof ExtractModelTypes<TCollection> & string>(
    modelName: TModelName
  ): ModelConnector<TModelName, ExtractModelTypes<TCollection>[TModelName], any> | undefined {
    return this.modelConnectors.get(modelName);
  }

  // Get all configured model names
  getConfiguredModels(): string[] {
    return Array.from(this.modelConnectors.keys());
  }
}

// Sync connector builder
export class SyncConnectorBuilder<TCollection extends CollectionWithSchema<any>> {
  private modelConnectors = new Map<string, ModelConnector<any, any, any>>();
  private defaultPaginationStrategy?: PaginationStrategy;

  constructor(
    private restConnector: RestConnector,
    private collection: TCollection
  ) {}
  
  // Set default pagination strategy for all models
  withDefaultPagination(strategy: PaginationStrategy | keyof typeof PaginationStrategies): this {
    this.defaultPaginationStrategy = typeof strategy === "string" 
      ? PaginationStrategies[strategy]
      : strategy;
    return this;
  }

  addModelConnector<TModelName extends keyof ExtractModelTypes<TCollection> & string>(
    modelName: TModelName
  ): ModelConnector<TModelName, ExtractModelTypes<TCollection>[TModelName], z.ZodNever> {
    // Type-safe check that model exists in collection
    const model = this.collection.models[modelName];
    if (!model) {
      throw new Error(`Model '${modelName}' not found in collection '${this.collection.name}'`);
    }

    const connector = new ModelConnector<
      TModelName,
      ExtractModelTypes<TCollection>[TModelName],
      z.ZodNever
    >(modelName, this.restConnector, model.schema, this.defaultPaginationStrategy, this);

    this.modelConnectors.set(modelName, connector);
    return connector;
  }

  // Add multiple model connectors at once
  withModelConnectors<TModelNames extends (keyof ExtractModelTypes<TCollection> & string)[]>(
    ...modelNames: TModelNames
  ): this {
    for (const modelName of modelNames) {
      this.addModelConnector(modelName);
    }
    return this;
  }

  // Extend collection with new model
  withExtendedCollection<TExtended extends CollectionWithSchema<any>>(
    extendedCollection: TExtended
  ): SyncConnectorBuilder<TExtended> {
    return new SyncConnectorBuilder(this.restConnector, extendedCollection);
  }

  // Alter existing model behavior
  alterModelConnector<TModelName extends keyof ExtractModelTypes<TCollection> & string>(
    modelName: TModelName,
    alteration: (connector: ModelConnector<TModelName, ExtractModelTypes<TCollection>[TModelName], any>) => void
  ): this {
    const connector = this.modelConnectors.get(modelName);
    if (!connector) {
      throw new Error(`Model connector '${modelName}' not found`);
    }
    alteration(connector);
    return this;
  }

  // Build the final sync connector
  build(): SyncConnector<TCollection> {
    return new SyncConnector(
      this.restConnector,
      this.collection,
      new Map(this.modelConnectors),
      this.defaultPaginationStrategy
    );
  }
}

// Factory function
export function defineSyncConnector<TCollection extends CollectionWithSchema<any>>(
  restConnector: RestConnector,
  collection: TCollection
): SyncConnectorBuilder<TCollection> {
  return new SyncConnectorBuilder(restConnector, collection);
}