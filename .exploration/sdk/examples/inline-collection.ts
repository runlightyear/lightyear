import { defineCollection, match } from '../builders';

/**
 * Example: Building collections with inline model definitions
 */

// Define everything inline using the builder pattern
export const ordersCollection = defineCollection('orders')
  .withTitle('Order Management')
  .addModel('online_order', {
    title: 'Online Order',
    schema: {
      type: 'object',
      properties: {
        orderId: { type: 'string' },
        orderNumber: { type: 'string' },
        customerEmail: { type: 'string' },
        customer: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' }
          }
        },
        billing: {
          type: 'object',
          properties: {
            email: { type: 'string' }
          }
        },
        items: { 
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sku: { type: 'string' },
              quantity: { type: 'number' }
            }
          }
        }
      },
      required: ['orderId']
    },
    matchPattern: match.and(
      match.or('orderId', 'orderNumber'),
      match.or(
        'customerEmail',
        match.jsonPath('.customer.email'),
        match.jsonPath('.billing.email')
      )
    )
  })
  .addModel('in_store_order', {
    title: 'In-Store Order',
    schema: {
      type: 'object',
      properties: {
        orderId: { type: 'string' },
        storeId: { type: 'string' },
        customerId: { type: 'string' },
        posTerminal: { type: 'string' }
      },
      required: ['orderId', 'storeId']
    },
    matchPattern: match.or(
      match.and('orderId', 'storeId'),
      'customerId'
    )
  })
  .addModel('subscription_order', {
    title: 'Subscription Order',
    schema: {
      type: 'object',
      properties: {
        subscriptionId: { type: 'string' },
        customerId: { type: 'string' },
        recurringOrderId: { type: 'string' }
      }
    },
    matchPattern: match.or(
      'subscriptionId',
      'recurringOrderId',
      match.and('customerId', 'subscriptionId')
    )
  })
  .build();

// Simpler example with minimal schemas
export const productsCollection = defineCollection('products')
  .withTitle('Product Catalog')
  .addModel('physical_product', {
    title: 'Physical Product',
    schema: {
      type: 'object',
      properties: {
        sku: { type: 'string' },
        upc: { type: 'string' },
        weight: { type: 'number' }
      }
    },
    matchPattern: match.or('sku', 'upc')
  })
  .addModel('digital_product', {
    title: 'Digital Product',
    schema: {
      type: 'object',
      properties: {
        sku: { type: 'string' },
        downloadUrl: { type: 'string' }
      }
    },
    matchPattern: 'sku'
  })
  .addModel('product', 'Product', {
    // Generic product - no schema, just match pattern
    matchPattern: match.or('sku', 'id', match.jsonPath('.identifier'))
  })
  .build();