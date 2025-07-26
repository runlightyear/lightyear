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
      const integration = defineIntegration("salesforce-sync")
        .withTitle("Salesforce Sync Integration")
        .withApp("salesforce")
        .deploy();

      expect(integration.name).toBe("salesforce-sync");
      expect(integration.title).toBe("Salesforce Sync Integration");
      expect(integration.app.type).toBe("builtin");
      expect(integration.app.name).toBe("salesforce");
      expect(integration.app.definition).toBeUndefined();
      expect(integration.collections).toEqual({});
      expect(integration.actions).toEqual({});
    });

    it("should create an integration with custom app", () => {
      const customApp = defineOAuth2CustomApp("github")
        .withTitle("GitHub OAuth")
        .addSecret("client_id")
        .addSecret("client_secret")
        .deploy();

      const integration = defineIntegration("github-sync")
        .withTitle("GitHub Integration")
        .withCustomApp(customApp)
        .deploy();

      expect(integration.name).toBe("github-sync");
      expect(integration.title).toBe("GitHub Integration");
      expect(integration.app.type).toBe("custom");
      expect(integration.app.name).toBe("github");
      expect(integration.app.definition).toEqual(customApp);
    });

    it("should create an integration without title", () => {
      const integration = defineIntegration("simple-integration")
        .withApp("hubspot")
        .deploy();

      expect(integration.name).toBe("simple-integration");
      expect(integration.title).toBeUndefined();
      expect(integration.app.type).toBe("builtin");
      expect(integration.app.name).toBe("hubspot");
    });
  });

  describe("Collections", () => {
    it("should add collections to integration", () => {
      const contact = defineModel("contact").withTitle("Contact").deploy();

      const crm = defineCollection("crm")
        .withTitle("CRM Collection")
        .withModel(contact)
        .deploy();

      const integration = defineIntegration("crm-sync")
        .withApp("salesforce")
        .withCollection("crm", crm)
        .deploy();

      expect(integration.collections).toHaveProperty("crm");
      expect(integration.collections.crm).toEqual(crm);
    });

    it("should add multiple collections at once", () => {
      const contact = defineModel("contact").deploy();
      const account = defineModel("account").deploy();

      const crm = defineCollection("crm").withModel(contact).deploy();
      const sales = defineCollection("sales").withModel(account).deploy();

      const integration = defineIntegration("multi-sync")
        .withApp("salesforce")
        .withCollections({
          crm: crm,
          sales: sales,
        })
        .deploy();

      expect(integration.collections).toHaveProperty("crm");
      expect(integration.collections).toHaveProperty("sales");
      expect(Object.keys(integration.collections)).toHaveLength(2);
    });

    it("should support adding collections incrementally", () => {
      const contact = defineModel("contact").deploy();
      const account = defineModel("account").deploy();
      const opportunity = defineModel("opportunity").deploy();

      const crm = defineCollection("crm").withModel(contact).deploy();
      const sales = defineCollection("sales").withModel(account).deploy();
      const pipeline = defineCollection("pipeline")
        .withModel(opportunity)
        .deploy();

      const integration = defineIntegration("incremental-sync")
        .withApp("salesforce")
        .withCollection("crm", crm)
        .withCollection("sales", sales)
        .withCollections({ pipeline })
        .deploy();

      expect(Object.keys(integration.collections)).toHaveLength(3);
      expect(integration.collections.crm).toEqual(crm);
      expect(integration.collections.sales).toEqual(sales);
      expect(integration.collections.pipeline).toEqual(pipeline);
    });
  });

  describe("Actions", () => {
    it("should add actions to integration", () => {
      const syncAction = defineAction("sync-contacts")
        .withTitle("Sync Contacts")
        .withDescription("Synchronize contact data")
        .addVariable("batch_size", { defaultValue: "100" })
        .deploy();

      const integration = defineIntegration("contact-sync")
        .withApp("salesforce")
        .withAction(syncAction)
        .deploy();

      expect(integration.actions).toHaveProperty("sync-contacts");
      expect(integration.actions["sync-contacts"]).toEqual(syncAction);
    });

    it("should add multiple actions at once", () => {
      const syncAction = defineAction("sync-contacts")
        .withTitle("Sync Contacts")
        .deploy();

      const exportAction = defineAction("export-data")
        .withTitle("Export Data")
        .deploy();

      const integration = defineIntegration("multi-action-sync")
        .withApp("salesforce")
        .withActions([syncAction, exportAction])
        .deploy();

      expect(integration.actions).toHaveProperty("sync-contacts");
      expect(integration.actions).toHaveProperty("export-data");
      expect(Object.keys(integration.actions)).toHaveLength(2);
    });

    it("should support adding actions incrementally", () => {
      const syncAction = defineAction("sync").deploy();
      const importAction = defineAction("import").deploy();
      const exportAction = defineAction("export").deploy();

      const integration = defineIntegration("incremental-actions")
        .withApp("salesforce")
        .withAction(syncAction)
        .withAction(importAction)
        .withActions([exportAction])
        .deploy();

      expect(Object.keys(integration.actions)).toHaveLength(3);
      expect(integration.actions.sync).toEqual(syncAction);
      expect(integration.actions.import).toEqual(importAction);
      expect(integration.actions.export).toEqual(exportAction);
    });

    it("should work with both collections and actions", () => {
      const contact = defineModel("contact").deploy();
      const crm = defineCollection("crm").withModel(contact).deploy();
      const syncAction = defineAction("sync").deploy();

      const integration = defineIntegration("complete-integration")
        .withApp("salesforce")
        .withCollection("crm", crm)
        .withAction(syncAction)
        .deploy();

      expect(Object.keys(integration.collections)).toHaveLength(1);
      expect(Object.keys(integration.actions)).toHaveLength(1);
      expect(integration.collections.crm).toEqual(crm);
      expect(integration.actions.sync).toEqual(syncAction);
    });
  });

  describe("Error handling", () => {
    it("should throw error when no app is specified", () => {
      expect(() => {
        defineIntegration("no-app-integration")
          .withTitle("Integration without app")
          .deploy();
      }).toThrow(
        "Integration requires an app. Use .withApp() for built-in apps or .withCustomApp() for custom apps."
      );
    });

    it("should throw error even with collections but no app", () => {
      const crm = defineCollection("crm").deploy();

      expect(() => {
        defineIntegration("collections-no-app")
          .withCollection("crm", crm)
          .deploy();
      }).toThrow(
        "Integration requires an app. Use .withApp() for built-in apps or .withCustomApp() for custom apps."
      );
    });
  });

  describe("Registry integration", () => {
    it("should automatically register integrations when deployed", () => {
      expect(getIntegrations()).toHaveLength(0);

      const integration = defineIntegration("registry-test")
        .withTitle("Registry Test Integration")
        .withApp("salesforce")
        .deploy();

      const integrations = getIntegrations();
      expect(integrations).toHaveLength(1);
      expect(integrations[0].name).toBe("registry-test");
      expect(integrations[0].integration).toEqual(integration);
      expect(integrations[0].type).toBe("integration");
      expect(integrations[0].metadata?.builderType).toBe("IntegrationBuilder");
      expect(integrations[0].metadata?.createdBy).toBe("defineIntegration");
      expect(integrations[0].metadata?.appType).toBe("builtin");
      expect(integrations[0].metadata?.collectionCount).toBe(0);
      expect(integrations[0].metadata?.actionCount).toBe(0);
    });

    it("should track metadata correctly", () => {
      const customApp = defineOAuth2CustomApp("custom").deploy();
      const crm = defineCollection("crm").deploy();
      const sales = defineCollection("sales").deploy();
      const syncAction = defineAction("sync").deploy();
      const exportAction = defineAction("export").deploy();

      defineIntegration("metadata-test")
        .withCustomApp(customApp)
        .withCollection("crm", crm)
        .withCollection("sales", sales)
        .withAction(syncAction)
        .withAction(exportAction)
        .deploy();

      const integrations = getIntegrations();
      expect(integrations[0].metadata?.appType).toBe("custom");
      expect(integrations[0].metadata?.collectionCount).toBe(2);
      expect(integrations[0].metadata?.actionCount).toBe(2);
    });

    it("should generate unique IDs for integrations", () => {
      defineIntegration("integration1").withApp("salesforce").deploy();
      defineIntegration("integration1").withApp("hubspot").deploy(); // Same name, different instance

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
        .withCollection("crm", crm)
        .withCollections({
          analytics: defineCollection("analytics").addModel("event").deploy(),
        })
        .deploy();

      expect(integration.name).toBe("comprehensive-integration");
      expect(integration.title).toBe("Comprehensive Integration");
      expect(integration.app.type).toBe("custom");
      expect(integration.app.name).toBe("comprehensive");
      expect(Object.keys(integration.collections)).toHaveLength(2);
      expect(integration.collections).toHaveProperty("crm");
      expect(integration.collections).toHaveProperty("analytics");
    });
  });
});
