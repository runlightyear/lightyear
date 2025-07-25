import { beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// Set up test environment variables
process.env.BASE_URL = "https://test.runlightyear.com";
process.env.API_KEY = "test-api-key";
process.env.ENV_NAME = "test";

// Create MSW server
export const server = setupServer();

// Setup MSW
beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

// Export utilities for tests
export { http, HttpResponse };
