import { handlerResult } from "./handlerResult";
import { OAuthConnector } from "../connectors/OAuthConnector";
import { getAuthData, updateAuthDataState } from "../base/auth";
import invariant from "tiny-invariant";

export interface HandleRequestAccessTokenProps {
  customAppName: string | undefined;
  authName: string | undefined;
  code: string | undefined;
}

export async function handleRequestAccessToken({
  customAppName,
  authName,
  code,
}: HandleRequestAccessTokenProps) {
  console.debug("Requesting access token");

  if (!customAppName) {
    return handlerResult(400, "Missing customApp");
  }

  if (!authName) {
    return handlerResult(400, "Missing authName");
  }

  if (!code) {
    return handlerResult(400, "Missing code");
  }

  const item = globalThis.authorizerIndex[customAppName];

  const authData = await getAuthData({
    customAppName: customAppName,
    authName,
  });

  invariant(authData.customAppData, "Missing customAppData");
  invariant(authData.customAppData.oAuthConfigData, "Missing oAuthConfigData");

  let connector: OAuthConnector;

  connector = item({
    customAppName,
    oauthConfigData: authData.customAppData.oAuthConfigData,
    authData,
  });

  await connector.requestAccessToken(code);

  console.info("Requested access token successfully");

  return handlerResult(200, "Success");
}
