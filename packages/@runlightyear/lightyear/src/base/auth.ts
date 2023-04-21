import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { prefixedRedactedConsole } from "../logging";
import { getEnvName } from "../util/getEnvName";
import { OAuthConfigData } from "../connectors/OAuthConnector";

/**
 * @internal
 */
export interface AuthProps {
  name: string;
  app?: string;
  customApp?: string;
}

/**
 * @internal
 */
export type AuthData = {
  /**
   * The username for basic authentication
   */
  username: string | null;
  /**
   * The password for basic authentication
   */
  password: string | null;
  /**
   * The api key
   */
  apiKey: string | null;
  tokenType?: string | null;
  state?: string | null;
  codeVerifier?: string | null;
  /**
   * The oauth2 access token
   */
  accessToken: string | null;
  /**
   * The oauth2 refresh token
   */
  refreshToken: string | null;
  /**
   * Date/time when oauth access token expires
   */
  expiresAt?: string | null;
  /**
   * Data/time when oauth access token was last refreshed
   */
  refreshedAt?: string | null;
  /**
   * Store app-specific data beyond the OAuth spec
   */
  extraData?: string | null;
  /**
   * Custom app data
   */
  customAppData?: {
    oAuthConfigData: OAuthConfigData;
    extraData: object;
    extraSecrets: object;
  };
};

/**
 * @internal
 */
export interface GetAuthDataProps {
  appName?: string;
  customAppName?: string;
  authName: string;
}

/**
 * @internal
 *
 * @param props
 */
export async function getAuthData(props: GetAuthDataProps): Promise<AuthData> {
  console.debug("in getAuthData");

  const { customAppName, authName } = props;

  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/custom-apps/${customAppName}/auths/${authName}/data`,
  });

  const data = (await response.json()) as AuthData;

  const {
    accessToken,
    refreshToken,
    apiKey,
    username,
    password,
    customAppData,
  } = data;

  const clientSecret = customAppData?.oAuthConfigData?.clientSecret;

  accessToken && prefixedRedactedConsole.addSecrets([accessToken]);
  refreshToken && prefixedRedactedConsole.addSecrets([refreshToken]);
  apiKey && prefixedRedactedConsole.addSecrets([apiKey]);
  apiKey && prefixedRedactedConsole.addSecrets([password]);

  clientSecret && prefixedRedactedConsole.addSecrets([clientSecret]);

  return data;
}

/**
 * @internal
 */
export interface UpdateAuthDataProps {
  appName?: string;
  customAppName?: string;
  authName: string;
  authData: AuthData;
}

/**
 * @internal
 *
 * @param props
 */
export async function updateAuthData(props: UpdateAuthDataProps) {
  console.debug("in updateAuthData");

  const { customAppName, authName, authData } = props;

  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "PATCH",
    uri: `/api/v1/envs/${envName}/custom-apps/${customAppName}/auths/${authName}/data`,
    data: authData,
  });
}

/**
 * @internal
 */
export interface UpdateAuthDataStateProps {
  appName?: string;
  customAppName?: string;
  authName: string;
}

/**
 * @internal
 *
 * @param props
 */
export async function updateAuthDataState(props: UpdateAuthDataStateProps) {
  console.debug("in updateAuthDataState");

  const { customAppName, authName } = props;

  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/custom-apps/${customAppName}/auths/${authName}/data`,
  });
}

export async function refreshToken(name: string) {
  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  console.info(`Refreshing auth: ${name}`);

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/auths/${name}/refresh`,
  });

  if (!response.ok) {
    console.error(
      `Refresh auth failed: ${response.status} ${response.statusText}`
    );
    const text = await response.text();
    console.error(text);
    throw new Error("Unexpected error");
  }
}
