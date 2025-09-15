import { Collection } from './types';
import { RestConnector } from './rest-connector';

/**
 * Sync Connector V2 - Builder-based approach
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

// Sync connector builder with inline configuration
export class SyncConnectorBuilder {
  private collection?: Collection;
  private restConnector?: RestConnector;
  
  // Functions that can be defined inline
  private listFn?: (mode: SyncMode, state: SyncState, api: RestConnector) => Promise<ListResponse>;
  private mapFromApiFn?: (item: any) => { model: string; id: string; data: any } | null;
  private mapToApiFn?: (data: any, operation: SyncOperation) => any;
  private getEndpointFn?: (data: any, operation: SyncOperation) => { path: string; method: string };
  
  // Optional customizations
  private resolveConflictFn?: (apiData: any, localData: any) => 'keepApi' | 'keepLocal' | 'merge';
  private shouldSyncFn?: (item: any) => boolean;

  withCollection(collection: Collection): this {
    this.collection = collection;
    return this;
  }

  withRestConnector(restConnector: RestConnector): this {
    this.restConnector = restConnector;
    return this;
  }

  /**
   * Define how to list/fetch data from the API
   */
  withList(
    fn: (mode: SyncMode, state: SyncState, api: RestConnector) => Promise<ListResponse>
  ): this {
    this.listFn = fn;
    return this;
  }

  /**
   * Define how to map from API format to collection format
   */
  withMapFromApi(
    fn: (item: any) => { model: string; id: string; data: any } | null
  ): this {
    this.mapFromApiFn = fn;
    return this;
  }

  /**
   * Define how to map from collection format to API format
   */
  withMapToApi(
    fn: (data: any, operation: SyncOperation) => any
  ): this {
    this.mapToApiFn = fn;
    return this;
  }

  /**
   * Define how to determine the API endpoint for write operations
   */
  withEndpoint(
    fn: (data: any, operation: SyncOperation) => { path: string; method: string }
  ): this {
    this.getEndpointFn = fn;
    return this;
  }

  /**
   * Optional: Define conflict resolution strategy
   */
  withConflictResolution(
    fn: (apiData: any, localData: any) => 'keepApi' | 'keepLocal' | 'merge'
  ): this {
    this.resolveConflictFn = fn;
    return this;
  }

  /**
   * Optional: Define a filter for which items should be synced
   */
  withFilter(fn: (item: any) => boolean): this {
    this.shouldSyncFn = fn;
    return this;
  }

  build(): SyncConnector {
    if (!this.collection || !this.restConnector) {
      throw new Error('Collection and RestConnector are required');
    }
    if (!this.listFn || !this.mapFromApiFn || !this.mapToApiFn || !this.getEndpointFn) {
      throw new Error('List, mapFromApi, mapToApi, and endpoint functions are required');
    }

    return new SyncConnector({
      collection: this.collection,
      restConnector: this.restConnector,
      listFn: this.listFn,
      mapFromApiFn: this.mapFromApiFn,
      mapToApiFn: this.mapToApiFn,
      getEndpointFn: this.getEndpointFn,
      resolveConflictFn: this.resolveConflictFn,
      shouldSyncFn: this.shouldSyncFn
    });
  }
}

// The actual sync connector (internal implementation)
class SyncConnector {
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

    // Read phase
    await this.performRead(mode, result);
    
    // Write phase
    await this.performWrite(result);

    return result;
  }

  private async performRead(mode: SyncMode, result: SyncResult): Promise<void> {
    let hasMore = true;
    let state = mode === 'full' ? {} : this.syncState;

    while (hasMore) {
      const response = await this.config.listFn(mode, state, this.config.restConnector);
      
      for (const item of response.items) {
        try {
          // Apply filter if defined
          if (this.config.shouldSyncFn && !this.config.shouldSyncFn(item)) {
            continue;
          }

          const mapped = this.config.mapFromApiFn(item);
          if (!mapped) continue;

          // Check if exists and create/update accordingly
          const exists = await this.checkExists(mapped.model, mapped.id);
          
          if (exists) {
            await this.updateInCollection(mapped.model, mapped.id, mapped.data);
            result.read.updated++;
          } else {
            await this.createInCollection(mapped.model, mapped.data);
            result.read.created++;
          }
        } catch (error) {
          result.read.errors.push({
            item,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      hasMore = response.hasMore || false;
      if (response.nextState) {
        state = { ...state, ...response.nextState };
      }
    }

    this.syncState = state;
  }

  private async performWrite(result: SyncResult): Promise<void> {
    const changes = await this.getCollectionChanges();

    for (const change of changes) {
      try {
        const mapped = this.config.mapToApiFn(change.data, change.operation);
        const endpoint = this.config.getEndpointFn(change.data, change.operation);

        await this.config.restConnector.request({
          method: endpoint.method as any,
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

  // Platform-provided methods
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

export function defineSyncConnector(): SyncConnectorBuilder {
  return new SyncConnectorBuilder();
}