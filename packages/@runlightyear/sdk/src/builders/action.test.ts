import { describe, it, expect, beforeEach } from "vitest";
import { defineAction } from "./action";
import { defineOAuth2CustomApp } from "./customApp";
import { clearRegistry, getActions } from "../registry";

describe("ActionBuilder", () => {
  beforeEach(() => {
    clearRegistry();
  });

  describe("Basic action creation", () => {
    it("should create a basic action with only name", () => {
      const action = defineAction("sync-contacts").deploy();

      expect(action.name).toBe("sync-contacts");
      expect(action.title).toBeUndefined();
      expect(action.description).toBeUndefined();
      expect(action.variables).toBeUndefined();
      expect(action.secrets).toBeUndefined();
    });

    it("should create an action with title and description", () => {
      const action = defineAction("sync-contacts")
        .withTitle("Sync Contacts")
        .withDescription("Synchronize contacts from external system")
        .deploy();

      expect(action.name).toBe("sync-contacts");
      expect(action.title).toBe("Sync Contacts");
      expect(action.description).toBe(
        "Synchronize contacts from external system"
      );
    });

    // Apps functionality has been removed from actions
  });

  // Custom apps functionality has been removed from actions

  describe("Variables and secrets", () => {
    it("should add variables to an action", () => {
      const action = defineAction("configurable-action")
        .withTitle("Configurable Action")
        .addVariable("batch_size", {
          title: "Batch Size",
          description: "Number of records to process at once",
          defaultValue: "100",
          required: true,
        })
        .addVariable("timeout", {
          title: "Timeout",
          description: "Request timeout in seconds",
          defaultValue: "30",
          required: false,
        })
        .deploy();

      expect(action.variables).toHaveLength(2);
      expect(action.variables![0].name).toBe("batch_size");
      expect(action.variables![0].title).toBe("Batch Size");
      expect(action.variables![0].required).toBe(true);
      expect(action.variables![0].defaultValue).toBe("100");
      expect(action.variables![1].name).toBe("timeout");
      expect(action.variables![1].required).toBe(false);
    });

    it("should add secrets to an action", () => {
      const action = defineAction("secure-action")
        .withTitle("Secure Action")
        .addSecret("api_key", {
          title: "API Key",
          description: "Secret API key for authentication",
          required: true,
        })
        .addSecret("webhook_secret", {
          title: "Webhook Secret",
          description: "Secret for webhook verification",
          required: false,
        })
        .deploy();

      expect(action.secrets).toHaveLength(2);
      expect(action.secrets![0].name).toBe("api_key");
      expect(action.secrets![0].title).toBe("API Key");
      expect(action.secrets![0].required).toBe(true);
      expect(action.secrets![1].name).toBe("webhook_secret");
      expect(action.secrets![1].required).toBe(false);
    });

    it("should add multiple variables and secrets at once", () => {
      const variables = [
        { name: "retries", title: "Max Retries", required: true },
        { name: "delay", title: "Retry Delay", required: false },
      ];

      const secrets = [
        { name: "token", title: "Access Token", required: true },
        { name: "key", title: "Secret Key", required: true },
      ];

      const action = defineAction("bulk-config")
        .withTitle("Bulk Configuration")
        .addVariables(variables)
        .addSecrets(secrets)
        .deploy();

      expect(action.variables).toHaveLength(2);
      expect(action.secrets).toHaveLength(2);
      expect(action.variables![0].name).toBe("retries");
      expect(action.secrets![0].name).toBe("token");
    });

    it("should not include empty variables/secrets arrays", () => {
      const action = defineAction("simple-action")
        .withTitle("Simple Action")
        .deploy();

      expect(action.variables).toBeUndefined();
      expect(action.secrets).toBeUndefined();
    });
  });

  describe("Registry integration", () => {
    it("should automatically register actions when deployed", () => {
      expect(getActions()).toHaveLength(0);

      const action = defineAction("registry-test")
        .withTitle("Registry Test Action")
        .addSecret("api_key")
        .deploy();

      const actions = getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0].name).toBe("registry-test");
      expect(actions[0].action).toEqual(action);
      expect(actions[0].type).toBe("action");
      expect(actions[0].metadata?.builderType).toBe("ActionBuilder");
      expect(actions[0].metadata?.createdBy).toBe("defineAction");
      expect(actions[0].metadata?.variableCount).toBe(0);
      expect(actions[0].metadata?.secretCount).toBe(1);
    });

    it("should track metadata correctly", () => {
      defineAction("metadata-test")
        .addVariable("var1")
        .addVariable("var2")
        .addSecret("secret1")
        .deploy();

      const actions = getActions();
      expect(actions[0].metadata?.variableCount).toBe(2);
      expect(actions[0].metadata?.secretCount).toBe(1);
    });

    it("should generate unique IDs for actions", () => {
      defineAction("action1").withTitle("Action 1").deploy();
      defineAction("action1").withTitle("Action 1 Again").deploy(); // Same name, different instance

      const actions = getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0].id).not.toBe(actions[1].id);
    });
  });

  describe("Method chaining", () => {
    it("should support fluent API method chaining", () => {
      const action = defineAction("comprehensive-action")
        .withTitle("Comprehensive Action")
        .withDescription("A comprehensive action with all features")
        .addVariable("batch_size", {
          title: "Batch Size",
          defaultValue: "50",
          required: true,
        })
        .addSecret("webhook_secret", {
          title: "Webhook Secret",
          required: true,
        })
        .deploy();

      expect(action.name).toBe("comprehensive-action");
      expect(action.title).toBe("Comprehensive Action");
      expect(action.description).toBe(
        "A comprehensive action with all features"
      );
      expect(action.variables).toHaveLength(1);
      expect(action.secrets).toHaveLength(1);
    });
  });
});
