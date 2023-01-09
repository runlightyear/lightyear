import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { Auths, Secrets, Variables } from "../run";

export type SubscriptionStatus =
  | "NOT_SUBSCRIBED"
  | "SUBSCRIBE_FAILED"
  | "SUBSCRIBED"
  | "SUBSCRIBE_ARGS_CHANGED"
  | "UNSUBSCRIBE_FAILED"
  | "UNSUBSCRIBED";

export interface UnsubscribeProps {
  auths: Auths;
  unsubscribeArgs: object;
}

export interface SubscriptionProps {
  name: string;
}

function validateSubscriptionProps({ name }: SubscriptionProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");
}

export async function setSubscribeProps(
  envName: string,
  webhookName: string,
  subscribeProps: object
) {
  await baseRequest({
    method: "PUT",
    uri: `/api/v1/envs/${envName}/webhooks/${webhookName}/subscribe-props`,
    data: {
      subscribeProps,
    },
  });

  console.info(
    `Set webhook ${webhookName} subscribeProps to ${JSON.stringify(
      subscribeProps
    )}`
  );
}

export async function setUnsubscribeProps(
  envName: string,
  webhookName: string,
  unsubscribeProps: string
) {
  await baseRequest({
    method: "PUT",
    uri: `/api/v1/envs/${envName}/webhooks/${webhookName}/unsubscribe-props`,
    data: {
      unsubscribeProps,
    },
  });

  console.info(
    `Set webhook ${webhookName} unsubscribeProps to ${JSON.stringify(
      unsubscribeProps
    )}`
  );
}

export async function updateSubscription(
  envName: string,
  webhookName: string,
  status: SubscriptionStatus,
  unsubscribeProps?: object
) {
  await baseRequest({
    method: "PATCH",
    uri: `/api/v1/envs/${envName}/webhooks/${webhookName}/subscription`,
    data: {
      status,
      unsubscribeProps,
    },
  });
}
