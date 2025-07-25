# Integration Tests with MSW

This directory contains integration tests for the Lightyear SDK that use Mock Service Worker (MSW) to mock network calls.

## Overview

The integration tests are designed to test the functionality of key components like:

- `AuthConnector` - Authentication handling and token refresh logic
- `baseRequest` - HTTP request handling with retry logic
- Network error handling and edge cases

## Setup

### Dependencies

- **MSW (Mock Service Worker)**: Used to mock HTTP requests during testing
- **Vitest**: Testing framework used throughout the project

### Configuration

- `setup.ts` - Configures MSW server and test environment variables
- `vitest.config.ts` - Vitest configuration with MSW setup

### Test Structure

```
src/test/
├── README.md           # This file
├── setup.ts           # MSW server setup and configuration
├── mocks/             # Mock factories and utilities
│   └── authMocks.ts   # Auth-related mock data factories
└── testUtils.ts       # General testing utilities
```

## Usage

### Running Tests

```bash
# Run all tests
pnpm test

# Run integration tests specifically
pnpm test AuthConnector
pnpm test baseRequest

# Run tests in watch mode
pnpm test:watch
```

### Writing New Integration Tests

1. **Import the necessary testing utilities:**

```typescript
import { describe, expect, test, beforeEach, vi } from "vitest";
import { server, http, HttpResponse } from "../test/setup";
```

2. **Mock HTTP requests using MSW:**

```typescript
test("should handle API call", async () => {
  server.use(
    http.get("https://test.runlightyear.com/api/example", () => {
      return HttpResponse.json({ message: "Success" });
    })
  );

  // Your test logic here
});
```

3. **Use mock factories for consistent test data:**

```typescript
import { createMockAuthData } from "../test/mocks/authMocks";

const authData = createMockAuthData({
  accessToken: "custom-token",
  expiresAt: "2024-12-31T23:59:59Z",
});
```

## Mock Factories

### Auth Mocks (`authMocks.ts`)

- `createMockAuthData(overrides?)` - Creates a complete AuthData object
- `createExpiredAuthData()` - Creates auth data with expired tokens
- `createAuthDataWithoutTokens()` - Creates auth data without access/refresh tokens

### Test Utilities (`testUtils.ts`)

- `createConsoleSpy()` - Mocks console methods for testing
- `waitFor(ms)` - Utility for waiting in tests
- `validateAuthDataStructure(authData)` - Validates AuthData structure
- `setupTestEnvironment()` - Sets up test environment variables

## Environment Variables

The test setup automatically configures these environment variables:

- `BASE_URL=https://test.runlightyear.com`
- `API_KEY=test-api-key`
- `ENV_NAME=test`

## MSW Configuration

The MSW server is configured to:

- Listen for requests during test runs
- Reset handlers after each test
- Warn about unhandled requests (instead of erroring)

## Test Coverage Areas

### AuthConnector Integration Tests

- ✅ Constructor with auth data provided and default values
- ✅ Successful auth data refresh
- ✅ Token expiration and automatic refresh logic
- ✅ Error handling for failed requests
- ✅ Environment variable configurations
- ✅ Security scenarios with sensitive data

### BaseRequest Integration Tests

- ✅ Successful GET/POST requests with data and query parameters
- ✅ Error handling (4xx client errors, authentication failures)
- ✅ Retry logic for 5xx server errors
- ✅ Request headers and authentication
- ✅ Response header handling (x-request-id)
- ✅ Logging and debug modes
- ✅ Environment configuration validation
- ✅ Edge cases (empty responses, large payloads)

## Best Practices

1. **Always use MSW for network mocking** - Don't mock fetch directly
2. **Reset handlers between tests** - This is done automatically in `setup.ts`
3. **Use mock factories** - Provides consistent test data
4. **Test error scenarios** - Include network failures, timeouts, invalid responses
5. **Validate environment variables** - Ensure proper configuration
6. **Mock console methods** - Avoid noise in test output
7. **Use descriptive test names** - Clearly indicate what is being tested

## Example Test

```typescript
import { describe, expect, test, vi } from "vitest";
import { server, http, HttpResponse } from "../test/setup";
import { AuthConnector } from "./AuthConnector";
import { createMockAuthData } from "../test/mocks/authMocks";

describe("MyConnector Integration Tests", () => {
  test("should handle successful auth refresh", async () => {
    const initialAuth = createMockAuthData();
    const refreshedAuth = createMockAuthData({
      accessToken: "new-token",
    });

    server.use(
      http.get(
        "https://test.runlightyear.com/api/v1/envs/test/custom-apps/test-custom-app/auths/test-auth/data",
        () => {
          return HttpResponse.json(refreshedAuth);
        }
      )
    );

    const connector = new MyConnector({ auth: initialAuth });
    await connector.refreshAuthData();

    expect(connector.getAuthData().accessToken).toBe("new-token");
  });
});
```

## Troubleshooting

### Common Issues

1. **Unhandled request warnings**: Add appropriate MSW handlers for all requests
2. **Environment variable issues**: Check that test environment variables are set correctly
3. **MSW setup problems**: Ensure `setup.ts` is imported in vitest config
4. **Type errors with MSW**: Make sure to cast request bodies as needed (`as any`)

### Debug Tips

- Use `server.listHandlers()` to see active request handlers
- Add `console.log` in MSW handlers to debug request matching
- Check that URLs in tests match the MSW handler patterns exactly
- Use MSW's browser DevTools extension for debugging (in browser environments)
