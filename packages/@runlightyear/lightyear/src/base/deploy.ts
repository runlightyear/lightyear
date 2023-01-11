import { DeployActionProps, ActionData } from "./action";
import { AuthProps } from "./auth";
import { WebhookData, WebhookProps } from "./webhook";
import baseRequest from "./baseRequest";
import { Initializer } from "./Initializer";
import invariant from "tiny-invariant";
import { prefixedRedactedConsole } from "../logging";
import { Auths, Secrets, Variables } from "../run";
import { setSubscribeProps } from "./subscription";

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
  type: "action" | "webhook";
  // data: DeployActionProps | AuthProps | WebhookProps;
  actionProps?: DeployActionProps;
  // authProps?: AuthProps;
  webhookProps?: WebhookProps;
  // subscribeArgs?: (props: SubscribeArgsProps) => Promise<object>;
  deploy?: (props: DeployFuncProps) => Promise<string>;
};

export const deployList: DeployItem[] = [];

export async function deploy({ envName }: Props) {
  console.debug("deployList", JSON.stringify(deployList));

  const names = deployList.map((item) => {
    if (item.type === "action") {
      return item.actionProps?.name;
    } else if (item.type === "webhook") {
      return item.webhookProps?.name;
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

  const deployData = await getDeployData();

  // console.log(
  //   "about to go through deployList to get subscribeArgs for subscriptions"
  // );
  for (const item of deployList) {
    if (item.type === "webhook") {
      const { webhookProps } = item;
      if (webhookProps?.subscribeProps) {
        const { subscribeProps } = webhookProps;

        const webhookData = deployData.webhooks[webhookProps.name];
        const subscribePropsResult = await subscribeProps(webhookData);
        await setSubscribeProps(
          envName,
          webhookProps.name,
          subscribePropsResult
        );
      } else {
        throw new Error(
          `Missing subscribeProps for webhook ${webhookProps?.name}`
        );
      }
    }
  }

  // console.log("about to go through deployList");
  // for (const item of deployList) {
  //   if (item.type === "action") {
  //     let initializerArray: Initializer[];
  //     let temp: Initializer | Initializer[];
  //     if (!item.deploy) {
  //       await setActionInitializedStatus(envName, {
  //         name: item.data.name,
  //         status: true,
  //       });
  //     } else {
  //       if (item.deploy instanceof Function) {
  //         const itemDeployData = deployData[item.data.name];
  //         temp = await item.deploy(itemDeployData);
  //       } else {
  //         temp = item.deploy;
  //       }
  //
  //       if (temp === null || temp === undefined) {
  //         initializerArray = [];
  //       } else if (temp instanceof Initializer) {
  //         initializerArray = [temp];
  //       } else {
  //         initializerArray = temp;
  //       }
  //
  //       try {
  //         for (const initializer of initializerArray) {
  //           await initializer.init();
  //         }
  //
  //         await setActionInitializedStatus(envName, {
  //           name: item.data.name,
  //           status: true,
  //         });
  //       } catch (error) {
  //         await setActionInitializedStatus(envName, {
  //           name: item.data.name,
  //           status: false,
  //         });
  //       }
  //     }
  //   }
  // }

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

export async function getDeployData(): Promise<DeployData> {
  console.debug("in getDeployData");
  const envName = process.env.ENV_NAME;
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
