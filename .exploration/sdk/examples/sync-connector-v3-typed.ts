import { defineSyncConnector } from '../sync-connector-v3';
import { defineRestConnector, RestConnector } from '../rest-connector';
import { defineGraphQLConnector, GraphQLConnector } from '../graphql-connector';
import { defineBatchRestConnector, BatchRestConnector } from '../rest-connector';

/**
 * Examples showing how connector types flow through the sync builder
 */

// Example 1: Custom REST connector with extra methods
class HubSpotRestConnector extends RestConnector {
  // Custom method for HubSpot-specific batch operations
  async batchGetContacts(ids: string[]) {
    return this.post('/crm/v3/objects/contacts/batch/read', {
      inputs: ids.map(id => ({ id }))
    });
  }

  // Custom search method
  async searchContacts(query: string) {
    return this.post('/crm/v3/objects/contacts/search', {
      filterGroups: [{
        filters: [{
          propertyName: 'email',
          operator: 'CONTAINS',
          value: query
        }]
      }]
    });
  }
}

// Create typed connector
const hubspotConnector = new HubSpotRestConnector(
  { baseUrl: 'https://api.hubapi.com' },
  httpProxy,
  batchProxy
);

// Sync connector with properly typed API parameter
const hubspotSync = defineSyncConnector()
  .withCollection(contactsCollection)
  .withRestConnector(hubspotConnector) // Sets type to HubSpotRestConnector
  
  .withList(async (mode, state, api) => {
    // 'api' is now typed as HubSpotRestConnector
    // IntelliSense shows custom methods!
    
    if (mode === 'incremental' && state.lastSyncIds) {
      // Use custom batch method - type-safe!
      const response = await api.batchGetContacts(state.lastSyncIds);
      return {
        items: response.data.results,
        hasMore: false
      };
    }
    
    // Use custom search method - type-safe!
    const searchResults = await api.searchContacts('@company.com');
    
    // Standard REST methods still available
    const standardResponse = await api.get('/crm/v3/objects/contacts', {
      limit: 100,
      after: state.cursor
    });
    
    return {
      items: standardResponse.data.results,
      nextState: { cursor: standardResponse.data.paging?.next?.after },
      hasMore: !!standardResponse.data.paging?.next
    };
  })
  
  .withMapFromApi(item => ({
    model: 'contact',
    id: item.id,
    data: item.properties
  }))
  
  .withMapToApi((data) => ({ properties: data }))
  
  .withEndpoint((data, operation) => ({
    path: operation === 'create' 
      ? '/crm/v3/objects/contacts'
      : `/crm/v3/objects/contacts/${data.id}`,
    method: operation === 'delete' ? 'DELETE' : operation === 'create' ? 'POST' : 'PATCH'
  }))
  
  .build();

// Example 2: GraphQL connector with typed queries
const graphqlConnector = defineGraphQLConnector()
  .withEndpoint('https://api.example.com/graphql')
  .build(httpProxy);

const graphqlSync = defineSyncConnector()
  .withCollection(ordersCollection)
  .withGraphQLConnector(graphqlConnector) // Sets type to GraphQLConnector
  
  .withList(async (mode, state, api) => {
    // 'api' is now typed as GraphQLConnector
    // Has query() and mutation() methods
    
    const response = await api.query<{
      orders: {
        edges: Array<{ node: Order }>;
        pageInfo: { hasNextPage: boolean; endCursor: string };
      };
    }>(`
      query GetOrders($cursor: String) {
        orders(first: 50, after: $cursor) {
          edges { node { id, total, status } }
          pageInfo { hasNextPage, endCursor }
        }
      }
    `, { cursor: state.cursor });
    
    return {
      items: response.data!.orders.edges.map(e => e.node),
      nextState: { cursor: response.data!.orders.pageInfo.endCursor },
      hasMore: response.data!.orders.pageInfo.hasNextPage
    };
  })
  
  .withMapFromApi(order => ({
    model: 'order',
    id: order.id,
    data: order
  }))
  
  // GraphQL mutations for writes
  .withMapToApi((data, operation) => ({
    mutation: getMutationForOperation(operation),
    variables: { input: data }
  }))
  
  .withEndpoint(() => ({ path: '/graphql', method: 'POST' }))
  
  .build();

// Example 3: Batch REST connector with native batch support
const batchConnector = defineBatchRestConnector()
  .withBaseUrl('https://api.salesforce.com')
  .withBatchClientClass(SalesforceBatchApiClient)
  .build(httpProxy, batchProxy);

const batchSync = defineSyncConnector()
  .withCollection(crmCollection)
  .withRestConnector(batchConnector) // Type is BatchRestConnector
  
  .withList(async (mode, state, api) => {
    // 'api' has batchWrite() method available
    const response = await api.get('/services/data/v58.0/query', {
      q: 'SELECT Id, Name FROM Account'
    });
    
    return {
      items: response.data.records,
      hasMore: false
    };
  })
  
  .withMapFromApi(record => ({
    model: 'account',
    id: record.Id,
    data: record
  }))
  
  .withMapToApi((data) => data)
  
  .withEndpoint((data, operation) => ({
    path: `/services/data/v58.0/sobjects/Account/${data.Id}`,
    method: 'PATCH'
  }))
  
  .build();

// Override performWrite to use batch capabilities
(batchSync as any).performWrite = async function(result: any) {
  const changes = await this.getCollectionChanges();
  
  // Use the properly typed batchWrite method
  const batchResults = await this.config.connector.batchWrite(
    changes.map((change: any) => ({
      method: change.operation === 'create' ? 'POST' : 'PATCH',
      path: `/services/data/v58.0/sobjects/Account${change.data.Id ? '/' + change.data.Id : ''}`,
      data: this.config.mapToApiFn(change.data, change.operation)
    }))
  );
  
  // Process results...
};

// Example 4: Generic connector with custom interface
interface CustomConnector {
  fetchData(params: any): Promise<any>;
  pushData(data: any): Promise<any>;
}

const customConnector: CustomConnector = {
  async fetchData(params) {
    return { items: [], total: 0 };
  },
  async pushData(data) {
    return { success: true };
  }
};

const customSync = defineSyncConnector()
  .withCollection(genericCollection)
  .withConnector(customConnector) // Generic - type is CustomConnector
  
  .withList(async (mode, state, api) => {
    // 'api' is typed as CustomConnector
    const result = await api.fetchData({ page: state.page });
    
    return {
      items: result.items,
      hasMore: result.items.length > 0
    };
  })
  
  .withMapFromApi(item => ({
    model: 'item',
    id: item.id,
    data: item
  }))
  
  .withMapToApi((data) => data)
  
  .withEndpoint(() => ({ path: '/', method: 'POST' }))
  
  .build();

// Type helpers
interface Order {
  id: string;
  total: number;
  status: string;
}

function getMutationForOperation(operation: string): string {
  switch (operation) {
    case 'create':
      return 'mutation CreateOrder($input: OrderInput!) { createOrder(input: $input) { id } }';
    case 'update':
      return 'mutation UpdateOrder($id: ID!, $input: OrderInput!) { updateOrder(id: $id, input: $input) { id } }';
    case 'delete':
      return 'mutation DeleteOrder($id: ID!) { deleteOrder(id: $id) { success } }';
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}