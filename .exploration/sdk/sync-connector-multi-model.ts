import { Collection, Model } from './types';
import { RestConnector } from './rest-connector';

/**
 * Multi-model sync connector with shared sync logic
 */

export type SyncOperation = 'create' | 'update' | 'delete';
export type SyncMode = 'full' | 'incremental';

export interface SyncState {
  lastSyncTime?: Date;
  cursor?: string;
  version?: string;
  [key: string]: any;
}

export interface ListResponse<T = any> {
  items: T[];
  nextState?: Partial<SyncState>;
  hasMore?: boolean;
}

// Model-specific sync configuration
export interface ModelSyncConfig<TApi = any, TModel = any> {
  model: string;
  
  // How to extract items for this model from API response
  extractItems?: (response: any) => TApi[];
  
  // Map from API to collection format
  mapFromApi: (item: TApi) => { id: string; data: TModel } | null;
  
  // Map from collection to API format
  mapToApi: (data: TModel, operation: SyncOperation) => any;
  
  // Get endpoint for write operations
  getEndpoint: (data: TModel, operation: SyncOperation) => { path: string; method: string };
  
  // Optional: model-specific list parameters
  getListParams?: (mode: SyncMode, state: SyncState) => Record<string, any>;
  
  // Optional: filter which items to sync
  shouldSync?: (item: TApi) => boolean;
}

// Builder for multi-model sync
export class MultiModelSyncBuilder<TConnector = never> {
  private collection?: Collection;
  private connector?: TConnector;
  private modelConfigs = new Map<string, ModelSyncConfig>();
  
  // Common sync logic
  private listFn?: (mode: SyncMode, state: SyncState, api: TConnector) => Promise<ListResponse>;
  private extractCursorFn?: (response: any) => string | undefined;
  private extractHasMoreFn?: (response: any) => boolean;
  
  withCollection(collection: Collection): this {
    this.collection = collection;
    return this;
  }

  withConnector<T>(connector: T): MultiModelSyncBuilder<T> {
    this.connector = connector;
    return this as any;
  }

  /**
   * Define common list/fetch logic used by all models
   */
  withCommonList(
    fn: (mode: SyncMode, state: SyncState, api: TConnector) => Promise<ListResponse>
  ): this {
    this.listFn = fn;
    return this;
  }

  /**
   * Define how to extract cursor from responses
   */
  withCursorExtraction(fn: (response: any) => string | undefined): this {
    this.extractCursorFn = fn;
    return this;
  }

  /**
   * Define how to determine if there are more pages
   */
  withPaginationDetection(fn: (response: any) => boolean): this {
    this.extractHasMoreFn = fn;
    return this;
  }

  /**
   * Add sync configuration for a specific model
   */
  forModel<TApi = any, TModel = any>(
    modelName: string,
    config: Omit<ModelSyncConfig<TApi, TModel>, 'model'>
  ): this {
    this.modelConfigs.set(modelName, {
      model: modelName,
      ...config
    } as ModelSyncConfig);
    return this;
  }

  build(): MultiModelSyncConnector<TConnector> {
    if (!this.collection || !this.connector) {
      throw new Error('Collection and connector are required');
    }
    if (!this.listFn) {
      throw new Error('Common list function is required');
    }
    if (this.modelConfigs.size === 0) {
      throw new Error('At least one model configuration is required');
    }

    return new MultiModelSyncConnector({
      collection: this.collection,
      connector: this.connector,
      modelConfigs: this.modelConfigs,
      listFn: this.listFn,
      extractCursorFn: this.extractCursorFn,
      extractHasMoreFn: this.extractHasMoreFn
    });
  }
}

// Sync connector implementation
class MultiModelSyncConnector<TConnector> {
  private config: any;
  private syncState: SyncState = {};

  constructor(config: any) {
    this.config = config;
  }

  async sync(mode: SyncMode = 'incremental'): Promise<SyncResult> {
    const result: SyncResult = {
      read: { created: 0, updated: 0, errors: [] },
      write: { created: 0, updated: 0, deleted: 0, errors: [] }
    };

    await this.performRead(mode, result);
    await this.performWrite(result);

    return result;
  }

  private async performRead(mode: SyncMode, result: SyncResult): Promise<void> {
    let hasMore = true;
    let state = mode === 'full' ? {} : this.syncState;

    while (hasMore) {
      // Use common list function
      const response = await this.config.listFn(mode, state, this.config.connector);
      
      // Process items for each model
      for (const [modelName, modelConfig] of this.config.modelConfigs) {
        // Extract items for this model
        const items = modelConfig.extractItems 
          ? modelConfig.extractItems(response)
          : response.items;

        for (const item of items) {
          try {
            // Apply model-specific filter
            if (modelConfig.shouldSync && !modelConfig.shouldSync(item)) {
              continue;
            }

            // Map using model-specific mapper
            const mapped = modelConfig.mapFromApi(item);
            if (!mapped) continue;

            // Check existence and create/update
            const exists = await this.checkExists(modelName, mapped.id);
            
            if (exists) {
              await this.updateInCollection(modelName, mapped.id, mapped.data);
              result.read.updated++;
            } else {
              await this.createInCollection(modelName, mapped.data);
              result.read.created++;
            }
          } catch (error) {
            result.read.errors.push({
              item,
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }
      }

      // Use common pagination logic
      hasMore = this.config.extractHasMoreFn 
        ? this.config.extractHasMoreFn(response)
        : response.hasMore || false;
        
      const cursor = this.config.extractCursorFn
        ? this.config.extractCursorFn(response)
        : response.nextState?.cursor;
        
      if (cursor) {
        state = { ...state, cursor };
      }
      if (response.nextState) {
        state = { ...state, ...response.nextState };
      }
    }

    this.syncState = state;
  }

  private async performWrite(result: SyncResult): Promise<void> {
    const changes = await this.getCollectionChanges();

    for (const change of changes) {
      const modelConfig = this.config.modelConfigs.get(change.model);
      if (!modelConfig) continue;

      try {
        const mapped = modelConfig.mapToApi(change.data, change.operation);
        const endpoint = modelConfig.getEndpoint(change.data, change.operation);

        await (this.config.connector as any).request({
          method: endpoint.method,
          path: endpoint.path,
          data: mapped
        });

        switch (change.operation) {
          case 'create':
            result.write.created++;
            break;
          case 'update':
            result.write.updated++;
            break;
          case 'delete':
            result.write.deleted++;
            break;
        }

        await this.markChangeSynced(change);
      } catch (error) {
        result.write.errors.push({
          change,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  }

  // Platform methods (same as before)
  private async checkExists(model: string, id: string): Promise<boolean> {
    throw new Error('Platform implementation required');
  }

  private async createInCollection(model: string, data: any): Promise<void> {
    throw new Error('Platform implementation required');
  }

  private async updateInCollection(model: string, id: string, data: any): Promise<void> {
    throw new Error('Platform implementation required');
  }

  private async getCollectionChanges(): Promise<any[]> {
    throw new Error('Platform implementation required');
  }

  private async markChangeSynced(change: any): Promise<void> {
    throw new Error('Platform implementation required');
  }
}

export interface SyncResult {
  read: {
    created: number;
    updated: number;
    errors: Array<{ item: any; error: string }>;
  };
  write: {
    created: number;
    updated: number;
    deleted: number;
    errors: Array<{ change: any; error: string }>;
  };
}

export function defineMultiModelSync(): MultiModelSyncBuilder<never> {
  return new MultiModelSyncBuilder();
}