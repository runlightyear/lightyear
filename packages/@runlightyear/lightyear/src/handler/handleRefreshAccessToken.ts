import { handlerResult } from "./handlerResult";
import { authorizerIndex } from "../base/authorizer";
import { OAuthConnector } from "../connectors/OAuthConnector";
import { getAuthData, updateAuthDataState } from "../base/auth";
import invariant from "tiny-invariant";

export interface HandleRefreshAccessTokenProps {
  customAppName: string | undefined;
  authName: string | undefined;
}

export async function handleRefreshAccessToken({
  customAppName,
  authName,
}: HandleRefreshAccessTokenProps) {
  if (!customAppName) {
    return handlerResult(400, "Missing customApp");
  }

  if (!authName) {
    return handlerResult(400, "Missing authName");
  }

  const item = authorizerIndex[customAppName];

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

  await connector.refreshAccessToken();

  return handlerResult(200, "Success");
}
