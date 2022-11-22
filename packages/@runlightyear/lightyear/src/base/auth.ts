import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { secrets } from "../logging";
import { deployList } from "./deploy";

/**
 * @public
 */
export interface AuthProps {
  name: string;
  app?: string;
  customApp?: string;
}

function validateAuthProps({ name }: AuthProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");
}

/**
 * @public
 */
export function defineAuth(props: AuthProps) {
  validateAuthProps(props);
  deployList.push({ type: "auth", authProps: props });

  return props.name;
}

export async function deployAuth(envName: string, props: AuthProps) {
  // console.log("testing");
  validateAuthProps(props);
  const { name, app, customApp }: AuthProps = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/auths`,
    data: {
      name,
      app,
      customApp,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deployAuth failed: ${name}`);
  }

  console.info(`Deployed auth: ${name}`);
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
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/auths/${name}/data`,
  });

  const data = (await response.json()) as AuthData;

  const { accessToken, refreshToken, apiKey } = data;

  accessToken && secrets.push(accessToken);
  refreshToken && secrets.push(refreshToken);
  apiKey && secrets.push(apiKey);

  return {
    accessToken,
    refreshToken,
    apiKey,
  };
}

export async function refreshToken(name: string) {
  const envName = process.env.ENV_NAME;
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
