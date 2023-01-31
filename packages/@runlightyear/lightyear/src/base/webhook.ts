import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { deployList } from "./deploy";
import { AppName } from "./action";
import { Auths, Secrets, Variables } from "../run";
import { AuthData } from "./auth";
import { prefixedRedactedConsole } from "../logging";
import { getEnvName } from "../util/getEnvName";

export type SubscribeFuncProps = {
  endpoint: string;
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  subscribeProps: any;
};

export type UnsubscribeFuncProps = {
  endpoint: string;
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  unsubscribeProps: any;
};

export type SubscribeFunc = (props: SubscribeFuncProps) => Promise<object>;
export type UnsubscribeFunc = (props: UnsubscribeFuncProps) => void;

type SubscribeIndex = {
  [name: string]: SubscribeFunc;
};

type UnsubscribeIndex = {
  [name: string]: UnsubscribeFunc;
};

export const subscribeIndex: SubscribeIndex = {};
export const unsubscribeIndex: UnsubscribeIndex = {};

export type SubscribePropsFuncProps = {
  endpoint: string;
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
};

export type SubscribePropsFunc = (props: SubscribePropsFuncProps) => object;

export interface WebhookProps {
  name: string;
  title: string;
  apps?: Array<AppName>;
  variables?: Array<string>;
  secrets?: Array<string>;
  subscribeProps?: SubscribePropsFunc;
  subscribe?: SubscribeFunc;
  unsubscribe?: UnsubscribeFunc;
}

function validateWebhookProps({ name }: WebhookProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");
}

export function defineWebhook(props: WebhookProps) {
  deployList.push({
    type: "webhook",
    webhookProps: props,
  });
  if (props.subscribe) {
    subscribeIndex[props.name] = props.subscribe;
  }
  if (props.unsubscribe) {
    unsubscribeIndex[props.name] = props.unsubscribe;
  }

  return props.name;
}

export async function deployWebhook(envName: string, props: WebhookProps) {
  validateWebhookProps(props);

  const { name } = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/webhooks`,
    data: {
      name,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deployWebhook failed: ${name}`);
  }

  console.info(`Deployed webhook: ${name}`);
}

export type WebhookData = {
  endpoint: string;
  auths: {
    [name: string]: AuthData;
  };
  variables: {
    [name: string]: string | null;
  };
  secrets: {
    [name: string]: string | null;
  };
  subscribeProps: any;
  unsubscribeProps: any;
};

export async function getWebhookData(name: string): Promise<WebhookData> {
  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/webhooks/${name}/data`,
  });

  const data = <WebhookData>await response.json();

  const {
    endpoint,
    auths,
    variables,
    secrets,
    subscribeProps,
    unsubscribeProps,
  } = data;

  if (auths) {
    for (const auth of Object.values(auths)) {
      const { accessToken, refreshToken, apiKey } = auth;

      accessToken && prefixedRedactedConsole.addSecrets([accessToken]);
      refreshToken && prefixedRedactedConsole.addSecrets([refreshToken]);
      apiKey && prefixedRedactedConsole.addSecrets([apiKey]);
    }
  }

  if (secrets) {
    prefixedRedactedConsole.addSecrets(Object.values(secrets));
  }

  return {
    endpoint,
    auths,
    variables,
    secrets,
    subscribeProps,
    unsubscribeProps,
  };
}
