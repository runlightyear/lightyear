import fetch from "node-fetch";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export interface UpdateUnsubscribeResultProps {
  subscriptionActivityId: string;
  webhookName: string;
  status: string;
  logs: any;
  removed: boolean;
}

export default async function updateUnsubscribeResult(
  props: UpdateUnsubscribeResultProps
) {
  const { subscriptionActivityId, webhookName, status, logs, removed } = props;

  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  const activityResponse = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/webhooks/${webhookName}/subscription/activities/${subscriptionActivityId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        logs,
      }),
    }
  );

  if (activityResponse.ok) {
    console.debug("Updated unsubscribe activity\n");
  } else {
    console.error(
      "Failed to update unsubscribe activity:",
      activityResponse.status,
      activityResponse.statusText
    );
    console.error(JSON.stringify(await activityResponse.json(), null, 2));
  }

  const unsubscriptionResponse = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/webhooks/${webhookName}/subscription`,
    {
      method: "PATCH",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status:
          status === "FAILED"
            ? "UNSUBSCRIBE_FAILED"
            : removed
            ? "UNSUBSCRIBED"
            : "NOT_SUBSCRIBED",
      }),
    }
  );

  if (unsubscriptionResponse.ok) {
    console.debug("Uploaded unsubscribe activity\n");
  } else {
    console.error("Failed to update subscription\n");
    console.error(
      JSON.stringify(await unsubscriptionResponse.json(), null, 2),
      "\n"
    );
  }
}
