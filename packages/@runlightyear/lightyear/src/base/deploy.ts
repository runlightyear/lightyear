import { DeployActionProps, ActionData } from "./action";
import { WebhookData, DefineWebhookProps } from "./webhook";
import baseRequest from "./baseRequest";
import { Initializer } from "./Initializer";
import invariant from "tiny-invariant";
import { prefixedRedactedConsole } from "../logging";
import { Auths, Secrets, Variables } from "../run";
import { subscribeProps } from "../subscriptionActivities";
import { getEnvName } from "../util/getEnvName";
import { DefineAuthorizerProps } from "./authorizer";

interface Props {
  envName: string;
}

export interface DeployFuncProps {
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  webhook: string | null;
}

export type DeployFunc = (
  props: DeployFuncProps
) =>
  | Initializer
  | Initializer[]
  | Promise<Initializer>
  | Promise<Initializer[]>;

export type InitializerSpec = Initializer | Initializer[] | DeployFunc;

export type DeployItem = {
  // type: "action" | "auth" | "variable" | "secret" | "subscription" | "webhook";
  type: "action" | "webhook" | "authorizer";
  // data: DeployActionProps | AuthProps | WebhookProps;
  actionProps?: DeployActionProps;
  // authProps?: AuthProps;
  webhookProps?: DefineWebhookProps;
  authorizerProps?: DefineAuthorizerProps;
  // subscribeArgs?: (props: SubscribeArgsProps) => Promise<object>;
  deploy?: (props: DeployFuncProps) => Promise<string>;
};

const deployList: DeployItem[] = [];

export function getDeployList() {
  return deployList;
}

export function pushToDeployList(item: DeployItem) {
  console.debug("pushing item to deployList", item);
  deployList.push(item);
}

/**
 * @internal
 *
 * @param envName
 */
export async function deploy({ envName }: Props) {
  console.debug("deployList", JSON.stringify(deployList, null, 2));

  const names = deployList.map((item) => {
    if (item.type === "action") {
      return item.actionProps?.name;
    } else if (item.type === "webhook") {
      return item.webhookProps?.name;
    } else if (item.type === "authorizer") {
      return `${item.authorizerProps?.customApp} authorizer`;
    }
  });

  console.info(`Deploying ${names.join(", ")}`);

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/deploy`,
    data: deployList,
  });

  console.debug("back from baseRequest");

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deploy failed`);
  }

  console.debug("response was OK");

  console.info("Deploy succeeded");
}

export interface DeployData {
  actions: {
    [actionName: string]: ActionData;
  };
  webhooks: {
    [webhookName: string]: WebhookData;
  };
}

/**
 * @internal
 */
export async function getDeployData(): Promise<DeployData> {
  console.debug("in getDeployData");
  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/deploy/data`,
  });

  const data = <DeployData>await response.json();

  for (const actionData of [
    ...Object.values(data.actions),
    ...Object.values(data.webhooks),
  ]) {
    const { auths, secrets } = actionData;

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
  }

  return data;
}
