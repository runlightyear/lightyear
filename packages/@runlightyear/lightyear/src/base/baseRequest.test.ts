import { describe, expect, test, beforeEach, vi } from "vitest";
import { server, http, HttpResponse } from "../test/setup";
import baseRequest from "./baseRequest";
import { BaseRequestError } from "./BaseRequestError";

// Mock console methods to avoid noise in test output
const mockConsoleDebug = vi
  .spyOn(console, "debug")
  .mockImplementation(() => {});

describe("baseRequest Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful Requests", () => {
    test("should make successful GET request", async () => {
      const responseData = { message: "Success" };

      server.use(
        http.get("https://test.runlightyear.com/api/test", () => {
          return HttpResponse.json(responseData);
        })
      );

      const response = await baseRequest({
        method: "GET",
        uri: "/api/test",
      });

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data).toEqual(responseData);
    });

    test("should make successful POST request with data", async () => {
      const requestData = { name: "test", value: 123 };
      const responseData = { id: 1, created: true };

      server.use(
        http.post(
          "https://test.runlightyear.com/api/create",
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual(requestData);
            return HttpResponse.json(responseData);
          }
        )
      );

      const response = await baseRequest({
        method: "POST",
        uri: "/api/create",
        data: requestData,
      });

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data).toEqual(responseData);
    });

    test("should make successful request with query parameters", async () => {
      const params = { page: "1", limit: "10" };
      const responseData = { results: [], total: 0 };

      server.use(
        http.get("https://test.runlightyear.com/api/list", ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("page")).toBe("1");
          expect(url.searchParams.get("limit")).toBe("10");
          return HttpResponse.json(responseData);
        })
      );

      const response = await baseRequest({
        method: "GET",
        uri: "/api/list",
        params,
      });

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data).toEqual(responseData);
    });
  });

  describe("Error Handling", () => {
    test("should throw BaseRequestError for 4xx client errors", async () => {
      server.use(
        http.get("https://test.runlightyear.com/api/error", () => {
          return new HttpResponse(null, {
            status: 400,
            statusText: "Bad Request",
          });
        })
      );

      await expect(
        baseRequest({
          method: "GET",
          uri: "/api/error",
        })
      ).rejects.toThrow(BaseRequestError);
    });

    test("should throw BaseRequestError for authentication errors", async () => {
      server.use(
        http.get("https://test.runlightyear.com/api/auth-error", () => {
          return new HttpResponse(null, {
            status: 401,
            statusText: "Unauthorized",
          });
        })
      );

      await expect(
        baseRequest({
          method: "GET",
          uri: "/api/auth-error",
        })
      ).rejects.toThrow(BaseRequestError);
    });

    test("should throw BaseRequestError for not found errors", async () => {
      server.use(
        http.get("https://test.runlightyear.com/api/not-found", () => {
          return new HttpResponse(null, {
            status: 404,
            statusText: "Not Found",
          });
        })
      );

      await expect(
        baseRequest({
          method: "GET",
          uri: "/api/not-found",
        })
      ).rejects.toThrow(BaseRequestError);
    });
  });

  describe("Retry Logic", () => {
    test("should retry on 5xx server errors and eventually succeed", async () => {
      let attemptCount = 0;
      const responseData = { message: "Success after retry" };

      server.use(
        http.get("https://test.runlightyear.com/api/retry-success", () => {
          attemptCount++;
          if (attemptCount < 3) {
            return new HttpResponse(null, { status: 500 });
          }
          return HttpResponse.json(responseData);
        })
      );

      const response = await baseRequest({
        method: "GET",
        uri: "/api/retry-success",
      });

      expect(response.ok).toBe(true);
      expect(attemptCount).toBe(3);
      const data = await response.json();
      expect(data).toEqual(responseData);
    });

    test("should retry on 5xx server errors and eventually fail", async () => {
      let attemptCount = 0;

      server.use(
        http.get("https://test.runlightyear.com/api/retry-fail", () => {
          attemptCount++;
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(
        baseRequest({
          method: "GET",
          uri: "/api/retry-fail",
          maxRetries: 2,
        })
      ).rejects.toThrow(BaseRequestError);

      expect(attemptCount).toBe(2);
    });

    test("should respect custom maxRetries setting", async () => {
      let attemptCount = 0;

      server.use(
        http.get("https://test.runlightyear.com/api/custom-retry", () => {
          attemptCount++;
          return new HttpResponse(null, { status: 503 });
        })
      );

      await expect(
        baseRequest({
          method: "GET",
          uri: "/api/custom-retry",
          maxRetries: 5,
        })
      ).rejects.toThrow(BaseRequestError);

      expect(attemptCount).toBe(5);
    });

    test("should not retry on 4xx client errors", async () => {
      let attemptCount = 0;

      server.use(
        http.get("https://test.runlightyear.com/api/no-retry", () => {
          attemptCount++;
          return new HttpResponse(null, { status: 400 });
        })
      );

      await expect(
        baseRequest({
          method: "GET",
          uri: "/api/no-retry",
        })
      ).rejects.toThrow(BaseRequestError);

      expect(attemptCount).toBe(1); // Should not retry
    });
  });

  describe("Request Headers and Authentication", () => {
    test("should include API key in Authorization header", async () => {
      server.use(
        http.get(
          "https://test.runlightyear.com/api/auth-test",
          ({ request }) => {
            const authHeader = request.headers.get("Authorization");
            expect(authHeader).toBe("apiKey test-api-key");
            return HttpResponse.json({ authenticated: true });
          }
        )
      );

      const response = await baseRequest({
        method: "GET",
        uri: "/api/auth-test",
      });

      expect(response.ok).toBe(true);
    });

    test("should include Content-Type header for POST requests", async () => {
      server.use(
        http.post(
          "https://test.runlightyear.com/api/content-type-test",
          ({ request }) => {
            const contentType = request.headers.get("Content-Type");
            expect(contentType).toBe("application/json");
            return HttpResponse.json({ received: true });
          }
        )
      );

      const response = await baseRequest({
        method: "POST",
        uri: "/api/content-type-test",
        data: { test: "data" },
      });

      expect(response.ok).toBe(true);
    });
  });

  describe("Response Headers", () => {
    test("should handle x-request-id header", async () => {
      const requestId = "test-request-123";

      server.use(
        http.get("https://test.runlightyear.com/api/request-id", () => {
          return HttpResponse.json(
            { message: "OK" },
            {
              headers: {
                "x-request-id": requestId,
              },
            }
          );
        })
      );

      const response = await baseRequest({
        method: "GET",
        uri: "/api/request-id",
      });

      expect(response.headers.get("x-request-id")).toBe(requestId);
      expect(mockConsoleDebug).toHaveBeenCalledWith(`requestId: ${requestId}`);
    });

    test("should handle missing x-request-id header", async () => {
      server.use(
        http.get("https://test.runlightyear.com/api/no-request-id", () => {
          return HttpResponse.json({ message: "OK" });
        })
      );

      const response = await baseRequest({
        method: "GET",
        uri: "/api/no-request-id",
      });

      expect(response.headers.get("x-request-id")).toBeNull();
      expect(mockConsoleDebug).toHaveBeenCalledWith("requestId: null");
    });
  });

  describe("Logging and Debug", () => {
    test("should log request details when suppressLogs is false", async () => {
      server.use(
        http.get("https://test.runlightyear.com/api/logging-test", () => {
          return HttpResponse.json({ message: "OK" });
        })
      );

      await baseRequest({
        method: "GET",
        uri: "/api/logging-test",
        suppressLogs: false,
      });

      expect(mockConsoleDebug).toHaveBeenCalledWith("in baseRequest");
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        "baseRequest url: https://test.runlightyear.com/api/logging-test"
      );
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        "about to return from baseRequest"
      );
    });

    test("should not log request details when suppressLogs is true", async () => {
      server.use(
        http.get("https://test.runlightyear.com/api/no-logging-test", () => {
          return HttpResponse.json({ message: "OK" });
        })
      );

      await baseRequest({
        method: "GET",
        uri: "/api/no-logging-test",
        suppressLogs: true,
      });

      expect(mockConsoleDebug).not.toHaveBeenCalledWith("in baseRequest");
      expect(mockConsoleDebug).not.toHaveBeenCalledWith(
        expect.stringContaining("baseRequest url:")
      );
      expect(mockConsoleDebug).not.toHaveBeenCalledWith(
        "about to return from baseRequest"
      );
    });
  });

  describe("Environment Configuration", () => {
    test("should use default BASE_URL when environment variable is missing", async () => {
      const originalBaseUrl = process.env.BASE_URL;
      delete process.env.BASE_URL;

      server.use(
        http.get("https://app.runlightyear.com/api/test", () => {
          return HttpResponse.json({ message: "Default URL used" });
        })
      );

      try {
        const response = await baseRequest({
          method: "GET",
          uri: "/api/test",
        });

        expect(response.ok).toBe(true);
        const data = await response.json();
        expect(data.message).toBe("Default URL used");
      } finally {
        process.env.BASE_URL = originalBaseUrl;
      }
    });

    test("should fail when API_KEY is missing", async () => {
      const originalApiKey = process.env.API_KEY;
      delete process.env.API_KEY;

      await expect(
        baseRequest({
          method: "GET",
          uri: "/api/test",
        })
      ).rejects.toThrow("Missing API_KEY");

      process.env.API_KEY = originalApiKey;
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty response body", async () => {
      server.use(
        http.get("https://test.runlightyear.com/api/empty", () => {
          return new HttpResponse(null, { status: 204 });
        })
      );

      const response = await baseRequest({
        method: "GET",
        uri: "/api/empty",
      });

      expect(response.ok).toBe(true);
      expect(response.status).toBe(204);
    });

    test("should handle large request data", async () => {
      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
          description: "A".repeat(100),
        })),
      };

      server.use(
        http.post(
          "https://test.runlightyear.com/api/large",
          async ({ request }) => {
            const body = (await request.json()) as any;
            expect(body.items).toHaveLength(1000);
            return HttpResponse.json({ processed: body.items.length });
          }
        )
      );

      const response = await baseRequest({
        method: "POST",
        uri: "/api/large",
        data: largeData,
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.processed).toBe(1000);
    });
  });
});
