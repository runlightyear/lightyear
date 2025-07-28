import { defineSyncConnector } from '../sync-connector-v2';
import { defineCollection } from '../builders';
import { defineRestConnector } from '../rest-connector';

/**
 * Sync connector examples using inline builder pattern
 */

// Define collection
const contactsCollection = defineCollection('contacts')
  .addModel('contact', {
    matchPattern: 'email',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
      }
    }
  })
  .build();

// Define REST connector
const restConnector = defineRestConnector()
  .withBaseUrl('https://api.hubapi.com')
  .withAuthHeader('Authorization')
  .build(httpProxy, batchProxy);

// Example 1: HubSpot contacts sync - all inline
const hubspotSync = defineSyncConnector()
  .withCollection(contactsCollection)
  .withRestConnector(restConnector)
  
  // Define how to list contacts
  .withList(async (mode, state, api) => {
    const response = await api.get('/crm/v3/objects/contacts', {
      limit: 100,
      after: state.cursor,
      properties: 'email,firstname,lastname',
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
  })
  
  // Define API → Collection mapping
  .withMapFromApi(item => {
    if (!item.properties?.email) {
      return null; // Skip items without email
    }

    return {
      model: 'contact',
      id: item.id,
      data: {
        id: item.id,
        email: item.properties.email,
        firstName: item.properties.firstname || '',
        lastName: item.properties.lastname || ''
      }
    };
  })
  
  // Define Collection → API mapping
  .withMapToApi((data, operation) => {
    if (operation === 'delete') {
      return null; // No body needed for delete
    }

    return {
      properties: {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName
      }
    };
  })
  
  // Define endpoints for each operation
  .withEndpoint((data, operation) => {
    switch (operation) {
      case 'create':
        return { path: '/crm/v3/objects/contacts', method: 'POST' };
      case 'update':
        return { path: `/crm/v3/objects/contacts/${data.id}`, method: 'PATCH' };
      case 'delete':
        return { path: `/crm/v3/objects/contacts/${data.id}`, method: 'DELETE' };
    }
  })
  
  .build();

// Example 2: Salesforce with multiple object types
const crmCollection = defineCollection('crm')
  .addModel('company', { matchPattern: 'companyId' })
  .addModel('contact', { matchPattern: 'email' })
  .addModel('deal', { matchPattern: 'dealId' })
  .build();

const salesforceSync = defineSyncConnector()
  .withCollection(crmCollection)
  .withRestConnector(restConnector)
  
  .withList(async (mode, state, api) => {
    // Handle multiple object types with state
    const objects = ['Account', 'Contact', 'Opportunity'];
    const currentObject = state.currentObject || objects[0];
    const objectIndex = objects.indexOf(currentObject);
    
    const query = buildSOQLQuery(currentObject, mode, state);
    const response = await api.get('/services/data/v58.0/query', { q: query });
    
    const hasMoreRecords = !!response.data.nextRecordsUrl;
    const hasMoreObjects = objectIndex < objects.length - 1;
    
    return {
      items: response.data.records.map((record: any) => ({
        ...record,
        _objectType: currentObject
      })),
      nextState: {
        currentObject: hasMoreRecords ? currentObject : objects[objectIndex + 1],
        cursor: response.data.nextRecordsUrl,
        lastSyncTime: new Date()
      },
      hasMore: hasMoreRecords || hasMoreObjects
    };
  })
  
  .withMapFromApi(item => {
    switch (item._objectType) {
      case 'Account':
        return {
          model: 'company',
          id: item.Id,
          data: {
            companyId: item.Id,
            name: item.Name,
            website: item.Website
          }
        };
      
      case 'Contact':
        return {
          model: 'contact',
          id: item.Id,
          data: {
            contactId: item.Id,
            email: item.Email,
            companyId: item.AccountId
          }
        };
      
      case 'Opportunity':
        return {
          model: 'deal',
          id: item.Id,
          data: {
            dealId: item.Id,
            companyId: item.AccountId,
            amount: item.Amount
          }
        };
      
      default:
        return null;
    }
  })
  
  .withMapToApi((data, operation) => {
    // Determine object type from data structure
    if ('companyId' in data && !('email' in data)) {
      return { Name: data.name, Website: data.website };
    } else if ('email' in data) {
      return { Email: data.email, AccountId: data.companyId };
    } else if ('dealId' in data) {
      return { AccountId: data.companyId, Amount: data.amount };
    }
  })
  
  .withEndpoint((data, operation) => {
    // Determine Salesforce object type
    let objectType = 'Account';
    if ('email' in data) objectType = 'Contact';
    else if ('dealId' in data) objectType = 'Opportunity';
    
    const basePath = '/services/data/v58.0/sobjects';
    
    switch (operation) {
      case 'create':
        return { path: `${basePath}/${objectType}`, method: 'POST' };
      case 'update':
        const id = data.companyId || data.contactId || data.dealId;
        return { path: `${basePath}/${objectType}/${id}`, method: 'PATCH' };
      case 'delete':
        const deleteId = data.companyId || data.contactId || data.dealId;
        return { path: `${basePath}/${objectType}/${deleteId}`, method: 'DELETE' };
    }
  })
  
  .build();

// Example 3: Simple sync with filtering
const activeUsersSync = defineSyncConnector()
  .withCollection(contactsCollection)
  .withRestConnector(restConnector)
  
  .withList(async (mode, state, api) => {
    const response = await api.get('/api/users', {
      page: state.page || 1,
      status: 'active' // Always filter to active users
    });
    
    return {
      items: response.data.users,
      nextState: { page: (state.page || 1) + 1 },
      hasMore: response.data.hasMore
    };
  })
  
  .withMapFromApi(user => ({
    model: 'contact',
    id: user.id,
    data: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name
    }
  }))
  
  .withMapToApi((data, operation) => ({
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName
  }))
  
  .withEndpoint((data, operation) => ({
    path: operation === 'create' ? '/api/users' : `/api/users/${data.id}`,
    method: operation === 'delete' ? 'DELETE' : operation === 'create' ? 'POST' : 'PUT'
  }))
  
  // Only sync users with company email addresses
  .withFilter(user => user.email.endsWith('@company.com'))
  
  // Keep API version for conflicts (API is source of truth)
  .withConflictResolution((apiData, localData) => 'keepApi')
  
  .build();

// Helper function
function buildSOQLQuery(objectType: string, mode: string, state: any): string {
  const fields = {
    Account: 'Id, Name, Website',
    Contact: 'Id, Email, AccountId',
    Opportunity: 'Id, AccountId, Amount'
  }[objectType];
  
  let query = `SELECT ${fields} FROM ${objectType}`;
  
  if (mode === 'incremental' && state.lastSyncTime) {
    query += ` WHERE LastModifiedDate > ${state.lastSyncTime.toISOString()}`;
  }
  
  return query;
}

// Usage
async function runSync() {
  // Full sync
  const fullResult = await hubspotSync.sync('full');
  console.log('Full sync:', fullResult);
  
  // Incremental sync
  const incrementalResult = await hubspotSync.sync('incremental');
  console.log('Incremental sync:', incrementalResult);
}