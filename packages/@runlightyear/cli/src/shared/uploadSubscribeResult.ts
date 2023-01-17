import fetch from "node-fetch";
import { terminal } from "terminal-kit";

export interface UploadSubscribeResultProps {
  webhookName: string;
  status: string;
  unsubscribeProps: any;
  logs: any;
}

export default async function uploadSubscribeResult(
  props: UploadSubscribeResultProps
) {
  const { webhookName, status, unsubscribeProps, logs } = props;

  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

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
      }),
    }
  );

  if (!subscriptionResponse.ok) {
    console.error("Failed to update subscription");
    console.error(JSON.stringify(await subscriptionResponse.json(), null, 2));
  }
}
