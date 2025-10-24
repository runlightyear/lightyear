/**
 * Integration Examples
 *
 * Various examples showing how to define integrations with apps, collections, and actions
 */

import {
  defineIntegration,
  defineCollection,
  defineAction,
  defineApiKeyCustomApp,
} from "../src";

/**
 * Define an integration with a name
 * NOTE: This will throw an error because app and collection are required
 */

// const simpleIntegration = defineIntegration("data-sync").deploy();

/**
 * Define an integration with a name, title, app, and collection
 */

const customerCollection = defineCollection("customers")
  .addModel("customer")
  .deploy();

const titledIntegration = defineIntegration("customer-sync")
  .withTitle("Customer Data Synchronization")
  .withApp("salesforce")
  .withCollection(customerCollection)
  .deploy();

/**
 * Define an integration with a name, title, app, and collection
 */

const repoCollection = defineCollection("repositories")
  .addModel("repository")
  .deploy();

const builtinAppIntegration = defineIntegration("github-integration")
  .withTitle("GitHub Repository Manager")
  .withApp("github") // Using a built-in app
  .withCollection(repoCollection)
  .deploy();

/**
 * Define an integration with a name, title, custom app, and collection
 */

// First, define a custom app
const customCRMApp = defineApiKeyCustomApp("custom-crm")
  .withTitle("Custom CRM System")
  .addVariable("api_endpoint", {
    title: "API Endpoint",
    description: "Base URL for the CRM API",
    required: true,
  })
  .deploy();

const crmCollection = defineCollection("crm-data")
  .addModel("account")
  .addModel("contact")
  .deploy();

const customAppIntegration = defineIntegration("crm-integration")
  .withTitle("Custom CRM Integration")
  .withCustomApp(customCRMApp)
  .withCollection(crmCollection)
  .deploy();

/**
 * Define an integration with a name, title, custom app, collection, and actions
 */

// Define an action for the integration
const syncContactsAction = defineAction("sync-contacts")
  .withTitle("Sync Contacts")
  .withDescription("Synchronizes contacts between systems")
  .addVariable("sync_direction", {
    title: "Sync Direction",
    description: "Direction of synchronization",
    defaultValue: "bidirectional",
    required: true,
  })
  .withRun(async ({ variables, auths }) => {
    console.log(`Syncing contacts: ${variables.sync_direction}`);
    // Sync logic here
    return;
  })
  .deploy();

const contactCollection = defineCollection("contacts")
  .addModel("contact")
  .deploy();

const actionIntegration = defineIntegration("contact-manager")
  .withTitle("Contact Management System")
  .withCustomApp(customCRMApp)
  .withCollection(contactCollection)
  .withAction(syncContactsAction)
  .deploy();

/**
 * Define a duplicate integration from an instantiated integration
 */

const duplicateIntegration = defineIntegration
  .from(actionIntegration)
  .withTitle("Contact Management System v2")
  .deploy();

// Export examples for reference
export {
  titledIntegration,
  builtinAppIntegration,
  customAppIntegration,
  actionIntegration,
  duplicateIntegration,
};
