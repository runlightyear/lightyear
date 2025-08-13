/**
 * Integration Examples
 * 
 * Various examples showing how to define integrations with apps, collections, and actions
 */

import { 
  defineIntegration, 
  defineCollection, 
  defineAction,
  defineApiKeyCustomApp
} from "../src";

/**
 * Define an integration with a name
 */

const simpleIntegration = defineIntegration("data-sync")
  .deploy();

/**
 * Define an integration with a name and a title
 */

const titledIntegration = defineIntegration("customer-sync")
  .withTitle("Customer Data Synchronization")
  .deploy();

/**
 * Define an integration with a name, title, and an app
 */

const builtinAppIntegration = defineIntegration("github-integration")
  .withTitle("GitHub Repository Manager")
  .withApp("github") // Using a built-in app
  .deploy();

/**
 * Define an integration with a name, title, and a custom app
 */

// First, define a custom app
const customCRMApp = defineApiKeyCustomApp("custom-crm")
  .withTitle("Custom CRM System")
  .addVariable("api_endpoint", {
    title: "API Endpoint",
    description: "Base URL for the CRM API",
    required: true
  })
  .deploy();

const customAppIntegration = defineIntegration("crm-integration")
  .withTitle("Custom CRM Integration")
  .withCustomApp(customCRMApp)
  .deploy();

/**
 * Define an integration with a name, title, and a custom app, and an action
 */

// Define an action for the integration
const syncContactsAction = defineAction("sync-contacts")
  .withTitle("Sync Contacts")
  .withDescription("Synchronizes contacts between systems")
  .addVariable("sync_direction", {
    title: "Sync Direction",
    description: "Direction of synchronization",
    defaultValue: "bidirectional",
    required: true
  })
  .withRun(async ({ variables, auths }) => {
    console.log(`Syncing contacts: ${variables.sync_direction}`);
    // Sync logic here
    return { synced: 100, errors: 0 };
  })
  .deploy();

const actionIntegration = defineIntegration("contact-manager")
  .withTitle("Contact Management System")
  .withCustomApp(customCRMApp)
  .withAction(syncContactsAction)
  .deploy();

// Export examples for reference
export {
  simpleIntegration,
  titledIntegration,
  builtinAppIntegration,
  customAppIntegration,
  actionIntegration
};