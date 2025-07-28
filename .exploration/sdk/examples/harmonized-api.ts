import { defineModel, defineCollection, defineCustomApp, match } from '../builders';
import { defineOAuth2App } from '../app-builder';

/**
 * Examples showing the harmonized API where all titles use withTitle()
 */

// Models - all use withTitle() for consistency
const customerModel = defineModel('customer')
  .withMatchPattern('email')
  .build();
// Auto-generated title: "Customer"

const vipCustomerModel = defineModel('vip_customer')
  .withTitle('VIP Customer') // Explicit title for complex names
  .withSchema({
    type: 'object',
    properties: {
      id: { type: 'string' },
      tier: { type: 'string', enum: ['gold', 'platinum', 'diamond'] }
    }
  })
  .withMatchPattern('email')
  .build();

// Collections - same pattern
const contactsCollection = defineCollection('contacts')
  .withTitle('Contact Management') // Optional explicit title
  .addModel('customer', {
    matchPattern: 'email'
  })
  .addModel('lead', {
    matchPattern: 'phone'
  })
  .build();

const simpleCollection = defineCollection('products')
  .addModel('physical', {
    matchPattern: 'sku'
  })
  .build();
// Auto-generated title: "Products"

// Custom Apps - consistent with the pattern
const salesforceApp = defineCustomApp('salesforce', 'OAUTH2')
  .withTitle('Salesforce CRM')
  .withVariables('clientId', 'authorizationUrl', 'tokenUrl')
  .withSecrets('clientSecret')
  .build();

const stripeApp = defineCustomApp('stripe', 'APIKEY')
  .withSecrets('apiKey')
  .build();
// Auto-generated title: "Stripe"

// Using preset app builders
const hubspotApp = defineOAuth2App('hubspot')
  .withTitle('HubSpot Marketing')
  .build();

// Everything follows the same pattern:
// 1. Required parameters in the factory function
// 2. Optional configurations via method chaining
// 3. Explicit build() to create the final object