import { SyncConnector, ReadMapping, WriteMapping, SyncMode, SyncState } from '../sync-connector';
import { defineSyncConnector } from '../sync-connector';
import { defineCollection } from '../builders';
import { defineRestConnector } from '../rest-connector';

/**
 * Basic sync connector example - HubSpot contacts
 */

// Define the collection
const contactsCollection = defineCollection('contacts')
  .addModel('contact', {
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        company: { type: 'string' }
      }
    },
    matchPattern: 'email'
  })
  .build();

// HubSpot sync connector implementation
class HubSpotContactsSyncConnector extends SyncConnector {
  /**
   * List contacts from HubSpot
   */
  async list(mode: SyncMode, state: SyncState): Promise<{
    items: any[];
    nextState?: Partial<SyncState>;
    hasMore?: boolean;
  }> {
    const limit = 100;
    const after = state.cursor;

    const response = await this.restConnector.get('/crm/v3/objects/contacts', {
      limit,
      after,
      properties: 'email,firstname,lastname,company',
      ...(mode === 'incremental' && state.lastSyncTime ? {
        filterGroups: [{
          filters: [{
            propertyName: 'lastmodifieddate',
            operator: 'GTE',
            value: state.lastSyncTime.toISOString()
          }]
        }]
      } : {})
    });

    return {
      items: response.data.results,
      nextState: {
        cursor: response.data.paging?.next?.after,
        lastSyncTime: new Date()
      },
      hasMore: !!response.data.paging?.next
    };
  }

  /**
   * Map HubSpot contact to collection format
   */
  getReadMapping(): ReadMapping {
    return {
      map: (source: any) => {
        // Skip invalid records
        if (!source.properties?.email) {
          return null;
        }

        return {
          id: source.id,
          email: source.properties.email,
          firstName: source.properties.firstname || '',
          lastName: source.properties.lastname || '',
          company: source.properties.company || ''
        };
      },

      extractId: (source: any) => source.id,

      determineModel: (source: any) => 'contact' // All map to contact model
    };
  }

  /**
   * Map collection data to HubSpot format for writes
   */
  getWriteMapping(): WriteMapping {
    return {
      map: (source: any, operation: SyncOperation) => {
        if (operation === 'delete') {
          return null; // No body needed for delete
        }

        return {
          properties: {
            email: source.email,
            firstname: source.firstName,
            lastname: source.lastName,
            company: source.company
          }
        };
      },

      getEndpoint: (source: any, operation: SyncOperation) => {
        switch (operation) {
          case 'create':
            return {
              path: '/crm/v3/objects/contacts',
              method: 'POST'
            };
          case 'update':
            return {
              path: `/crm/v3/objects/contacts/${source.id}`,
              method: 'PATCH'
            };
          case 'delete':
            return {
              path: `/crm/v3/objects/contacts/${source.id}`,
              method: 'DELETE'
            };
        }
      }
    };
  }
}

// Usage
const restConnector = defineRestConnector()
  .withBaseUrl('https://api.hubapi.com')
  .withAuthHeader('Authorization')
  .build(httpProxy, batchProxy);

const syncConnector = defineSyncConnector()
  .withCollection(contactsCollection)
  .withRestConnector(restConnector)
  .withConnectorClass(HubSpotContactsSyncConnector)
  .build();

// Perform sync
async function performSync() {
  // Full sync - gets all records
  const fullSyncResult = await syncConnector.sync('full');
  console.log('Full sync completed:', fullSyncResult);

  // Incremental sync - only changes since last sync
  const incrementalSyncResult = await syncConnector.sync('incremental');
  console.log('Incremental sync completed:', incrementalSyncResult);
}