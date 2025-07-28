import { defineIntegration } from '../integration-builder-v2';
import { defineCollection } from '../builders';
import { defineCustomApp } from '../app-builder';

/**
 * Simple approach: Built-in apps are just strings
 * The platform validates availability at runtime
 */

// Using built-in app - just a string
const salesforceIntegration = defineIntegration()
  .withApp('salesforce')
  .withCollections({
    contacts: defineCollection('contacts')
      .addModel('contact', {
        matchPattern: 'email'
      })
      .build()
  })
  .build();

// Using custom app - structured object
const customApp = defineCustomApp('my_custom_api', 'APIKEY')
  .withTitle('My Custom API')
  .withSecrets('apiKey')
  .build();

const customIntegration = defineIntegration()
  .withApp(customApp)
  .withCollections({
    users: defineCollection('users')
      .addModel('user', {
        matchPattern: 'id'
      })
      .build()
  })
  .build();

// The SDK consumer doesn't need to know which built-in apps are available
// They'll get runtime errors if they use an unavailable app
const betaAppIntegration = defineIntegration()
  .withApp('new_beta_app') // May or may not be available
  .withCollections({
    data: defineCollection('data')
      .addModel('record', {
        matchPattern: 'id'
      })
      .build()
  })
  .build();

// For better IDE experience, you could document available apps
type CommonBuiltInApps = 
  | 'salesforce'
  | 'hubspot' 
  | 'stripe'
  | 'shopify'
  | 'slack'
  | string; // Allow any string for beta/new apps

function createIntegration(appName: CommonBuiltInApps) {
  return defineIntegration()
    .withApp(appName)
    .withCollections({
      // ...
    })
    .build();
}