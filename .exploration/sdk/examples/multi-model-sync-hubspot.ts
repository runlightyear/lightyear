import { defineMultiModelSync } from '../sync-connector-multi-model';
import { defineCollection } from '../builders';
import { defineRestConnector } from '../rest-connector';

/**
 * HubSpot multi-model sync example
 */

// Define collection with multiple models
const crmCollection = defineCollection('crm')
  .addModel('company', {
    matchPattern: 'companyId'
  })
  .addModel('contact', {
    matchPattern: 'email'
  })
  .addModel('deal', {
    matchPattern: 'dealId'
  })
  .build();

const hubspotConnector = defineRestConnector()
  .withBaseUrl('https://api.hubapi.com')
  .withAuthHeader('Authorization')
  .build(httpProxy, batchProxy);

// Multi-model sync with shared logic
const hubspotCrmSync = defineMultiModelSync()
  .withCollection(crmCollection)
  .withConnector(hubspotConnector)
  
  // Common list logic - handles pagination for all object types
  .withCommonList(async (mode, state, api) => {
    // Determine which object type we're currently syncing
    const objectTypes = ['companies', 'contacts', 'deals'];
    const currentTypeIndex = state.currentTypeIndex || 0;
    const currentType = objectTypes[currentTypeIndex];
    
    // Common request structure for all HubSpot objects
    const params: any = {
      limit: 100,
      properties: getPropertiesForType(currentType),
      after: state.cursor
    };
    
    // Add incremental filter if needed
    if (mode === 'incremental' && state.lastSyncTime) {
      params.filterGroups = [{
        filters: [{
          propertyName: 'hs_lastmodifieddate',
          operator: 'GTE',
          value: state.lastSyncTime.toISOString()
        }]
      }];
    }
    
    const response = await api.get(`/crm/v3/objects/${currentType}`, params);
    
    // Check if we need to move to next object type
    const hasMoreOfCurrentType = !!response.data.paging?.next;
    const hasMoreTypes = currentTypeIndex < objectTypes.length - 1;
    
    return {
      items: response.data.results.map((item: any) => ({
        ...item,
        _objectType: currentType // Tag with type for model routing
      })),
      nextState: {
        cursor: hasMoreOfCurrentType ? response.data.paging.next.after : undefined,
        currentTypeIndex: hasMoreOfCurrentType ? currentTypeIndex : currentTypeIndex + 1,
        lastSyncTime: new Date()
      },
      hasMore: hasMoreOfCurrentType || hasMoreTypes
    };
  })
  
  // Common cursor extraction
  .withCursorExtraction(response => response.data?.paging?.next?.after)
  
  // Common pagination detection
  .withPaginationDetection(response => !!response.data?.paging?.next)
  
  // Company-specific configuration
  .forModel('company', {
    extractItems: response => 
      response.items.filter((item: any) => item._objectType === 'companies'),
    
    mapFromApi: (item: any) => ({
      id: item.id,
      data: {
        companyId: item.id,
        name: item.properties.name,
        domain: item.properties.domain,
        industry: item.properties.industry,
        size: item.properties.numberofemployees
      }
    }),
    
    mapToApi: (data: any, operation) => ({
      properties: {
        name: data.name,
        domain: data.domain,
        industry: data.industry,
        numberofemployees: data.size
      }
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create' 
        ? '/crm/v3/objects/companies'
        : `/crm/v3/objects/companies/${data.companyId}`,
      method: operation === 'delete' ? 'DELETE' : operation === 'create' ? 'POST' : 'PATCH'
    })
  })
  
  // Contact-specific configuration
  .forModel('contact', {
    extractItems: response => 
      response.items.filter((item: any) => item._objectType === 'contacts'),
    
    mapFromApi: (item: any) => ({
      id: item.id,
      data: {
        contactId: item.id,
        email: item.properties.email,
        firstName: item.properties.firstname,
        lastName: item.properties.lastname,
        companyId: item.properties.associatedcompanyid
      }
    }),
    
    mapToApi: (data: any, operation) => ({
      properties: {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        associatedcompanyid: data.companyId
      }
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create'
        ? '/crm/v3/objects/contacts'
        : `/crm/v3/objects/contacts/${data.contactId}`,
      method: operation === 'delete' ? 'DELETE' : operation === 'create' ? 'POST' : 'PATCH'
    }),
    
    // Only sync contacts with email
    shouldSync: (item: any) => !!item.properties?.email
  })
  
  // Deal-specific configuration
  .forModel('deal', {
    extractItems: response => 
      response.items.filter((item: any) => item._objectType === 'deals'),
    
    mapFromApi: (item: any) => ({
      id: item.id,
      data: {
        dealId: item.id,
        name: item.properties.dealname,
        amount: parseFloat(item.properties.amount || '0'),
        stage: item.properties.dealstage,
        closeDate: item.properties.closedate,
        companyId: item.properties.associatedcompanyid
      }
    }),
    
    mapToApi: (data: any, operation) => ({
      properties: {
        dealname: data.name,
        amount: data.amount.toString(),
        dealstage: data.stage,
        closedate: data.closeDate,
        associatedcompanyid: data.companyId
      }
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create'
        ? '/crm/v3/objects/deals'
        : `/crm/v3/objects/deals/${data.dealId}`,
      method: operation === 'delete' ? 'DELETE' : operation === 'create' ? 'POST' : 'PATCH'
    }),
    
    // Only sync deals above certain amount
    shouldSync: (item: any) => parseFloat(item.properties?.amount || '0') > 1000
  })
  
  .build();

// Helper function shared across models
function getPropertiesForType(objectType: string): string {
  const propertyMap: Record<string, string> = {
    companies: 'name,domain,industry,numberofemployees',
    contacts: 'email,firstname,lastname,associatedcompanyid',
    deals: 'dealname,amount,dealstage,closedate,associatedcompanyid'
  };
  return propertyMap[objectType] || '';
}

// Usage
async function syncHubSpot() {
  // Full sync of all CRM data
  const fullResult = await hubspotCrmSync.sync('full');
  console.log('Full sync completed:', fullResult);
  
  // Incremental sync of changes
  const incrementalResult = await hubspotCrmSync.sync('incremental');
  console.log('Incremental sync completed:', incrementalResult);
}