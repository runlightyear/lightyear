import baseRequest from "./baseRequest";
import invariant from "tiny-invariant";

interface Props {
  type: "SUBSCRIBE" | "UNSUBSCRIBE";
  status: "QUEUED" | "RUNNING" | "SUCCESS" | "FAILURE";
  subscriptionName: string;
  logs: string[];
}

export async function createSubscriptionAction({
  type,
  status,
  subscriptionName,
  logs,
}: Props) {
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  return await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/subscription-actions`,
    data: {
      type,
      status,
      subscriptionName,
      logs,
    },
  });
}
