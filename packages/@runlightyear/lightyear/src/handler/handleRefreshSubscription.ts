import { handlerResult } from "./handlerResult";
import { getWebhookData } from "../base/webhook";
import { refreshSubscription } from "../subscriptionActivities";

export interface HandleRefreshSubscriptionProps {
  webhookName: string | undefined;
}

export async function handleRefreshSubscription({
  webhookName,
}: HandleRefreshSubscriptionProps) {
  if (!webhookName) {
    return handlerResult(400, "Missing webhookName");
  }

  const webhookData = await getWebhookData(webhookName);

  try {
    const unsubscribeProps = await refreshSubscription(webhookName, {
      endpoint: webhookData.endpoint,
      auths: webhookData.auths,
      variables: webhookData.variables,
      secrets: webhookData.secrets,
      unsubscribeProps: webhookData.unsubscribeProps,
      subscribeProps: webhookData.subscribeProps,
    });
    return handlerResult(200, "Refresh successful", { unsubscribeProps });
  } catch (error) {
    console.error("Failed to refresh subscription", String(error));
    return handlerResult(500, `Refresh failed: ${error}`);
  }
}
