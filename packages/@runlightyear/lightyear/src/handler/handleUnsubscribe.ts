import { handlerResult } from "./handlerResult";
import { unsubscribe } from "../subscriptionActivities";
import { getWebhookData } from "../base/webhook";

export interface HandleUnsubscribeProps {
  envName: string;
  webhookName: string | undefined;
  removed: boolean | undefined;
}

export async function handleUnsubscribe({
  webhookName,
  removed,
}: HandleUnsubscribeProps) {
  if (!webhookName) {
    return handlerResult(400, "Missing webhookName");
  }

  const webhookData = await getWebhookData(webhookName);

  try {
    await unsubscribe(webhookName, webhookData);
    return handlerResult(200, "Unsubscribe successful");
  } catch (error) {
    console.error("Failed to unsubscribe", String(error));
    return handlerResult(500, `Unsubscribe failed: ${error}`);
  }
}
