import { describe, expect, test, beforeEach, vi } from "vitest";
import { server, http, HttpResponse } from "../test/setup";
import { AuthConnector, AuthConnectorProps } from "./AuthConnector";
import { AuthData } from "../base/auth";
import { createMockAuthData } from "../test/mocks/authMocks";

// Mock console methods to avoid noise in test output
const mockConsoleInfo = vi.spyOn(console, "info").mockImplementation(() => {});
const mockConsoleDebug = vi
  .spyOn(console, "debug")
  .mockImplementation(() => {});

// Create a concrete implementation for testing
class TestAuthConnector extends AuthConnector {
  constructor(props: AuthConnectorProps) {
    super(props);
  }
}

describe("AuthConnector Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Constructor", () => {
    test("should initialize with provided auth data", () => {
      const authData = createMockAuthData({ customAppName: "test-custom-app" });
      const connector = new TestAuthConnector({ auth: authData });

      expect(connector.getAuthData()).toEqual(authData);
    });

    test("should initialize with default auth data when none provided", () => {
      const connector = new TestAuthConnector({ auth: undefined });
      const authData = connector.getAuthData();

      expect(authData.appName).toBeNull();
      expect(authData.customAppName).toBeNull();
      expect(authData.managedUser).toBeNull();
      expect(authData.authName).toBe("null");
      expect(authData.accessToken).toBeNull();
      expect(authData.refreshToken).toBeNull();
    });
  });

  describe("refreshAuthData", () => {
    test("should successfully refresh auth data", async () => {
      const initialAuthData = createMockAuthData({
        customAppName: "test-custom-app",
      });
      const refreshedAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
        refreshedAt: new Date().toISOString(),
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(refreshedAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({ auth: initialAuthData });
      await connector.refreshAuthData();

      const updatedAuthData = connector.getAuthData();
      expect(updatedAuthData.accessToken).toBe("new-access-token");
      expect(updatedAuthData.refreshToken).toBe("new-refresh-token");
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        "Refreshed auth data for",
        "test-custom-app",
        "test-auth"
      );
    });

    test("should handle auth data refresh for app", async () => {
      const initialAuthData = createMockAuthData({
        appName: "test-app",
      });
      const refreshedAuthData = createMockAuthData({
        appName: "test-app",
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
        refreshedAt: new Date().toISOString(),
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/apps/test-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(refreshedAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({ auth: initialAuthData });
      await connector.refreshAuthData();

      const updatedAuthData = connector.getAuthData();
      expect(updatedAuthData.accessToken).toBe("new-access-token");
      expect(updatedAuthData.refreshToken).toBe("new-refresh-token");
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        "Refreshed auth data for",
        "test-app",
        "test-auth"
      );
    });

    test("should handle auth data refresh for custom app", async () => {
      const initialAuthData = createMockAuthData({
        customAppName: "my-custom-app",
      });
      const refreshedAuthData = createMockAuthData({
        customAppName: "my-custom-app",
        accessToken: "custom-app-token",
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/my-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(refreshedAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({ auth: initialAuthData });
      await connector.refreshAuthData();

      const updatedAuthData = connector.getAuthData();
      expect(updatedAuthData.accessToken).toBe("custom-app-token");
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        "Refreshed auth data for",
        "my-custom-app",
        "test-auth"
      );
    });

    test("should handle auth data refresh failure", async () => {
      const authData = createMockAuthData({ customAppName: "test-custom-app" });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return new HttpResponse(null, { status: 500 });
          }
        )
      );

      const connector = new TestAuthConnector({ auth: authData });

      await expect(connector.refreshAuthData()).rejects.toThrow();
    });

    test("should handle network timeout during refresh", async () => {
      const authData = createMockAuthData({ customAppName: "test-custom-app" });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          async () => {
            // Simulate network timeout
            await new Promise((resolve) => setTimeout(resolve, 100));
            return new HttpResponse(null, { status: 408 });
          }
        )
      );

      const connector = new TestAuthConnector({ auth: authData });

      await expect(connector.refreshAuthData()).rejects.toThrow();
    });
  });

  describe("refreshAuthDataIfNecessary", () => {
    test("should refresh auth data when token expires within 5 minutes", async () => {
      const expiredAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        expiresAt: new Date(Date.now() - 1000).toISOString(), // Expired 1 second ago
      });
      const refreshedAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: "refreshed-token",
        expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(refreshedAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({ auth: expiredAuthData });
      await connector.refreshAuthDataIfNecessary();

      const updatedAuthData = connector.getAuthData();
      expect(updatedAuthData.accessToken).toBe("refreshed-token");
      expect(mockConsoleInfo).toHaveBeenCalled();
    });

    test("should refresh auth data when token expires in less than 5 minutes", async () => {
      const soonToExpireAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        expiresAt: new Date(Date.now() + 4 * 60 * 1000).toISOString(), // 4 minutes from now
      });
      const refreshedAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: "early-refreshed-token",
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(refreshedAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({ auth: soonToExpireAuthData });
      await connector.refreshAuthDataIfNecessary();

      const updatedAuthData = connector.getAuthData();
      expect(updatedAuthData.accessToken).toBe("early-refreshed-token");
    });

    test("should not refresh auth data when token is still valid for more than 5 minutes", async () => {
      const validAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
      });

      const connector = new TestAuthConnector({ auth: validAuthData });
      await connector.refreshAuthDataIfNecessary();

      // Should not have made any network calls
      expect(mockConsoleInfo).not.toHaveBeenCalled();

      // Auth data should remain unchanged
      const authData = connector.getAuthData();
      expect(authData.accessToken).toBe("test-access-token");
    });

    test("should not refresh auth data when expiresAt is null", async () => {
      const authDataWithoutExpiry = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
      });

      const connector = new TestAuthConnector({ auth: authDataWithoutExpiry });
      await connector.refreshAuthDataIfNecessary();

      // Should not have made any network calls
      expect(mockConsoleInfo).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    test("should handle malformed JSON response", async () => {
      const authData = createMockAuthData({ customAppName: "test-custom-app" });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return new HttpResponse("invalid json", {
              headers: {
                "Content-Type": "application/json",
              },
            });
          }
        )
      );

      const connector = new TestAuthConnector({ auth: authData });

      await expect(connector.refreshAuthData()).rejects.toThrow();
    });

    test("should handle auth data with missing required fields", async () => {
      const authData = createMockAuthData({ customAppName: "test-custom-app" });
      const incompleteAuthData = {
        // Missing required fields
        authName: "test-auth",
      };

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(incompleteAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({ auth: authData });
      await connector.refreshAuthData();

      const updatedAuthData = connector.getAuthData();
      // Should have updated with the incomplete data
      expect(updatedAuthData.authName).toBe("test-auth");
      expect(updatedAuthData.accessToken).toBeUndefined();
    });
  });

  describe("Environment Variables", () => {
    test("should work with different environment configurations", async () => {
      const authData = createMockAuthData({ customAppName: "test-custom-app" });
      const refreshedAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: "env-specific-token",
      });

      // Mock different environment
      const originalEnvName = process.env.ENV_NAME;
      process.env.ENV_NAME = "production";

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/production/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(refreshedAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({ auth: authData });
      await connector.refreshAuthData();

      const updatedAuthData = connector.getAuthData();
      expect(updatedAuthData.accessToken).toBe("env-specific-token");

      // Restore original environment
      process.env.ENV_NAME = originalEnvName;
    });
  });

  describe("Security", () => {
    test("should handle auth data with sensitive information", async () => {
      const sensitiveAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: "very-secret-token",
        refreshToken: "very-secret-refresh-token",
        apiKey: "secret-api-key",
        password: "secret-password",
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(sensitiveAuthData);
          }
        )
      );

      const connector = new TestAuthConnector({
        auth: createMockAuthData({ customAppName: "test-custom-app" }),
      });
      await connector.refreshAuthData();

      const updatedAuthData = connector.getAuthData();
      expect(updatedAuthData.accessToken).toBe("very-secret-token");
      expect(updatedAuthData.refreshToken).toBe("very-secret-refresh-token");
      expect(updatedAuthData.apiKey).toBe("secret-api-key");
      expect(updatedAuthData.password).toBe("secret-password");
    });
  });
});
