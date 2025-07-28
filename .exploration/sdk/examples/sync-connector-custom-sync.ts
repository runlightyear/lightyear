import { SyncConnector, SyncMode, SyncState, SyncResult } from '../sync-connector';

/**
 * Examples of custom sync strategies
 */

// Example 1: Webhook-based sync (no polling needed)
class WebhookSyncConnector extends SyncConnector {
  async list(mode: SyncMode, state: SyncState) {
    // Webhook sync doesn't need to list - events come to us
    return { items: [], hasMore: false };
  }

  getReadMapping() {
    return {
      map: (source: any) => source,
      extractId: (source: any) => source.id,
      determineModel: (source: any) => 'event'
    };
  }

  getWriteMapping() {
    return {
      map: (source: any) => source,
      getEndpoint: () => ({ path: '/webhook', method: 'POST' as const })
    };
  }

  /**
   * Override sync to skip read phase for webhook-based updates
   */
  async sync(mode: SyncMode = 'incremental'): Promise<SyncResult> {
    const result: SyncResult = {
      read: { created: 0, updated: 0, errors: [] },
      write: { created: 0, updated: 0, deleted: 0, errors: [] }
    };

    // Only perform write phase - webhook handles reads
    await this.performWrite(result);

    return result;
  }

  /**
   * Process webhook event (called by platform when webhook received)
   */
  async processWebhookEvent(event: any): Promise<void> {
    const mapping = this.getReadMapping();
    const mapped = mapping.map(event.data);
    const id = mapping.extractId(event.data);
    const model = mapping.determineModel(event.data);

    switch (event.type) {
      case 'created':
        await this.createInCollection(model, mapped);
        break;
      case 'updated':
        await this.updateInCollection(model, id, mapped);
        break;
      case 'deleted':
        await this.deleteFromCollection(model, id);
        break;
    }
  }

  private async deleteFromCollection(model: string, id: string): Promise<void> {
    // Platform implementation
    throw new Error('Platform implementation required');
  }
}

// Example 2: Cursor-based sync with custom state management
class CursorSyncConnector extends SyncConnector {
  async list(mode: SyncMode, state: SyncState) {
    // Use cursor for efficient pagination
    const response = await this.restConnector.post('/graphql', {
      query: `
        query ListItems($cursor: String, $since: DateTime) {
          items(
            first: 100,
            after: $cursor,
            ${mode === 'incremental' ? 'modifiedSince: $since' : ''}
          ) {
            edges {
              node {
                id
                data
                modifiedAt
              }
              cursor
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `,
      variables: {
        cursor: state.cursor,
        since: state.lastSyncTime
      }
    });

    const items = response.data.data.items.edges.map((edge: any) => edge.node);
    const pageInfo = response.data.data.items.pageInfo;

    return {
      items,
      nextState: {
        cursor: pageInfo.endCursor,
        lastSyncTime: new Date()
      },
      hasMore: pageInfo.hasNextPage
    };
  }

  getReadMapping() {
    return {
      map: (source: any) => source.data,
      extractId: (source: any) => source.id,
      determineModel: (source: any) => 'item'
    };
  }

  getWriteMapping() {
    return {
      map: (source: any) => ({ data: source }),
      getEndpoint: (source: any, operation: string) => ({
        path: `/items/${source.id}`,
        method: operation === 'create' ? 'POST' : 'PUT' as any
      })
    };
  }
}

// Example 3: Delta sync with change tracking
class DeltaSyncConnector extends SyncConnector {
  async list(mode: SyncMode, state: SyncState) {
    if (mode === 'full') {
      // Full sync - get snapshot
      const response = await this.restConnector.get('/api/snapshot');
      return {
        items: response.data.items,
        nextState: {
          snapshotId: response.data.snapshotId,
          version: response.data.version
        }
      };
    } else {
      // Incremental - get deltas since last version
      const response = await this.restConnector.get('/api/deltas', {
        since: state.version || 0
      });

      return {
        items: response.data.changes,
        nextState: {
          version: response.data.currentVersion
        }
      };
    }
  }

  getReadMapping() {
    return {
      map: (source: any) => {
        // Handle different change types
        if (source.changeType === 'delete') {
          return null; // Will trigger deletion
        }
        return source.data;
      },
      extractId: (source: any) => source.id || source.data?.id,
      determineModel: (source: any) => source.objectType || 'record'
    };
  }

  getWriteMapping() {
    return {
      map: (source: any, operation: string) => ({
        ...source,
        changeType: operation,
        timestamp: new Date().toISOString()
      }),
      getEndpoint: () => ({
        path: '/api/changes',
        method: 'POST' as const
      })
    };
  }

  /**
   * Override read phase to handle deletes
   */
  protected async performRead(mode: SyncMode, result: SyncResult): Promise<void> {
    const readMapping = this.getReadMapping();
    const response = await this.list(mode, this.syncState);

    for (const item of response.items) {
      if (item.changeType === 'delete') {
        // Handle deletion
        await this.deleteFromCollection(
          readMapping.determineModel(item),
          readMapping.extractId(item)
        );
        continue;
      }

      // Regular create/update handling
      await super.performRead(mode, result);
    }
  }

  private async deleteFromCollection(model: string, id: string): Promise<void> {
    // Platform implementation
    throw new Error('Platform implementation required');
  }
}

// Example 4: Sync with custom scheduling and rate limiting
class RateLimitedSyncConnector extends SyncConnector {
  private requestCount = 0;
  private resetTime = Date.now() + 3600000; // 1 hour
  private maxRequests = 1000;

  async list(mode: SyncMode, state: SyncState) {
    await this.checkRateLimit();
    
    // Regular list implementation
    const response = await this.restConnector.get('/api/records', {
      page: state.page || 1,
      pageSize: 50
    });

    this.requestCount++;

    return {
      items: response.data.records,
      nextState: {
        page: (state.page || 1) + 1
      },
      hasMore: response.data.hasMore
    };
  }

  private async checkRateLimit(): Promise<void> {
    if (Date.now() > this.resetTime) {
      // Reset counter
      this.requestCount = 0;
      this.resetTime = Date.now() + 3600000;
    }

    if (this.requestCount >= this.maxRequests) {
      // Wait until reset
      const waitTime = this.resetTime - Date.now();
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requestCount = 0;
    }
  }

  /**
   * Override sync to add scheduling logic
   */
  async sync(mode: SyncMode = 'incremental'): Promise<SyncResult> {
    // Check if enough time has passed for incremental sync
    if (mode === 'incremental') {
      const lastSync = this.syncState.lastSyncTime;
      if (lastSync) {
        const timeSinceLastSync = Date.now() - lastSync.getTime();
        const minSyncInterval = 300000; // 5 minutes
        
        if (timeSinceLastSync < minSyncInterval) {
          console.log('Skipping sync - too soon since last sync');
          return {
            read: { created: 0, updated: 0, errors: [] },
            write: { created: 0, updated: 0, deleted: 0, errors: [] }
          };
        }
      }
    }

    return super.sync(mode);
  }

  getReadMapping() {
    return {
      map: (source: any) => source,
      extractId: (source: any) => source.id,
      determineModel: (source: any) => 'record'
    };
  }

  getWriteMapping() {
    return {
      map: (source: any) => source,
      getEndpoint: (source: any, operation: string) => ({
        path: `/api/records/${source.id}`,
        method: 'PUT' as const
      })
    };
  }
}