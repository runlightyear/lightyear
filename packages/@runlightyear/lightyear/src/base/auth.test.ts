import { describe, expect, test, beforeEach, vi } from "vitest";
import { server, http, HttpResponse } from "../test/setup";
import {
  getAuthData,
  updateAuthData,
  setAuthError,
  updateAuthDataState,
  refreshToken,
  type AuthData,
  type GetAuthDataProps,
  type UpdateAuthDataProps,
  type SetAuthErrorProps,
  type UpdateAuthDataStateProps,
} from "./auth";
import { createMockAuthData } from "../test/mocks/authMocks";
import { prefixedRedactedConsole } from "../logging";
import * as getEnvNameModule from "../util/getEnvName";

// Mock variables - will be set up in beforeEach
let mockConsoleDebug: ReturnType<typeof vi.spyOn>;
let mockConsoleInfo: ReturnType<typeof vi.spyOn>;
let mockConsoleError: ReturnType<typeof vi.spyOn>;
let mockAddSecrets: ReturnType<typeof vi.spyOn>;

describe("auth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
    // Ensure required env vars are set
    process.env.ENV_NAME = "test";

    // Set up mocks after restoring
    mockConsoleDebug = vi.spyOn(console, "debug").mockImplementation(() => {});
    mockConsoleInfo = vi.spyOn(console, "info").mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    mockAddSecrets = vi
      .spyOn(prefixedRedactedConsole, "addSecrets")
      .mockImplementation(() => {});
  });

  describe("getAuthData", () => {
    test("should successfully get auth data from app", async () => {
      const mockAuthData = createMockAuthData({ appName: "test-app" });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/apps/test-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(mockAuthData);
          }
        )
      );

      const props: GetAuthDataProps = {
        appName: "test-app",
        authName: "test-auth",
      };

      const result = await getAuthData(props);

      expect(result).toEqual(mockAuthData);
      expect(mockConsoleDebug).toHaveBeenCalledWith("in getAuthData");
    });

    test("should successfully get auth data for custom app", async () => {
      const mockAuthData = createMockAuthData({
        customAppName: "test-custom-app",
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(mockAuthData);
          }
        )
      );

      const props: GetAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      const result = await getAuthData(props);

      expect(result).toEqual(mockAuthData);
      expect(mockConsoleDebug).toHaveBeenCalledWith("in getAuthData");
    });

    test("should redact secrets when auth data contains sensitive information", async () => {
      const mockAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: "secret-access-token",
        refreshToken: "secret-refresh-token",
        apiKey: "secret-api-key",
        password: "secret-password",
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(mockAuthData);
          }
        )
      );

      const props: GetAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await getAuthData(props);

      expect(mockAddSecrets).toHaveBeenCalledWith(["secret-access-token"]);
      expect(mockAddSecrets).toHaveBeenCalledWith(["secret-refresh-token"]);
      expect(mockAddSecrets).toHaveBeenCalledWith(["secret-api-key"]);
      expect(mockAddSecrets).toHaveBeenCalledWith(["secret-password"]);
      expect(mockAddSecrets).toHaveBeenCalledWith(["test-client-secret"]);
    });

    test("should handle auth data with null sensitive fields", async () => {
      const mockAuthData = createMockAuthData({
        customAppName: "test-custom-app",
        accessToken: null,
        refreshToken: null,
        apiKey: null,
        password: null,
        customAppData: undefined,
      });

      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return HttpResponse.json(mockAuthData);
          }
        )
      );

      const props: GetAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      const result = await getAuthData(props);

      expect(result).toEqual(mockAuthData);
      expect(mockAddSecrets).not.toHaveBeenCalled();
    });

    test("should throw error when ENV_NAME is missing", async () => {
      // Mock getEnvName to return undefined
      vi.spyOn(getEnvNameModule, "getEnvName").mockReturnValue(
        undefined as any
      );

      const props: GetAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await expect(getAuthData(props)).rejects.toThrow("Missing ENV_NAME");
    });

    test("should handle API errors", async () => {
      server.use(
        http.get(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return new HttpResponse(null, {
              status: 404,
              statusText: "Not Found",
            });
          }
        )
      );

      const props: GetAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await expect(getAuthData(props)).rejects.toThrow();
    });

    test("should throw error when neither appName nor customAppName is provided", async () => {
      const props: GetAuthDataProps = {
        authName: "test-auth",
      };

      await expect(getAuthData(props)).rejects.toThrow(
        "Must specify appName or customAppName"
      );
    });

    test("should throw error when both appName and customAppName are provided", async () => {
      const props: GetAuthDataProps = {
        appName: "test-app",
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await expect(getAuthData(props)).rejects.toThrow(
        "Only specify appName or customAppName"
      );
    });
  });

  describe("updateAuthData", () => {
    test("should successfully update auth data for app", async () => {
      const mockAuthData = createMockAuthData({
        appName: "test-app",
      });

      server.use(
        http.patch(
          "https://test.runlightyear.com/api/v1/envs/test/apps/test-app/auths/test-auth/data",
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual(mockAuthData);
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      const props: UpdateAuthDataProps = {
        appName: "test-app",
        authName: "test-auth",
        authData: mockAuthData,
      };

      await expect(updateAuthData(props)).resolves.toBeUndefined();
      expect(mockConsoleDebug).toHaveBeenCalledWith("in updateAuthData");
    });

    test("should successfully update auth data for custom app", async () => {
      const mockAuthData = createMockAuthData({
        customAppName: "test-custom-app",
      });

      server.use(
        http.patch(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual(mockAuthData);
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      const props: UpdateAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
        authData: mockAuthData,
      };

      await expect(updateAuthData(props)).resolves.toBeUndefined();
      expect(mockConsoleDebug).toHaveBeenCalledWith("in updateAuthData");
    });

    test("should throw error when neither appName nor customAppName is provided", async () => {
      const props: UpdateAuthDataProps = {
        authName: "test-auth",
        authData: createMockAuthData({ customAppName: "test-custom-app" }),
      };

      await expect(updateAuthData(props)).rejects.toThrow(
        "Must specify appName or customAppName"
      );
    });

    test("should throw error when both appName and customAppName are provided", async () => {
      const props: UpdateAuthDataProps = {
        appName: "test-app",
        customAppName: "test-custom-app",
        authName: "test-auth",
        authData: createMockAuthData({ customAppName: "test-custom-app" }),
      };

      await expect(updateAuthData(props)).rejects.toThrow(
        "Only specify appName or customAppName"
      );
    });

    test("should throw error when ENV_NAME is missing", async () => {
      // Mock getEnvName to return undefined
      vi.spyOn(getEnvNameModule, "getEnvName").mockReturnValue(
        undefined as any
      );

      const props: UpdateAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
        authData: createMockAuthData({ customAppName: "test-custom-app" }),
      };

      await expect(updateAuthData(props)).rejects.toThrow("Missing ENV_NAME");
    });

    test("should handle API errors", async () => {
      server.use(
        http.patch(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return new HttpResponse(null, {
              status: 500,
              statusText: "Internal Server Error",
            });
          }
        )
      );

      const props: UpdateAuthDataProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
        authData: createMockAuthData({ customAppName: "test-custom-app" }),
      };

      await expect(updateAuthData(props)).rejects.toThrow();
    });
  });

  describe("setAuthError", () => {
    test("should successfully set auth error for app", async () => {
      server.use(
        http.patch(
          "https://test.runlightyear.com/api/v1/envs/test/apps/test-app/auths/test-auth",
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({
              error: "Authentication failed",
              errorResolution: "REAUTHORIZE",
            });
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      const props: SetAuthErrorProps = {
        appName: "test-app",
        customAppName: null,
        authName: "test-auth",
        error: "Authentication failed",
        errorResolution: "REAUTHORIZE",
      };

      await expect(setAuthError(props)).resolves.toBeUndefined();
      expect(mockConsoleDebug).toHaveBeenCalledWith("setting Auth Error");
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        "Set auth error",
        "Authentication failed",
        "REAUTHORIZE"
      );
    });

    test("should successfully set auth error for custom app", async () => {
      server.use(
        http.patch(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth",
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({
              error: "Token expired",
              errorResolution: "DEPLOY_PROD",
            });
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      const props: SetAuthErrorProps = {
        appName: null,
        customAppName: "test-custom-app",
        authName: "test-auth",
        error: "Token expired",
        errorResolution: "DEPLOY_PROD",
      };

      await expect(setAuthError(props)).resolves.toBeUndefined();
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        "Set auth error",
        "Token expired",
        "DEPLOY_PROD"
      );
    });

    test("should throw error when neither appName nor customAppName is provided", async () => {
      const props: SetAuthErrorProps = {
        appName: null,
        customAppName: null,
        authName: "test-auth",
        error: "Test error",
        errorResolution: "REAUTHORIZE",
      };

      await expect(setAuthError(props)).rejects.toThrow(
        "Must specifiy appName or customAppName"
      );
    });

    test("should throw error when both appName and customAppName are provided", async () => {
      const props: SetAuthErrorProps = {
        appName: "test-app",
        customAppName: "test-custom-app",
        authName: "test-auth",
        error: "Test error",
        errorResolution: "REAUTHORIZE",
      };

      await expect(setAuthError(props)).rejects.toThrow(
        "Only specify appName or customAppName"
      );
    });

    test("should throw error when ENV_NAME is missing", async () => {
      // Mock getEnvName to return undefined
      vi.spyOn(getEnvNameModule, "getEnvName").mockReturnValue(
        undefined as any
      );

      const props: SetAuthErrorProps = {
        appName: "test-app",
        customAppName: null,
        authName: "test-auth",
        error: "Test error",
        errorResolution: "REAUTHORIZE",
      };

      await expect(setAuthError(props)).rejects.toThrow("Missing ENV_NAME");
    });

    test("should handle API errors gracefully", async () => {
      server.use(
        http.patch(
          "https://test.runlightyear.com/api/v1/envs/test/apps/test-app/auths/test-auth",
          () => {
            return new HttpResponse(null, {
              status: 500,
              statusText: "Internal Server Error",
            });
          }
        )
      );

      const props: SetAuthErrorProps = {
        appName: "test-app",
        customAppName: null,
        authName: "test-auth",
        error: "Test error",
        errorResolution: "REAUTHORIZE",
      };

      await expect(setAuthError(props)).rejects.toThrow();
    });
  });

  describe("updateAuthDataState", () => {
    test("should successfully update auth data state for app", async () => {
      server.use(
        http.post(
          "https://test.runlightyear.com/api/v1/envs/test/apps/test-app/auths/test-auth/data",
          () => {
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      const props: UpdateAuthDataStateProps = {
        appName: "test-app",
        authName: "test-auth",
      };

      await expect(updateAuthDataState(props)).resolves.toBeUndefined();
      expect(mockConsoleDebug).toHaveBeenCalledWith("in updateAuthDataState");
    });

    test("should successfully update auth data state for custom app", async () => {
      server.use(
        http.post(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      const props: UpdateAuthDataStateProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await expect(updateAuthDataState(props)).resolves.toBeUndefined();
      expect(mockConsoleDebug).toHaveBeenCalledWith("in updateAuthDataState");
    });

    test("should throw error when neither appName nor customAppName is provided", async () => {
      const props: UpdateAuthDataStateProps = {
        authName: "test-auth",
      };

      await expect(updateAuthDataState(props)).rejects.toThrow(
        "Must specify appName or customAppName"
      );
    });

    test("should throw error when both appName and customAppName are provided", async () => {
      const props: UpdateAuthDataStateProps = {
        appName: "test-app",
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await expect(updateAuthDataState(props)).rejects.toThrow(
        "Only specify appName or customAppName"
      );
    });

    test("should throw error when ENV_NAME is missing", async () => {
      // Mock getEnvName to return undefined
      vi.spyOn(getEnvNameModule, "getEnvName").mockReturnValue(
        undefined as any
      );

      const props: UpdateAuthDataStateProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await expect(updateAuthDataState(props)).rejects.toThrow(
        "Missing ENV_NAME"
      );
    });

    test("should handle API errors", async () => {
      server.use(
        http.post(
          "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
          () => {
            return new HttpResponse(null, {
              status: 404,
              statusText: "Not Found",
            });
          }
        )
      );

      const props: UpdateAuthDataStateProps = {
        customAppName: "test-custom-app",
        authName: "test-auth",
      };

      await expect(updateAuthDataState(props)).rejects.toThrow();
    });
  });

  describe("refreshToken", () => {
    test("should successfully refresh token", async () => {
      server.use(
        http.post(
          "https://test.runlightyear.com/api/v1/envs/test/auths/test-auth/refresh",
          () => {
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      await expect(refreshToken("test-auth")).resolves.toBeUndefined();
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        "Refreshing auth: test-auth"
      );
    });

    test("should throw error when ENV_NAME is missing", async () => {
      // Mock getEnvName to return undefined
      vi.spyOn(getEnvNameModule, "getEnvName").mockReturnValue(
        undefined as any
      );

      await expect(refreshToken("test-auth")).rejects.toThrow(
        "Missing ENV_NAME"
      );
    });

    test("should handle API errors with proper error logging", async () => {
      const errorText = "Refresh failed: invalid refresh token";

      server.use(
        http.post(
          "https://test.runlightyear.com/api/v1/envs/test/auths/test-auth/refresh",
          () => {
            return new HttpResponse(errorText, {
              status: 400,
              statusText: "Bad Request",
            });
          }
        )
      );

      await expect(refreshToken("test-auth")).rejects.toThrow();
    });

    test("should handle server errors", async () => {
      server.use(
        http.post(
          "https://test.runlightyear.com/api/v1/envs/test/auths/test-auth/refresh",
          () => {
            return new HttpResponse("Internal server error", {
              status: 500,
              statusText: "Internal Server Error",
            });
          }
        )
      );

      await expect(refreshToken("test-auth")).rejects.toThrow();
    });
  });
});
