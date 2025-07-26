import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  handler,
  type HandlerEvent,
  type HandlerResponse,
  type InternalResponse,
  handleHealth,
  handleDeploy,
} from "./index";
import {
  clearRegistry,
  defineModel,
  defineCollection,
  defineOAuth2CustomApp,
} from "../";

// Mock handler context for testing
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

  describe("Lambda Handler", () => {
    it("should handle health check", async () => {
      const event: HandlerEvent = { operation: "health" };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;
      const body = JSON.parse(result.body) as InternalResponse;

      expect(result.statusCode).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toMatchObject({
        status: "healthy",
        remainingTimeMs: 30000,
        memoryLimitMB: "128",
      });
      expect(body.data.timestamp).toBeDefined();
      expect(body.data.runtime).toBeDefined();
    });

    it("should handle deploy operation with logs", async () => {
      // Create some test data
      defineOAuth2CustomApp("salesforce").build();

      const event: HandlerEvent = {
        operation: "deploy",
        payload: {
          environment: "staging",
          dryRun: true,
          baseUrl: "https://api.test.com",
        },
      };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;
      const body = JSON.parse(result.body) as InternalResponse;

      expect(result.statusCode).toBe(200);
      expect(body.success).toBe(true);
      expect(body.logs).toEqual([]);
      expect(body.data.message).toContain("Deployment completed successfully");
      expect(body.data.environment).toBe("staging");
      expect(body.data.dryRun).toBe(true);
    });

    it("should handle unknown operation", async () => {
      const event: HandlerEvent = { operation: "unknown" as any };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;
      const body = JSON.parse(result.body) as InternalResponse;

      expect(result.statusCode).toBe(400);
      expect(body.success).toBe(false);
      expect(body.error).toBe("Unknown operation: unknown");
      expect(body.logs).toEqual([]);
    });

    it("should handle deploy with no deployable items", async () => {
      const event: HandlerEvent = {
        operation: "deploy",
        payload: {
          environment: "test",
          baseUrl: "https://api.test.com",
        },
      };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;
      const body = JSON.parse(result.body) as InternalResponse;

      expect(result.statusCode).toBe(400);
      expect(body.success).toBe(false);
      expect(body.error).toBe("No deployable items found in registry");
      expect(body.logs).toEqual([]);
    });

    it("should handle errors gracefully", async () => {
      vi.spyOn(console, "error").mockImplementation(() => {});

      const event: HandlerEvent = { operation: "unknown" as any };
      const context = createMockHandlerContext();

      const result = (await handler(event, context)) as HandlerResponse;
      const body = JSON.parse(result.body) as InternalResponse;

      expect(result.statusCode).toBe(400);
      expect(body.success).toBe(false);
      expect(body.error).toBe("Unknown operation: unknown");
      expect(body.logs).toEqual([]);
    });
  });

  describe("Individual Handlers", () => {
    it("should support importing individual handlers", async () => {
      const healthResult = await handleHealth(createMockHandlerContext());
      expect(healthResult.success).toBe(true);
      expect(healthResult.data.status).toBe("healthy");

      defineOAuth2CustomApp("test-app").build();
      const deployResult = await handleDeploy({
        baseUrl: "https://api.test.com",
        dryRun: true,
      });
      expect(deployResult.success).toBe(true);
      expect(deployResult.logs).toEqual([]);
    });

    it("should handle optional parameters correctly", async () => {
      // Health handler with no context
      const healthNoContext = await handleHealth();
      expect(healthNoContext.success).toBe(true);
      expect(healthNoContext.data.status).toBe("healthy");
      expect(healthNoContext.data.remainingTimeMs).toBe(30000);
      expect(healthNoContext.data.memoryLimitMB).toBe("unknown");
      expect(healthNoContext.data.requestId).toMatch(/^req-\d+$/);

      // Deploy handler with no payload
      defineOAuth2CustomApp("test-deploy").build();
      const deployNoPayload = await handleDeploy();
      expect(deployNoPayload.success).toBe(true);
      expect(deployNoPayload.data.environment).toBe("default");
      expect(deployNoPayload.logs).toEqual([]);
    });
  });
});
