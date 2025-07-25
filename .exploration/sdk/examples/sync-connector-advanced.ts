import { SyncConnector, ReadMapping, WriteMapping, SyncMode, SyncState, CollectionChange } from '../sync-connector';
import { defineSyncConnector } from '../sync-connector';
import { defineCollection, match } from '../builders';

/**
 * Advanced sync connector examples with custom behavior
 */

// Multi-model collection with complex mapping
const crmCollection = defineCollection('crm')
  .addModel('company', {
    matchPattern: match.or('companyId', 'domain'),
    schema: {
      type: 'object',
      properties: {
        companyId: { type: 'string' },
        name: { type: 'string' },
        domain: { type: 'string' },
        type: { type: 'string', enum: ['customer', 'prospect', 'partner'] }
      }
    }
  })
  .addModel('contact', {
    matchPattern: match.or('email', 'contactId'),
    schema: {
      type: 'object',
      properties: {
        contactId: { type: 'string' },
        email: { type: 'string' },
        companyId: { type: 'string' },
        role: { type: 'string' }
      }
    }
  })
  .addModel('deal', {
    matchPattern: 'dealId',
    schema: {
      type: 'object',
      properties: {
        dealId: { type: 'string' },
        companyId: { type: 'string' },
        amount: { type: 'number' },
        stage: { type: 'string' }
      }
    }
  })
  .build();

// Advanced Salesforce sync with multiple objects
class SalesforceCRMSyncConnector extends SyncConnector {
  private objectsToSync = ['Account', 'Contact', 'Opportunity'];
  private currentObjectIndex = 0;

  async list(mode: SyncMode, state: SyncState): Promise<{
    items: any[];
    nextState?: Partial<SyncState>;
    hasMore?: boolean;
  }> {
    const currentObject = this.objectsToSync[this.currentObjectIndex];
    
    // Build SOQL query based on mode
    let query = this.buildSOQLQuery(currentObject, mode, state);
    
    const response = await this.restConnector.get('/services/data/v58.0/query', {
      q: query
    });

    const hasMoreRecords = !!response.data.nextRecordsUrl;
    const hasMoreObjects = this.currentObjectIndex < this.objectsToSync.length - 1;

    // Move to next object if no more records
    if (!hasMoreRecords && hasMoreObjects) {
      this.currentObjectIndex++;
    }

    return {
      items: response.data.records.map((record: any) => ({
        ...record,
        _objectType: currentObject // Tag with object type
      })),
      nextState: {
        cursor: response.data.nextRecordsUrl,
        currentObject,
        lastSyncTime: new Date()
      },
      hasMore: hasMoreRecords || hasMoreObjects
    };
  }

  private buildSOQLQuery(objectType: string, mode: SyncMode, state: SyncState): string {
    const baseQuery = {
      Account: 'SELECT Id, Name, Website, Type FROM Account',
      Contact: 'SELECT Id, Email, AccountId, Title FROM Contact',
      Opportunity: 'SELECT Id, AccountId, Amount, StageName FROM Opportunity'
    }[objectType];

    if (mode === 'incremental' && state.lastSyncTime) {
      return `${baseQuery} WHERE LastModifiedDate > ${state.lastSyncTime.toISOString()}`;
    }

    return baseQuery!;
  }

  getReadMapping(): ReadMapping {
    return {
      map: (source: any) => {
        switch (source._objectType) {
          case 'Account':
            return {
              companyId: source.Id,
              name: source.Name,
              domain: source.Website,
              type: this.mapAccountType(source.Type)
            };
          
          case 'Contact':
            return {
              contactId: source.Id,
              email: source.Email,
              companyId: source.AccountId,
              role: source.Title
            };
          
          case 'Opportunity':
            return {
              dealId: source.Id,
              companyId: source.AccountId,
              amount: source.Amount,
              stage: source.StageName
            };
          
          default:
            return null;
        }
      },

      extractId: (source: any) => source.Id,

      determineModel: (source: any) => {
        switch (source._objectType) {
          case 'Account': return 'company';
          case 'Contact': return 'contact';
          case 'Opportunity': return 'deal';
          default: throw new Error(`Unknown object type: ${source._objectType}`);
        }
      }
    };
  }

  private mapAccountType(sfType: string): string {
    const mapping: Record<string, string> = {
      'Customer': 'customer',
      'Prospect': 'prospect',
      'Partner': 'partner'
    };
    return mapping[sfType] || 'prospect';
  }

