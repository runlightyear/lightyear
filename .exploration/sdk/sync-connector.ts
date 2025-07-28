import { Collection, Model } from './types';
import { RestConnector } from './rest-connector';

/**
 * Sync Connector - handles bidirectional data synchronization
 */

// Sync operation types
export type SyncOperation = 'create' | 'update' | 'delete';
export type SyncMode = 'full' | 'incremental';

// Change tracking from collection
export interface CollectionChange {
  operation: SyncOperation;
  model: string;
  data: any;
  previousData?: any; // For updates
  metadata?: {
    timestamp: Date;
    version?: string;
  };
}

// Mapping interfaces
export interface ReadMapping<TSource = any, TTarget = any> {
  /**
   * Map data from API to collection model
   */
  map(source: TSource): TTarget | null;
  
  /**
   * Extract unique identifier for matching
   */
  extractId(source: TSource): string;
  
  /**
   * Determine which model in the collection this maps to
   */
  determineModel(source: TSource): string;
}

export interface WriteMapping<TSource = any, TTarget = any> {
  /**
   * Map from collection model to API format
   */
  map(source: TSource, operation: SyncOperation): TTarget;
  
  /**
   * Determine API endpoint/method for this operation
   */
  getEndpoint(source: TSource, operation: SyncOperation): {
    path: string;
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  };
}

// Sync state management
export interface SyncState {
  lastSyncTime?: Date;
  cursor?: string;
  version?: string;
  [key: string]: any;
}

// Main sync connector
export abstract class SyncConnector {
  protected collection: Collection;
  protected restConnector: RestConnector;
  protected syncState: SyncState = {};

  constructor(collection: Collection, restConnector: RestConnector) {
    this.collection = collection;
    this.restConnector = restConnector;
  }

  /**
   * Define how to list/read data from the API
   */
  abstract async list(mode: SyncMode, state: SyncState): Promise<{
    items: any[];
    nextState?: Partial<SyncState>;
    hasMore?: boolean;
  }>;

  /**
   * Define read mapping from API to collection
   */
  abstract getReadMapping(): ReadMapping;

  /**
   * Define write mapping from collection to API
   */
  abstract getWriteMapping(): WriteMapping;

  /**
   * Main sync method - orchestrates the full sync process
   */
  async sync(mode: SyncMode = 'incremental'): Promise<SyncResult> {
    const result: SyncResult = {
      read: { created: 0, updated: 0, errors: [] },
      write: { created: 0, updated: 0, deleted: 0, errors: [] }
    };

    // Phase 1: Read from API and update collection
    await this.performRead(mode, result);

    // Phase 2: Get changes from collection and write to API
    await this.performWrite(result);

    return result;
  }

  /**
   * Read phase - fetch from API and update collection
   */
  protected async performRead(mode: SyncMode, result: SyncResult): Promise<void> {
    const readMapping = this.getReadMapping();
    let hasMore = true;
    let state = mode === 'full' ? {} : this.syncState;

    while (hasMore) {
      const response = await this.list(mode, state);
      
      for (const item of response.items) {
        try {
          const mapped = readMapping.map(item);
          if (!mapped) continue;

          const id = readMapping.extractId(item);
          const model = readMapping.determineModel(item);

          // Check if exists in collection
          const exists = await this.checkExists(model, id);
          
          if (exists) {
            await this.updateInCollection(model, id, mapped);
            result.read.updated++;
          } else {
            await this.createInCollection(model, mapped);
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

    // Update sync state
    this.syncState = state;
  }

  /**
   * Write phase - push collection changes to API
   */
  protected async performWrite(result: SyncResult): Promise<void> {
    const writeMapping = this.getWriteMapping();
    const changes = await this.getCollectionChanges();

    for (const change of changes) {
      try {
        const mapped = writeMapping.map(change.data, change.operation);
        const endpoint = writeMapping.getEndpoint(change.data, change.operation);

        await this.restConnector.request({
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

        // Mark change as synced
        await this.markChangeSynced(change);
      } catch (error) {
        result.write.errors.push({
          change,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  }

  /**
   * Get pending changes from collection
   * Override to customize change detection
   */
  protected async getCollectionChanges(): Promise<CollectionChange[]> {
    // Platform will provide this functionality
    throw new Error('Platform implementation required');
  }

  /**
   * Check if record exists in collection
   */
  protected async checkExists(model: string, id: string): Promise<boolean> {
    // Platform will provide this functionality
    throw new Error('Platform implementation required');
  }

  /**
   * Create record in collection
   */
  protected async createInCollection(model: string, data: any): Promise<void> {
    // Platform will provide this functionality
    throw new Error('Platform implementation required');
  }

  /**
   * Update record in collection
   */
  protected async updateInCollection(model: string, id: string, data: any): Promise<void> {
    // Platform will provide this functionality
    throw new Error('Platform implementation required');
  }

  /**
   * Mark a change as synced
   */
  protected async markChangeSynced(change: CollectionChange): Promise<void> {
    // Platform will provide this functionality
    throw new Error('Platform implementation required');
  }

  /**
   * Handle conflicts between API and collection
   * Override to customize conflict resolution
   */
  protected async resolveConflict(
    apiData: any,
    collectionData: any,
    change: CollectionChange
  ): Promise<'keepApi' | 'keepCollection' | 'merge'> {
    // Default: last write wins (keep collection changes)
    return 'keepCollection';
  }
}

// Sync result tracking
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
    errors: Array<{ change: CollectionChange; error: string }>;
  };
}

// Builder for sync connector
export class SyncConnectorBuilder {
  private collection?: Collection;
  private restConnector?: RestConnector;
  private connectorClass?: typeof SyncConnector;

  withCollection(collection: Collection): this {
    this.collection = collection;
    return this;
  }

  withRestConnector(restConnector: RestConnector): this {
    this.restConnector = restConnector;
    return this;
  }

  withConnectorClass(connectorClass: typeof SyncConnector): this {
    this.connectorClass = connectorClass;
    return this;
  }

  build(): SyncConnector {
    if (!this.collection || !this.restConnector || !this.connectorClass) {
      throw new Error('Collection, RestConnector, and connector class are required');
    }

    return new this.connectorClass(this.collection, this.restConnector);
  }
}

export function defineSyncConnector(): SyncConnectorBuilder {
  return new SyncConnectorBuilder();
}