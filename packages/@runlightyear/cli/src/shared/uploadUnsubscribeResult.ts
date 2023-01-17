import fetch from "node-fetch";
import { terminal } from "terminal-kit";

export interface UploadUnsubscribeResultProps {
  webhookName: string;
  status: string;
  logs: any;
  removed: boolean;
}

export default async function uploadUnsubscribeResult(
  props: UploadUnsubscribeResultProps
) {
  const { webhookName, status, logs, removed } = props;

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
        type: "UNSUBSCRIBE",
        status,
        logs,
      }),
    }
  );

  if (activityResponse.ok) {
    console.debug("Uploaded unsubscribe activity\n");
  } else {
    console.error(
      "Failed to upload unsubscribe activity:",
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
