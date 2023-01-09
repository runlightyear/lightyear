import baseRequest from "./baseRequest";
import invariant from "tiny-invariant";

interface Props {
  webhookName: string;
  type: "SUBSCRIBE" | "UNSUBSCRIBE";
  status: "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED";
  logs: string[];
}

export async function createSubscriptionActivity({
  webhookName,
  type,
  status,
  logs,
}: Props) {
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  return await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/webhooks/${webhookName}/subscription/activities`,
    data: {
      type,
      status,
      logs,
    },
  });
}
