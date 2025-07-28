import { defineCollection } from '../builders';
import { BuiltInApps, useBuiltInApp } from '../built-in-apps';
import { defineIntegration } from '../integration-builder'; // We'll create this next

/**
 * Examples of using built-in apps vs custom apps
 */

// Option 1: Direct reference with type safety
const salesforceIntegration1 = defineIntegration()
  .withApp(BuiltInApps.SALESFORCE)
  .withCollections({
    contacts: defineCollection('contacts')
      .addModel('contact', {
        matchPattern: 'email'
      })
      .build()
  })
  .build();

// Option 2: Using the helper function (same result, different style)
const salesforceIntegration2 = defineIntegration()
  .withApp(useBuiltInApp(BuiltInApps.SALESFORCE))
  .withCollections({
    contacts: defineCollection('contacts')
      .addModel('contact', {
        matchPattern: 'email'
      })
      .build()
  })
  .build();

// Option 3: Simple string reference (less type safety)
// This would require the integration builder to accept string | App
const salesforceIntegration3 = defineIntegration()
  .withApp('salesforce') // Would look up from built-in apps
  .withCollections({
    contacts: defineCollection('contacts')
      .addModel('contact', {
        matchPattern: 'email'
      })
      .build()
  })
  .build();

// Benefits of structured approach:
// 1. Autocomplete for available built-in apps
// 2. Type checking ensures you use a valid built-in app
// 3. Metadata (title, auth type) is available without runtime lookup

// You can still mix built-in and custom apps
import { defineCustomApp } from '../app-builder';

const customCrmApp = defineCustomApp('custom_crm', 'OAUTH2')
  .withTitle('Our Custom CRM')
  .withVariables('clientId', 'clientSecret')
  .build();

const hybridIntegration = defineIntegration()
  .withApp(BuiltInApps.SALESFORCE) // Built-in
  .withCollections({
    // Collections that sync with Salesforce
  })
  .build();

const customIntegration = defineIntegration()
  .withApp(customCrmApp) // Custom
  .withCollections({
    // Collections that sync with custom CRM
  })
  .build();