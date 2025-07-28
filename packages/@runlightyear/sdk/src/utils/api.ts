/**
 * Utility functions for making API requests to Lightyear platform
 */

export interface AuthData {
  managedUser: {
    id: string;
    externalId: string;
  } | null;
  appName: string | null;
  customAppName: string | null;
  authName: string;
  username: string | null;
  password: string | null;
  apiKey: string | null;
  tokenType?: string | null;
  state?: string | null;
  codeVerifier?: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt?: string | null;
  refreshedAt?: string | null;
  extraData?: Record<string, any> | null;
  customAppData?: {
    oAuthConfigData: {
      clientId: string;
      clientSecret: string;
      authRequestUrl?: string;
      [key: string]: any;
    };
    extraData: object;
    extraSecrets: object;
  };
}

export interface GetAuthDataProps {
  customAppName: string;
  authName: string;
}

export interface UpdateAuthDataProps {
  appName?: string;
  customAppName?: string;
  authName: string;
  authData: AuthData;
}

/**
 * Get environment name from process.env
 */
export function getEnvName(): string {
  return process.env.ENV_NAME || "dev";
}

/**
 * Get base URL from process.env
 */
export function getBaseUrl(): string {
  return process.env.BASE_URL || "https://app.runlightyear.com";
}

/**
 * Get API key from process.env
 */
export function getApiKey(): string | undefined {
  return process.env.LIGHTYEAR_API_KEY || process.env.API_KEY;
}

/**
 * Make authenticated API request to Lightyear platform
 */
export async function makeApiRequest(
  uri: string,
  options: {
    method?: string;
    data?: any;
  } = {}
): Promise<Response> {
  const { method = "GET", data } = options;

  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();
  const envName = getEnvName();

  if (!baseUrl) {
    throw new Error("Missing BASE_URL environment variable");
  }

  if (!apiKey) {
    throw new Error(
      "Missing API key. Set LIGHTYEAR_API_KEY or API_KEY environment variable."
    );
  }

  if (!envName) {
    throw new Error("Missing ENV_NAME environment variable");
  }

  const url = `${baseUrl}${uri}`;
  const requestOptions: RequestInit = {
    method,
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  if (data && method !== "GET") {
    requestOptions.body = JSON.stringify(data);
  }

  console.debug(`Making API request: ${method} ${url}`);

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response;
}

/**
 * Get OAuth configuration data for a custom app from Lightyear platform
 */
export async function getAuthData(props: GetAuthDataProps): Promise<AuthData> {
  console.debug("Getting auth data from Lightyear platform");

  const { customAppName, authName } = props;
  const envName = getEnvName();

  const uri = `/api/v1/envs/${envName}/custom-apps/${customAppName}/auths/${authName}/data`;

  try {
    const response = await makeApiRequest(uri);
    const data = (await response.json()) as AuthData;

    console.debug(
      `Successfully retrieved auth data for ${customAppName}/${authName}`
    );

    return data;
  } catch (error) {
    console.error(
      `Failed to get auth data for ${customAppName}/${authName}:`,
      error
    );
    throw error;
  }
}

/**
 * Update OAuth auth data for a custom app in Lightyear platform
 */
export async function updateAuthData(
  props: UpdateAuthDataProps
): Promise<void> {
  console.debug("Updating auth data in Lightyear platform");

  const { appName, customAppName, authName, authData } = props;

  if (!customAppName && !appName) {
    throw new Error("Must specify customAppName or appName");
  }

  if (customAppName && appName) {
    throw new Error("Only specify customAppName or appName, not both");
  }

  const envName = getEnvName();

  // Use appropriate URI based on app type
  const uri = appName
    ? `/api/v1/envs/${envName}/apps/${appName}/auths/${authName}/data`
    : `/api/v1/envs/${envName}/custom-apps/${customAppName}/auths/${authName}/data`;

  try {
    console.info(
      `💾 Saving OAuth tokens to platform for ${
        customAppName || appName
      }/${authName}...`
    );

    const response = await makeApiRequest(uri, {
      method: "PATCH",
      data: authData,
    });

    console.info(`✅ Successfully saved OAuth tokens to platform`);
    console.debug(
      `Auth data updated for ${customAppName || appName}/${authName}`
    );
  } catch (error) {
    console.error(
      `Failed to update auth data for ${customAppName || appName}/${authName}:`,
      error
    );
    throw error;
  }
}
