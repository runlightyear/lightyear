import { getWebhookData } from "../base/webhook";
import { subscribe } from "../subscriptionActivities";
import { handlerResult } from "./handlerResult";

export interface HandleSubscribeProps {
  envName: string;
  webhookName: string | undefined;
}
export async function handleSubscribe({ webhookName }: HandleSubscribeProps) {
  if (!webhookName) {
    return handlerResult(400, "Missing webhookName");
  }

  const webhookData = await getWebhookData(webhookName);

  try {
    const unsubscribeProps = await subscribe(webhookName, webhookData);
    return handlerResult(200, "Subscribe successful", { unsubscribeProps });
  } catch (error) {
    console.error("Failed to subscribe", String(error));
    return handlerResult(500, `Subscribe failed: ${error}`);
  }
}
