import { describe, it, expect, beforeEach } from "vitest";
import { defineIntegration } from "./integration";
import {
  defineOAuth2CustomApp,
  defineCollection,
  defineModel,
  defineAction,
} from "./";
import { clearRegistry, getIntegrations } from "../registry";

describe("IntegrationBuilder", () => {
  beforeEach(() => {
    clearRegistry();
  });

  describe("Basic integration creation", () => {
    it("should create a basic integration with built-in app", () => {
      const collection = defineCollection("crm").deploy();

      const integration = defineIntegration("salesforce-sync")
        .withTitle("Salesforce Sync Integration")
        .withApp("salesforce")
        .withCollection(collection)
        .deploy();

      expect(integration.name).toBe("salesforce-sync");
      expect(integration.title).toBe("Salesforce Sync Integration");
      expect(integration.app.type).toBe("builtin");
      expect(integration.app.name).toBe("salesforce");
      expect(integration.app.definition).toBeUndefined();
      expect(integration.collection).toEqual(collection);
      expect(integration.actions).toEqual({});
    });

    it("should create an integration with custom app", () => {
      const customApp = defineOAuth2CustomApp("github")
        .withTitle("GitHub OAuth")
        .addSecret("client_id")
        .addSecret("client_secret")
        .deploy();

      const collection = defineCollection("repositories").deploy();

      const integration = defineIntegration("github-sync")
        .withTitle("GitHub Integration")
        .withCustomApp(customApp)
        .withCollection(collection)
        .deploy();

      expect(integration.name).toBe("github-sync");
      expect(integration.title).toBe("GitHub Integration");
      expect(integration.app.type).toBe("custom");
      expect(integration.app.name).toBe("github");
      expect(integration.app.definition).toEqual(customApp);
      expect(integration.collection).toEqual(collection);
    });

    it("should create an integration without title", () => {
      const collection = defineCollection("contacts").deploy();

      const integration = defineIntegration("simple-integration")
        .withApp("hubspot")
        .withCollection(collection)
        .deploy();

      expect(integration.name).toBe("simple-integration");
      expect(integration.title).toBeUndefined();
      expect(integration.app.type).toBe("builtin");
      expect(integration.app.name).toBe("hubspot");
      expect(integration.collection).toEqual(collection);
    });
  });

  describe("Collections", () => {
    it("should add collection to integration", () => {
      const tmp = defineCollection("tmp-models");
      const contact = defineModel(tmp, "contact").withTitle("Contact").deploy();

      const crm = defineCollection("crm")
        .withTitle("CRM Collection")
        .withModel(contact)
        .deploy();

      const integration = defineIntegration("crm-sync")
        .withApp("salesforce")
        .withCollection(crm)
        .deploy();

      expect(integration.collection).toEqual(crm);
      expect(integration.collection.name).toBe("crm");
    });

    it("should allow changing collection", () => {
      const tmp = defineCollection("tmp-models");
      const contact = defineModel(tmp, "contact").deploy();
      const account = defineModel(tmp, "account").deploy();

      const crm = defineCollection("crm").withModel(contact).deploy();
      const sales = defineCollection("sales").withModel(account).deploy();

      const integration = defineIntegration("collection-change")
        .withApp("salesforce")
        .withCollection(crm)
        .withCollection(sales) // Replaces previous collection
        .deploy();

      expect(integration.collection).toEqual(sales);
      expect(integration.collection.name).toBe("sales");
    });
  });

  describe("Actions", () => {
    it("should add actions to integration", () => {
      const collection = defineCollection("contacts").deploy();
      const syncAction = defineAction("sync-contacts")
        .withTitle("Sync Contacts")
        .withDescription("Synchronize contact data")
        .addVariable("batch_size", { defaultValue: "100" })
        .deploy();

      const integration = defineIntegration("contact-sync")
        .withApp("salesforce")
        .withCollection(collection)
        .withAction(syncAction)
        .deploy();

      expect(integration.actions).toHaveProperty("sync-contacts");
      expect(integration.actions["sync-contacts"]).toEqual(syncAction);
    });

    it("should add multiple actions at once", () => {
      const collection = defineCollection("data").deploy();
      const syncAction = defineAction("sync-contacts")
        .withTitle("Sync Contacts")
        .deploy();

      const exportAction = defineAction("export-data")
        .withTitle("Export Data")
        .deploy();

      const integration = defineIntegration("multi-action-sync")
        .withApp("salesforce")
        .withCollection(collection)
        .withActions([syncAction, exportAction])
        .deploy();

      expect(integration.actions).toHaveProperty("sync-contacts");
      expect(integration.actions).toHaveProperty("export-data");
      expect(Object.keys(integration.actions)).toHaveLength(2);
    });

    it("should support adding actions incrementally", () => {
      const collection = defineCollection("tasks").deploy();
      const syncAction = defineAction("sync").deploy();
      const importAction = defineAction("import").deploy();
      const exportAction = defineAction("export").deploy();

      const integration = defineIntegration("incremental-actions")
        .withApp("salesforce")
        .withCollection(collection)
        .addAction(syncAction)
        .addAction(importAction)
        .addActions([exportAction])
        .deploy();

      expect(Object.keys(integration.actions)).toHaveLength(3);
      expect(integration.actions.sync).toEqual(syncAction);
      expect(integration.actions.import).toEqual(importAction);
      expect(integration.actions.export).toEqual(exportAction);
    });

    it("should work with both collection and actions", () => {
      const tmp = defineCollection("tmp-models");
      const contact = defineModel(tmp, "contact").deploy();
      const crm = defineCollection("crm").withModel(contact).deploy();
      const syncAction = defineAction("sync").deploy();

      const integration = defineIntegration("complete-integration")
        .withApp("salesforce")
        .withCollection(crm)
        .withAction(syncAction)
        .deploy();

      expect(integration.collection).toEqual(crm);
      expect(Object.keys(integration.actions)).toHaveLength(1);
      expect(integration.actions.sync).toEqual(syncAction);
    });
  });

  describe("Error handling", () => {
    it("should throw error when no app is specified", () => {
      const collection = defineCollection("crm").deploy();

      expect(() => {
        defineIntegration("no-app-integration")
          .withTitle("Integration without app")
          .withCollection(collection)
          .deploy();
      }).toThrow(
        'Integration "no-app-integration" requires an app. Use .withApp() for built-in apps or .withCustomApp() for custom apps.'
      );
    });

    it("should throw error when no collection is specified", () => {
      expect(() => {
        defineIntegration("no-collection-integration")
          .withTitle("Integration without collection")
          .withApp("salesforce")
          .deploy();
      }).toThrow(
        'Integration "no-collection-integration" requires a collection. Use .withCollection() to specify one.'
      );
    });

    it("should throw error when neither app nor collection specified", () => {
      expect(() => {
        defineIntegration("incomplete-integration")
          .withTitle("Incomplete integration")
          .deploy();
      }).toThrow(
        'Integration "incomplete-integration" requires an app. Use .withApp() for built-in apps or .withCustomApp() for custom apps.'
      );
    });
  });

  describe("Registry integration", () => {
    it("should automatically register integrations when deployed", () => {
      expect(getIntegrations()).toHaveLength(0);

      const collection = defineCollection("crm").deploy();
      const integration = defineIntegration("registry-test")
        .withTitle("Registry Test Integration")
        .withApp("salesforce")
        .withCollection(collection)
        .deploy();

      const integrations = getIntegrations();
      expect(integrations).toHaveLength(1);
      expect(integrations[0].name).toBe("registry-test");
      expect(integrations[0].integration).toEqual(integration);
      expect(integrations[0].type).toBe("integration");
      expect(integrations[0].metadata?.builderType).toBe("IntegrationBuilder");
      expect(integrations[0].metadata?.createdBy).toBe("defineIntegration");
      expect(integrations[0].metadata?.appType).toBe("builtin");
      expect(integrations[0].metadata?.collectionName).toBe("crm");
      expect(integrations[0].metadata?.actionCount).toBe(0);
    });

    it("should track metadata correctly", () => {
      const customApp = defineOAuth2CustomApp("custom").deploy();
      const crm = defineCollection("crm").deploy();
      const syncAction = defineAction("sync").deploy();
      const exportAction = defineAction("export").deploy();

      defineIntegration("metadata-test")
        .withCustomApp(customApp)
        .withCollection(crm)
        .addAction(syncAction)
        .addAction(exportAction)
        .deploy();

      const integrations = getIntegrations();
      expect(integrations[0].metadata?.appType).toBe("custom");
      expect(integrations[0].metadata?.collectionName).toBe("crm");
      expect(integrations[0].metadata?.actionCount).toBe(2);
    });

    it("should generate unique IDs for integrations", () => {
      const collection1 = defineCollection("crm1").deploy();
      const collection2 = defineCollection("crm2").deploy();

      defineIntegration("integration1")
        .withApp("salesforce")
        .withCollection(collection1)
        .deploy();
      defineIntegration("integration1")
        .withApp("hubspot")
        .withCollection(collection2)
        .deploy(); // Same name, different instance

      const integrations = getIntegrations();
      expect(integrations).toHaveLength(2);
      expect(integrations[0].id).not.toBe(integrations[1].id);
    });
  });

  describe("Method chaining", () => {
    it("should support fluent API method chaining", () => {
      const customApp = defineOAuth2CustomApp("comprehensive")
        .withTitle("Comprehensive OAuth App")
        .addSecret("client_id")
        .addSecret("client_secret")
        .deploy();

      const crm = defineCollection("crm")
        .addModel("contact")
        .addModel("account")
        .deploy();

      const integration = defineIntegration("comprehensive-integration")
        .withTitle("Comprehensive Integration")
        .withCustomApp(customApp)
        .withCollection(crm)
        .deploy();

      expect(integration.name).toBe("comprehensive-integration");
      expect(integration.title).toBe("Comprehensive Integration");
      expect(integration.app.type).toBe("custom");
      expect(integration.app.name).toBe("comprehensive");
      expect(integration.collection).toEqual(crm);
      expect(integration.collection.name).toBe("crm");
    });
  });
});
