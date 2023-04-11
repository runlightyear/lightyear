import fetch from "node-fetch";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export interface CreateUnsubscribeActivityProps {
  webhookName: string;
  removed: boolean;
}

export default async function createUnsubscribeActivity(
  props: CreateUnsubscribeActivityProps
) {
  const { webhookName, removed } = props;

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
        type: "UNSUBSCRIBE",
        status: "QUEUED",
      }),
    }
  );

  if (activityResponse.ok) {
    console.debug("Created unsubscribe activity\n");
    const json = await activityResponse.json();
    if (!json.id) {
      throw new Error("Missing unsubscribe activity id");
    }
    return json.id as string;
  } else {
    console.error(
      "Failed to create unsubscribe activity:",
      activityResponse.status,
      activityResponse.statusText
    );
    console.error(JSON.stringify(await activityResponse.json(), null, 2));
    throw new Error("Failed to create unsubscribe activity");
  }
}
