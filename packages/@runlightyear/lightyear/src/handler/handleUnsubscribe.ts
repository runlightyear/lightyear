import { handlerResult } from "./handlerResult";
import { unsubscribe } from "../subscriptionActivities";
import { getWebhookData } from "../base/webhook";
import { createSubscriptionActivity } from "../base/subscriptionActivity";
import { updateSubscription } from "../base/subscription";

export interface HandleUnsubscribeProps {
  envName: string;
  webhookName: string | undefined;
  removed: boolean | undefined;
}

export async function handleUnsubscribe({
  envName,
  webhookName,
  removed,
}: HandleUnsubscribeProps) {
  if (!webhookName) {
    return handlerResult(400, "Missing webhookName");
  }

  const webhookData = await getWebhookData(webhookName);

  let statusCode: number;
  let message: string;

  try {
    await unsubscribe(webhookName, webhookData);
    statusCode = 200;
    message = "Unsubscribe successful";
  } catch (error) {
    console.error("Failed to unsubscribe", String(error));
    statusCode = 500;
    message = `Unsubscribe failed: ${error}`;
  }

  // @ts-ignore
  const logList = [...global.logs];

  await createSubscriptionActivity({
    webhookName: webhookName,
    type: "UNSUBSCRIBE",
    status: statusCode === 200 ? "SUCCEEDED" : "FAILED",
    logs: logList,
  });

  if (removed) {
    await updateSubscription(
      envName,
      webhookName,
      statusCode === 200 ? "UNSUBSCRIBED" : "UNSUBSCRIBE_FAILED"
    );
  }

  return handlerResult(statusCode, message);
}
