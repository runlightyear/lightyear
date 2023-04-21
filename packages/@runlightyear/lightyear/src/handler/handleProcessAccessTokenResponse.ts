import { handlerResult } from "./handlerResult";
import { oAuthIndex } from "../base/oauth";
import { OAuthConnector } from "../connectors/OAuthConnector";
import { getAuthData, updateAuthDataState } from "../base/auth";
import invariant from "tiny-invariant";

export interface HandleProcessAccessTokenResponseProps {
  customAppName: string | undefined;
  authName: string | undefined;
  status: number | undefined;
  statusText: string | undefined;
  headers: Record<string, string> | undefined;
  text: string | undefined;
}

export async function handleProcessAccessTokenResponse({
  customAppName,
  authName,
  status,
  statusText,
  headers,
  text,
}: HandleProcessAccessTokenResponseProps) {
  if (!customAppName) {
    return handlerResult(400, "Missing customApp");
  }

  if (!authName) {
    return handlerResult(400, "Missing authName");
  }

  if (!status) {
    return handlerResult(400, "Missing status");
  }

  if (!statusText) {
    return handlerResult(400, "Missing statusText");
  }

  if (!headers) {
    return handlerResult(400, "Missing headers");
  }

  if (!text) {
    return handlerResult(400, "Missing text");
  }

  const item = oAuthIndex[customAppName];

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

  const processedAuthData = await connector.processRequestAccessTokenResponse({
    status,
    statusText,
    headers,
    text,
  });

  return handlerResult(200, "Success", processedAuthData);
}
