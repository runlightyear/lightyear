import { defineIntegration } from '../integration-builder-final';
import { defineCollection, match } from '../builders';
import { defineCustomApp, defineOAuth2App } from '../app-builder';

/**
 * Complete integration examples with name and title
 */

// Simple integration with built-in app
const salesforceContactsIntegration = defineIntegration('salesforce_contacts')
  .withTitle('Salesforce Contact Sync')
  .withApp('salesforce')
  .withCollections({
    contacts: defineCollection('contacts')
      .withTitle('Contact Records')
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
      .build()
  })
  .build();

// Integration without explicit title - will auto-generate
const hubspotIntegration = defineIntegration('hubspot_sync')
  .withApp('hubspot')
  .withCollections({
    contacts: defineCollection('contacts').build(),
    companies: defineCollection('companies').build(),
    deals: defineCollection('deals').build()
  })
  .build();
// title will be "Hubspot Sync" when displayed

// Custom app integration
const customCrmApp = defineOAuth2App('internal_crm')
  .withTitle('Internal CRM System')
  .withVariables('apiEndpoint', 'tenantId')
  .build();

const internalCrmIntegration = defineIntegration('internal_crm_sync')
  .withTitle('Internal CRM Data Synchronization')
  .withCustomApp(customCrmApp)
  .withCollections({
    accounts: defineCollection('accounts')
      .addModel('account', {
        matchPattern: match.or('accountId', 'email'),
        schema: {
          type: 'object',
          properties: {
            accountId: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        }
      })
      .build(),
    activities: defineCollection('activities')
      .addModel('activity', {
        matchPattern: 'activityId'
      })
      .build()
  })
  .build();

// Complex integration with multiple models
const ecommerceIntegration = defineIntegration('shopify_full_sync')
  .withTitle('Shopify Store Complete Sync')
  .withApp('shopify')
  .withCollections({
    products: defineCollection('products')
      .addModel('physical_product', {
        title: 'Physical Product',
        matchPattern: match.or('sku', 'barcode'),
        schema: {
          type: 'object',
          properties: {
            sku: { type: 'string' },
            barcode: { type: 'string' },
            weight: { type: 'number' }
          }
        }
      })
      .addModel('digital_product', {
        title: 'Digital Product',
        matchPattern: 'sku'
      })
      .addModel('variant', {
        matchPattern: match.and('sku', 'variantId')
      })
      .build(),
    orders: defineCollection('orders')
      .addModel('order', {
        matchPattern: 'orderId'
      })
      .build(),
    customers: defineCollection('customers')
      .addModel('customer', {
        matchPattern: match.or('email', 'customerId')
      })
      .build()
  })
  .build();

// Minimal integration
const stripeIntegration = defineIntegration('stripe_payments')
  .withApp('stripe')
  .withCollection('payments', 
    defineCollection('payments')
      .addModel('payment', { matchPattern: 'paymentIntentId' })
      .build()
  )
  .build();