import fetch from "node-fetch";
import { terminal } from "terminal-kit";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export interface UploadSubscribeResultProps {
  webhookName: string;
  status: string;
  unsubscribeProps: any;
  deployId: string;
  logs: any;
}

export default async function uploadSubscribeResult(
  props: UploadSubscribeResultProps
) {
  const { webhookName, status, unsubscribeProps, logs, deployId } = props;

  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  const activityResponse = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/webhooks/${webhookName}/subscription/activities`,
    {
      method: "POST",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "SUBSCRIBE",
        status,
        logs,
      }),
    }
  );

  if (activityResponse.ok) {
    console.debug("Uploaded subscribe activity result");
  } else {
    console.error(
      "Failed to upload subscribe activity: ",
      activityResponse.status,
      activityResponse.statusText
    );
    console.error(JSON.stringify(await activityResponse.json(), null, 2));
  }

  const subscriptionResponse = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/webhooks/${webhookName}/subscription`,
    {
      method: "PATCH",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status === "FAILED" ? "SUBSCRIBE_FAILED" : "SUBSCRIBED",
        unsubscribeProps,
        deployId,
      }),
    }
  );

  if (!subscriptionResponse.ok) {
    console.error("Failed to update subscription");
    console.error(JSON.stringify(await subscriptionResponse.json(), null, 2));
  }
}
