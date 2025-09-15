import { defineSyncConnector, SyncMode } from '../sync-connector-v2';
import { defineGraphQLConnector } from '../graphql-connector';

/**
 * Advanced sync patterns with inline configuration
 */

// Example 1: GraphQL sync with cursor pagination
const graphqlConnector = defineGraphQLConnector()
  .withEndpoint('https://api.example.com/graphql')
  .build(httpProxy);

const graphqlSync = defineSyncConnector()
  .withCollection(ordersCollection)
  .withRestConnector(restConnector) // Still need REST for some operations
  
  .withList(async (mode, state, api) => {
    // Use GraphQL for efficient querying
    const query = `
      query GetOrders($cursor: String, $since: DateTime) {
        orders(
          first: 50,
          after: $cursor
          ${mode === 'incremental' ? 'modifiedSince: $since' : ''}
        ) {
          edges {
            node {
              id
              orderNumber
              customer { id, email }
              items { sku, quantity, price }
              total
              status
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;
    
    const response = await graphqlConnector.query(query, {
      cursor: state.cursor,
      since: state.lastSyncTime
    });
    
    return {
      items: response.data.orders.edges.map((e: any) => e.node),
      nextState: {
        cursor: response.data.orders.pageInfo.endCursor,
        lastSyncTime: new Date()
      },
      hasMore: response.data.orders.pageInfo.hasNextPage
    };
  })
  
  .withMapFromApi(order => ({
    model: 'order',
    id: order.id,
    data: {
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customer.id,
      customerEmail: order.customer.email,
      items: order.items,
      total: order.total,
      status: order.status
    }
  }))
  
  .withMapToApi((data, operation) => {
    // Use GraphQL mutations for writes
    if (operation === 'create') {
      return {
        mutation: `
          mutation CreateOrder($input: CreateOrderInput!) {
            createOrder(input: $input) { id }
          }
        `,
        variables: {
          input: {
            customerId: data.customerId,
            items: data.items
          }
        }
      };
    }
    // ... other operations
  })
  
  .withEndpoint((data, operation) => {
    // GraphQL always uses POST to the same endpoint
    return { path: '/graphql', method: 'POST' };
  })
  
  .build();

// Example 2: Webhook-driven sync (no polling)
const webhookSync = defineSyncConnector()
  .withCollection(eventsCollection)
  .withRestConnector(restConnector)
  
  // Webhook sync doesn't poll - it processes events
  .withList(async (mode, state, api) => {
    if (mode === 'full') {
      // Initial load gets historical data
      const response = await api.get('/api/events/history', {
        limit: 1000,
        since: state.lastEventId
      });
      
      return {
        items: response.data.events,
        nextState: {
          lastEventId: response.data.lastEventId
        },
        hasMore: response.data.hasMore
      };
    }
    
    // Incremental mode returns empty - webhooks handle updates
    return { items: [], hasMore: false };
  })
  
  .withMapFromApi(event => ({
    model: 'event',
    id: event.id,
    data: event
  }))
  
  .withMapToApi((data) => data)
  
  .withEndpoint(() => ({ 
    path: '/api/events/ack', 
    method: 'POST' 
  }))
  
  .build();

// Add webhook processor method
(webhookSync as any).processWebhook = async (payload: any) => {
  // Process incoming webhook
  const mapped = {
    model: 'event',
    id: payload.id,
    data: payload
  };
  
  // Direct write to collection
  await createInCollection(mapped.model, mapped.data);
};

// Example 3: Batch-optimized sync
const batchSync = defineSyncConnector()
  .withCollection(productsCollection)
  .withRestConnector(restConnector)
  
  .withList(async (mode, state, api) => {
    // Always get full catalog with checksums
    const response = await api.get('/api/products/catalog', {
      format: 'checksum',
      since: mode === 'incremental' ? state.version : undefined
    });
    
    // Only return items that changed
    const changedItems = response.data.products.filter((p: any) => 
      !state.checksums?.[p.id] || state.checksums[p.id] !== p.checksum
    );
    
    return {
      items: changedItems,
      nextState: {
        version: response.data.version,
        checksums: response.data.products.reduce((acc: any, p: any) => ({
          ...acc,
          [p.id]: p.checksum
        }), {})
      },
      hasMore: false
    };
  })
  
  .withMapFromApi(product => ({
    model: 'product',
    id: product.id,
    data: {
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      inventory: product.inventory
    }
  }))
  
  .withMapToApi((data, operation) => {
    // Batch operations use different format
    return {
      operation,
      id: data.id,
      data: operation === 'delete' ? null : {
        sku: data.sku,
        name: data.name,
        price: data.price
      }
    };
  })
  
  .withEndpoint((data, operation) => {
    // Always use batch endpoint
    return { path: '/api/products/batch', method: 'POST' };
  })
  
  .build();

// Override write phase to use native batching
(batchSync as any).performWrite = async function(result: any) {
  const changes = await this.getCollectionChanges();
  
  // Group changes into batches of 100
  const batches = [];
  for (let i = 0; i < changes.length; i += 100) {
    batches.push(changes.slice(i, i + 100));
  }
  
  for (const batch of batches) {
    const batchRequest = {
      operations: batch.map((change: any) => 
        this.config.mapToApiFn(change.data, change.operation)
      )
    };
    
    const response = await this.config.restConnector.post(
      '/api/products/batch',
      batchRequest
    );
    
    // Process batch response
    response.data.results.forEach((res: any, index: number) => {
      if (res.success) {
        result.write[batch[index].operation + 'ed']++;
      } else {
        result.write.errors.push({
          change: batch[index],
          error: res.error
        });
      }
    });
  }
};

// Example 4: Smart incremental sync with change detection
const smartSync = defineSyncConnector()
  .withCollection(customersCollection)
  .withRestConnector(restConnector)
  
  .withList(async (mode, state, api) => {
    if (mode === 'full') {
      // Full sync gets everything
      return paginate(api, '/api/customers', state.page);
    }
    
    // Incremental mode uses multiple strategies
    const [updates, creates, deletes] = await Promise.all([
      // Get updated records
      api.get('/api/customers/changes', {
        type: 'update',
        since: state.lastSyncTime
      }),
      // Get new records
      api.get('/api/customers/changes', {
        type: 'create',
        since: state.lastSyncTime
      }),
      // Get deleted record IDs
      api.get('/api/customers/changes', {
        type: 'delete',
        since: state.lastSyncTime
      })
    ]);
    
    return {
      items: [
        ...updates.data.map((u: any) => ({ ...u, _change: 'update' })),
        ...creates.data.map((c: any) => ({ ...c, _change: 'create' })),
        ...deletes.data.map((d: any) => ({ id: d, _change: 'delete' }))
      ],
      nextState: {
        lastSyncTime: new Date()
      },
      hasMore: false
    };
  })
  
  .withMapFromApi(item => {
    if (item._change === 'delete') {
      // Handle deletes specially
      return {
        model: 'customer',
        id: item.id,
        data: null // Signal deletion
      };
    }
    
    return {
      model: 'customer',
      id: item.id,
      data: {
        id: item.id,
        name: item.name,
        email: item.email,
        status: item.status
      }
    };
  })
  
  .withMapToApi((data, operation) => ({
    name: data.name,
    email: data.email,
    status: data.status
  }))
  
  .withEndpoint((data, operation) => ({
    path: operation === 'create' 
      ? '/api/customers' 
      : `/api/customers/${data.id}`,
    method: operation === 'delete' 
      ? 'DELETE' 
      : operation === 'create' 
      ? 'POST' 
      : 'PUT'
  }))
  
  .build();

// Helper function
async function paginate(api: any, path: string, startPage = 1) {
  const response = await api.get(path, { page: startPage, limit: 100 });
  return {
    items: response.data.items,
    nextState: { page: startPage + 1 },
    hasMore: response.data.hasMore
  };
}