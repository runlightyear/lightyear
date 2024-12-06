import { handlerResult } from "./handlerResult";
import { OAuthConnector } from "../connectors/OAuthConnector";
import { getAuthData, updateAuthDataState } from "../base/auth";
import invariant from "tiny-invariant";

export interface HandleGetAuthRequestUrl {
  customApp: string;
  authName: string;
}

export async function handleGetAuthRequestUrl({
  customApp,
  authName,
}: HandleGetAuthRequestUrl) {
  console.debug("Getting auth request url");

  if (!customApp) {
    return handlerResult(400, "Missing customApp");
  }

  const item = globalThis.authorizerIndex[customApp];

  // await updateAuthDataState({ customAppName: customApp, authName });

  const authData = await getAuthData({ customAppName: customApp, authName });

  invariant(authData.customAppData, "Missing customAppData");
  invariant(authData.customAppData.oAuthConfigData, "Missing oAuthConfigData");

  let connector: OAuthConnector;
  try {
    connector = item({
      customAppName: customApp,
      oauthConfigData: authData.customAppData.oAuthConfigData,
      authData,
    });

    console.debug("connector", connector);

    const authRequestUrl = connector.getAuthRequestUrl();
    return handlerResult(200, "Success", { authRequestUrl });
  } catch (error) {
    console.error("Failed to get auth request url", String(error));
    return handlerResult(500, String(error));
  }
}
