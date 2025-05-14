import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export interface CreateSubscribeActivityProps {
  webhookName: string;
  deployId: string;
}

export default async function createSubscribeActivity(
  props: CreateSubscribeActivityProps
) {
  const { webhookName, deployId } = props;

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
        status: "QUEUED",
      }),
    }
  );

  if (activityResponse.ok) {
    console.debug("Uploaded subscribe activity result");
    const json = await activityResponse.json();
    if (!json.id) {
      throw new Error("Missing subscribe activity id");
    }
    return json.id as string;
  } else {
    console.error(
      "Failed to create subscribe activity: ",
      activityResponse.status,
      activityResponse.statusText
    );
    console.error(JSON.stringify(await activityResponse.json(), null, 2));
    throw new Error("Failed to create subscribe activity");
  }
}
