import fetch from "node-fetch";
import { terminal } from "terminal-kit";

export interface UploadUnsubscribeResultProps {
  webhookName: string;
  status: string;
  logs: any;
}

export default async function uploadUnsubscribeResult(
  props: UploadUnsubscribeResultProps
) {
  const { webhookName, status, logs } = props;

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
    // terminal("Uploaded deploy result\n");
  } else {
    terminal.red(
      "Failed to upload unsubscribe activity: ",
      activityResponse.status,
      " ",
      activityResponse.statusText,
      "\n"
    );
    terminal.red(JSON.stringify(await activityResponse.json(), null, 2), "\n");
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
        status: status === "FAILED" ? "UNSUBSCRIBE_FAILED" : "UNSUBSCRIBED",
      }),
    }
  );

  if (!subscriptionResponse.ok) {
    terminal.red("Failed to update subscription\n");
    terminal.red(
      JSON.stringify(await subscriptionResponse.json(), null, 2),
      "\n"
    );
  }
}
