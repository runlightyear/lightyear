import { handlerResult } from "./handlerResult";
import { AppWebhookConnector } from "../connectors/AppWebhookConnector";
import { getCustomAppWebhookData } from "../base/customApp";

export interface HandleReceiveCustomApp {
  customAppName: string;
  delivery: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    url: string;
    headers: {
      [key: string]: string;
    };
    body?: string;
  };
}

export async function handleReceiveCustomAppWebhookDelivery({
  customAppName,
  delivery,
}: HandleReceiveCustomApp) {
  console.debug("in handleReceiveCustomAppWebhookDelivery");

  if (!customAppName) {
    return handlerResult(400, "Missing customApp");
  }

  const appWebhookFunc = globalThis.customAppWebhookIndex[customAppName];

  const customAppWebhookData = await getCustomAppWebhookData({
    customAppName,
  });

  let appWebhook: AppWebhookConnector;

  appWebhook = appWebhookFunc({
    auth: customAppWebhookData.auth || undefined,
    variables: customAppWebhookData.variables,
    secrets: customAppWebhookData.secrets,
  });

  try {
    const { response, forward } = await appWebhook.receiveDelivery(delivery);
    return handlerResult(200, "Success", { response, forward });
  } catch (error) {
    console.error(error);
    return handlerResult(500, `Failed to receive delivery: ${error}`);
  }
}
