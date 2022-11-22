import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { deployList } from "./deploy";
import { AuthData } from "./auth";
import { secrets as secretsList } from "../logging";
import { Auths, Secrets, Variables } from "../run";

export type SubscribeFunc = (props: SubscribeProps) => Promise<object>;
export type UnsubscribeFunc = (props: UnsubscribeProps) => void;

type SubscribeIndex = {
  [name: string]: SubscribeFunc;
};

type UnsubscribeIndex = {
  [name: string]: UnsubscribeFunc;
};

export const subscribeIndex: SubscribeIndex = {};
export const unsubscribeIndex: UnsubscribeIndex = {};

export type SubscriptionStatus =
  | "NOT_SUBSCRIBED"
  | "SUBSCRIBE_FAILED"
  | "SUBSCRIBED"
  | "SUBSCRIBE_ARGS_CHANGED"
  | "UNSUBSCRIBE_FAILED"
  | "UNSUBSCRIBED";

export interface SubscribeArgsProps {
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  webhook: string | null;
}

export interface SubscribeProps {
  auths: Auths;
  subscribeArgs: object;
}

export interface UnsubscribeProps {
  auths: Auths;
  unsubscribeArgs: object;
}

export interface DefineSubscriptionOptions {
  name: string;
  description?: string;
  auths?: {
    [name: string]: string;
  };
  variables?: {
    [name: string]: string;
  };
  secrets?: {
    [name: string]: string;
  };
  webhook: string;
  subscribeArgs: (props: SubscribeArgsProps) => Promise<object>;
  subscribe: (props: SubscribeProps) => Promise<object>;
  unsubscribe: (props: UnsubscribeProps) => void;
}

export interface SubscriptionProps {
  name: string;
}

function validateSubscriptionProps({ name }: SubscriptionProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");
}

export function defineSubscription(options: DefineSubscriptionOptions) {
  const { subscribeArgs, subscribe, unsubscribe, ...rest } = options;
  validateSubscriptionProps(rest);

  deployList.push({
    type: "subscription",
    // data: rest,
    subscribeArgs,
  });
  subscribeIndex[rest.name] = subscribe;
  unsubscribeIndex[rest.name] = unsubscribe;

  return options.name;
}

export async function deploySubscription(
  envName: string,
  props: SubscriptionProps
) {
  validateSubscriptionProps(props);
  const { name }: SubscriptionProps = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/subscriptions`,
    data: {
      name,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deploySubscription failed: ${name}`);
  }

  console.info(`Deployed subscription: ${name}`);
}

export type SubscriptionData = {
  auths: {
    [name: string]: AuthData;
  };
  variables: {
    [name: string]: string | null;
  };
  secrets: {
    [name: string]: string | null;
  };
  webhook: string | null;
  subscribeArgs: object;
  unsubscribeArgs: object;
  status: SubscriptionStatus;
};

export async function getSubscriptionData(
  name: string
): Promise<SubscriptionData> {
  console.log("in getSubscriptionData");
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/subscriptions/${name}/data`,
  });

  const data = (await response.json()) as SubscriptionData;

  const {
    auths,
    variables,
    secrets,
    webhook,
    subscribeArgs,
    unsubscribeArgs,
    status,
  } = data;

  if (auths) {
    for (const auth of Object.values(auths)) {
      const { accessToken, refreshToken, apiKey } = auth;
      accessToken && secretsList.push(accessToken);
      refreshToken && secretsList.push(refreshToken);
      apiKey && secretsList.push(apiKey);
    }
  }

  if (secrets) {
    for (const secretValue of Object.values(secrets)) {
      secretValue && secretsList.push(secretValue);
    }
  }

  return {
    auths,
    variables,
    secrets,
    webhook,
    subscribeArgs,
    unsubscribeArgs,
    status,
  };
}

export interface SetSubscriptionInitArgs {
  name: string;
  status: boolean;
}

export async function setSubscribeArgs(
  envName: string,
  props: {
    name: string;
    subscribeArgs: object;
  }
) {
  const { name, subscribeArgs } = props;

  await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/subscriptions/${name}/subscribe-args`,
    data: {
      subscribeArgs,
    },
  });

  console.info(
    `Set subscription ${name} subscribeArgs to ${JSON.stringify(subscribeArgs)}`
  );
}

export async function setUnsubscribeArgs(
  envName: string,
  props: {
    name: string;
    unsubscribeArgs: string;
  }
) {
  const { name, unsubscribeArgs } = props;

  await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/subscriptions/${name}/unsubscribe-args`,
    data: {
      unsubscribeArgs: unsubscribeArgs,
    },
  });

  console.info(
    `Set subscription ${name} unsubscribeArgs to ${JSON.stringify(
      unsubscribeArgs
    )}`
  );
}

export async function updateSubscription(
  envName: string,
  props: {
    name: string;
    status: SubscriptionStatus;
    unsubscribeArgs: object | undefined;
  }
) {
  const { name, status, unsubscribeArgs } = props;

  await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/subscriptions/${name}`,
    data: {
      status,
      unsubscribeArgs,
    },
  });
}
