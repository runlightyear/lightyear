import { vi, expect } from "vitest";
import { AuthData } from "../base/auth";

/**
 * Creates a spy on console methods for testing
 */
export const createConsoleSpy = () => {
  const originalConsole = { ...console };

  const spies = {
    log: vi.spyOn(console, "log").mockImplementation(() => {}),
    info: vi.spyOn(console, "info").mockImplementation(() => {}),
    debug: vi.spyOn(console, "debug").mockImplementation(() => {}),
    warn: vi.spyOn(console, "warn").mockImplementation(() => {}),
    error: vi.spyOn(console, "error").mockImplementation(() => {}),
  };

  const restore = () => {
    Object.assign(console, originalConsole);
  };

  const clear = () => {
    Object.values(spies).forEach((spy) => spy.mockClear());
  };

  return { spies, restore, clear };
};

/**
 * Waits for a specified amount of time
 */
export const waitFor = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Creates a mock fetch response
 */
export const createMockResponse = (data: any, options: ResponseInit = {}) => {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
};

/**
 * Validates AuthData structure
 */
export const validateAuthDataStructure = (authData: AuthData): void => {
  expect(authData).toHaveProperty("appName");
  expect(authData).toHaveProperty("customAppName");
  expect(authData).toHaveProperty("authName");
  expect(authData).toHaveProperty("managedUser");
  expect(authData).toHaveProperty("accessToken");
  expect(authData).toHaveProperty("refreshToken");
  expect(authData).toHaveProperty("expiresAt");
  expect(authData).toHaveProperty("refreshedAt");
  expect(authData).toHaveProperty("extraData");
  expect(authData).toHaveProperty("customAppData");
};

/**
 * Generates a random auth name for testing
 */
export const generateRandomAuthName = (): string => {
  return `test-auth-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generates a random app name for testing
 */
export const generateRandomAppName = (): string => {
  return `test-app-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Creates test environment variables
 */
export const setupTestEnvironment = () => {
  const originalEnv = { ...process.env };

  process.env.BASE_URL = "https://test.runlightyear.com";
  process.env.API_KEY = "test-api-key";
  process.env.ENV_NAME = "test";

  const restore = () => {
    Object.assign(process.env, originalEnv);
  };

  return { restore };
};

/**
 * Asserts that a network call was made with specific parameters
 */
export const expectNetworkCall = (
  mockFetch: any,
  expectedUrl: string,
  expectedOptions?: any
) => {
  expect(mockFetch).toHaveBeenCalledWith(
    expectedUrl,
    expectedOptions
      ? expect.objectContaining(expectedOptions)
      : expect.any(Object)
  );
};
