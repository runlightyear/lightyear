import { AuthData } from "../../base/auth";

export const createMockAuthData = (
  overrides:
    | (Partial<AuthData> & { appName: string; customAppName?: never })
    | (Partial<AuthData> & { customAppName: string; appName?: never })
): AuthData => ({
  managedUser: null,
  appName: null,
  customAppName: null,
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
