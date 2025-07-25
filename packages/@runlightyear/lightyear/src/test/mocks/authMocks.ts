import { AuthData } from "../../base/auth";

export const createMockAuthData = (
  overrides: Partial<AuthData> = {}
): AuthData => ({
  managedUser: null,
  appName: "TestApp",
  customAppName: "test-custom-app",
  authName: "test-auth",
  username: null,
  password: null,
  apiKey: null,
  tokenType: "Bearer",
  state: null,
  codeVerifier: null,
  accessToken: "test-access-token",
  refreshToken: "test-refresh-token",
  expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
  refreshedAt: new Date().toISOString(),
  extraData: null,
  customAppData: {
    oAuthConfigData: {
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      authRequestUrl: "https://test.com/auth",
    },
    extraData: {},
    extraSecrets: {},
  },
  ...overrides,
});

export const createExpiredAuthData = (): AuthData =>
  createMockAuthData({
    expiresAt: new Date(Date.now() - 1000).toISOString(), // Expired 1 second ago
  });

export const createAuthDataWithoutTokens = (): AuthData =>
  createMockAuthData({
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  });
