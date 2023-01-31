import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { prefixedRedactedConsole } from "../logging";
import { getEnvName } from "../util/getEnvName";

/**
 * @public
 */
export interface AuthProps {
  name: string;
  app?: string;
  customApp?: string;
}

/**
 * @public
 */
export type AuthData = {
  /**
   * The api key
   */
  apiKey: string | null;
  tokenType?: string | null;
  state?: string | null;
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
};

/**
 * @public
 *
 * @param name - the name of the auth
 */
export async function getAuthData(name: string): Promise<AuthData> {
  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/auths/${name}/data`,
  });

  const data = (await response.json()) as AuthData;

  const { accessToken, refreshToken, apiKey } = data;

  accessToken && prefixedRedactedConsole.addSecrets([accessToken]);
  refreshToken && prefixedRedactedConsole.addSecrets([refreshToken]);
  apiKey && prefixedRedactedConsole.addSecrets([apiKey]);

  return {
    accessToken,
    refreshToken,
    apiKey,
  };
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