  getWriteMapping(): WriteMapping {
    return {
      map: (source: any, operation: SyncOperation) => {
        // Determine Salesforce object type from model
        const model = this.determineModelType(source);
        
        switch (model) {
          case 'company':
            return {
              Name: source.name,
              Website: source.domain,
              Type: this.mapToSalesforceType(source.type)
            };
          
          case 'contact':
            return {
              Email: source.email,
              AccountId: source.companyId,
              Title: source.role
            };
          
          case 'deal':
            return {
              AccountId: source.companyId,
              Amount: source.amount,
              StageName: source.stage
            };
        }
      },

      getEndpoint: (source: any, operation: SyncOperation) => {
        const model = this.determineModelType(source);
        const sfObject = {
          'company': 'Account',
          'contact': 'Contact',
          'deal': 'Opportunity'
        }[model];

        const basePath = '/services/data/v58.0/sobjects';

        switch (operation) {
          case 'create':
            return {
              path: `${basePath}/${sfObject}`,
              method: 'POST'
            };
          case 'update':
            return {
              path: `${basePath}/${sfObject}/${source[model + 'Id']}`,
              method: 'PATCH'
            };
          case 'delete':
            return {
              path: `${basePath}/${sfObject}/${source[model + 'Id']}`,
              method: 'DELETE'
            };
        }
      }
    };
  }

  private determineModelType(source: any): string {
    if ('companyId' in source) return 'company';
    if ('contactId' in source) return 'contact';
    if ('dealId' in source) return 'deal';
    throw new Error('Unknown model type');
  }

  private mapToSalesforceType(type: string): string {
    const mapping: Record<string, string> = {
      'customer': 'Customer',
      'prospect': 'Prospect',
      'partner': 'Partner'
    };
    return mapping[type] || 'Prospect';
  }

  /**
   * Override conflict resolution for custom logic
   */
  protected async resolveConflict(
    apiData: any,
    collectionData: any,
    change: CollectionChange
  ): Promise<'keepApi' | 'keepCollection' | 'merge'> {
    // Example: For deals, always keep the higher amount
    if (change.model === 'deal') {
      const apiAmount = apiData.Amount || 0;
      const collectionAmount = collectionData.amount || 0;
      
      if (apiAmount > collectionAmount) {
        return 'keepApi';
      }
    }

    // Default: last write wins
    return 'keepCollection';
  }

  /**
   * Override to batch writes for better performance
   */
  protected async performWrite(result: SyncResult): Promise<void> {
    const changes = await this.getCollectionChanges();
    
    // Group changes by operation and model for batching
    const grouped = this.groupChangesForBatch(changes);
    
    for (const group of grouped) {
      if (group.operation === 'create' && group.model === 'contact') {
        // Use Salesforce composite API for batch creates
        await this.batchCreateContacts(group.changes, result);
      } else {
        // Fall back to individual operations
        for (const change of group.changes) {
          await this.writeSingleChange(change, result);
        }
      }
    }
  }

  private groupChangesForBatch(changes: CollectionChange[]) {
    // Group by operation and model
    const groups = new Map<string, CollectionChange[]>();
    
    for (const change of changes) {
      const key = `${change.operation}-${change.model}`;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(change);
    }

    return Array.from(groups.entries()).map(([key, changes]) => {
      const [operation, model] = key.split('-');
      return { operation, model, changes };
    });
  }

  private async batchCreateContacts(changes: CollectionChange[], result: SyncResult) {
    // Use Salesforce Composite API
    const compositeRequest = {
      compositeRequest: changes.map((change, index) => ({
        method: 'POST',
        url: '/services/data/v58.0/sobjects/Contact',
        referenceId: `contact_${index}`,
        body: this.getWriteMapping().map(change.data, 'create')
      }))
    };

    const response = await this.restConnector.post(
      '/services/data/v58.0/composite',
      compositeRequest
    );

    // Process results
    response.data.compositeResponse.forEach((res: any, index: number) => {
      if (res.httpStatusCode === 201) {
        result.write.created++;
        this.markChangeSynced(changes[index]);
      } else {
        result.write.errors.push({
          change: changes[index],
          error: res.body[0]?.message || 'Unknown error'
        });
      }
    });
  }

  private async writeSingleChange(change: CollectionChange, result: SyncResult) {
    // Implementation for single writes (reuse from base class)
    // ...
  }
}