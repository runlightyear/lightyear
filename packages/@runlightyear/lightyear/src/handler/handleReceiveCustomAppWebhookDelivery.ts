import { handlerResult } from "./handlerResult";
import { customAppWebhookIndex } from "../base/customAppWebhook";
import { AppWebhookConnector } from "../connectors/AppWebhookConnector";

export interface HandleReceiveCustomApp {
  customAppName: string;
  authName: string;
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
  authName,
  delivery,
}: HandleReceiveCustomApp) {
  console.debug("in handleReceiveCustomAppWebhookDelivery");

  if (!customAppName) {
    return handlerResult(400, "Missing customApp");
  }

  const item =globalThis.customAppWebhookIndex[customAppName];

  let connector: AppWebhookConnector;

  connector = item({
    customAppName: customAppName,
    authName,
  });

  try {
    const { response } = await connector.receiveDelivery(delivery);
    return handlerResult(200, "Success", { response });
  } catch (error) {
    console.error(error);
    return handlerResult(500, `Failed to receive delivery: ${error}`);
  }
}
