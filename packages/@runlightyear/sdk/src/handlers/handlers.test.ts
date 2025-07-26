import { describe, it, expect, beforeEach, vi } from "vitest";
import { handler, type HandlerEvent, type HandlerResponse } from "./index";
import {
  clearRegistry,
  defineModel,
  defineCollection,
  defineOAuth2CustomApp,
} from "../";

// Mock handler context for direct invocation
const createMockHandlerContext = () => ({
  remainingTimeMs: 30000,
  memoryLimitMB: "128",
  functionName: "test-function",
  requestId: "test-request-id",
});

describe("Handlers", () => {
  beforeEach(() => {
    clearRegistry();
    vi.clearAllMocks();
  });

  describe("Direct Handler Invocation", () => {
    it("should handle health check", async () => {
      const event: HandlerEvent = { operation: "health" };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        status: "healthy",
        remainingTimeMs: 30000,
        memoryLimitMB: "128",
      });
      expect(result.data.timestamp).toBeDefined();
      expect(result.data.runtime).toBeDefined();
    });

    it("should handle registry export", async () => {
      // Create some test data
      defineModel("user").build();
      defineCollection("users").build();
      defineOAuth2CustomApp("github").build();

      const event: HandlerEvent = { operation: "registry-export" };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;

      expect(result.success).toBe(true);
      expect(result.data.items).toHaveLength(3);
      expect(result.data.stats.byType.model).toBe(1);
      expect(result.data.stats.byType.collection).toBe(1);
      expect(result.data.stats.byType.customApp).toBe(1);
      expect(result.stats?.totalItems).toBe(3);
    });

    it("should handle registry stats", async () => {
      // Create some test data
      defineModel("product").build();
      defineModel("order").build();
      defineCollection("ecommerce").build();

      const event: HandlerEvent = { operation: "registry-stats" };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;

      expect(result.success).toBe(true);
      expect(result.data.totalItems).toBe(3);
      expect(result.data.byType.model).toBe(2);
      expect(result.data.byType.collection).toBe(1);
    });

    it("should handle deploy operation", async () => {
      // Create some test data
      defineModel("customer").build();
      defineOAuth2CustomApp("salesforce").build();

      const event: HandlerEvent = {
        operation: "deploy",
        payload: { environment: "staging", dryRun: true },
      };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;

      expect(result.success).toBe(true);
      expect(result.data.message).toContain("Deploy action received");
      expect(result.data.registry).toBeDefined();
      expect(result.data.deployedAt).toBeDefined();
      expect(result.data.environment).toBe("staging");
      expect(result.data.dryRun).toBe(true);
      expect(result.stats?.totalItems).toBe(2);
      expect(result.stats?.models).toBe(1);
      expect(result.stats?.customApps).toBe(1);
    });

    it("should handle unknown operation", async () => {
      const event: HandlerEvent = { operation: "unknown" as any };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;

      expect(result.success).toBe(false);
      expect(result.error).toBe("Unknown operation: unknown");
    });

    it("should handle errors gracefully", async () => {
      vi.spyOn(console, "error").mockImplementation(() => {});

      const event: HandlerEvent = { operation: "unknown" as any };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;

      expect(result.success).toBe(false);
      expect(result.error).toBe("Unknown operation: unknown");
    });
  });

  describe("Individual Handlers", () => {
    it("should support importing individual handlers", async () => {
      const { handleHealth, handleRegistryStats } = await import("./index");

      const healthResult = await handleHealth(createMockHandlerContext());
      expect(healthResult.success).toBe(true);
      expect(healthResult.data.status).toBe("healthy");

      const statsResult = await handleRegistryStats();
      expect(statsResult.success).toBe(true);
      expect(statsResult.data.totalItems).toBeDefined();
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid context gracefully", async () => {
      const event: HandlerEvent = { operation: "health" };
      const invalidContext = {}; // Missing required properties

      const result = await handler(event, invalidContext);

      expect(result.success).toBe(true);
      expect(result.data.status).toBe("healthy");
      // Should still work with undefined/missing context properties
    });

    it("should handle payload validation", async () => {
      const event: HandlerEvent = {
        operation: "deploy",
        payload: null, // null payload
      };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;

      expect(result.success).toBe(true);
      expect(result.data.environment).toBe("unknown"); // Default handling
    });
  });
});
