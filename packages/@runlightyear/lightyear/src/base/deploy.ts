import { DeployActionProps, ActionData } from "./action";
import { AuthProps } from "./auth";
import { WebhookProps } from "./webhook";
import baseRequest from "./baseRequest";
import { Initializer } from "./Initializer";
import invariant from "tiny-invariant";
import { secrets as secretsList } from "../logging";
import { Auths, Secrets, Variables } from "../run";
import { setSubscribeArgs, SubscribeArgsProps } from "./subscription";

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
  type: "action" | "auth" | "variable" | "secret" | "subscription" | "webhook";
  // data: DeployActionProps | AuthProps | WebhookProps;
  actionProps?: DeployActionProps;
  authProps?: AuthProps;
  webhookProps?: WebhookProps;
  subscribeArgs?: (props: SubscribeArgsProps) => Promise<object>;
  deploy?: (props: DeployFuncProps) => Promise<string>;
};

export const deployList: DeployItem[] = [];

export async function deploy({ envName }: Props) {
  console.log("deployList", JSON.stringify(deployList));

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/deploy`,
    data: deployList,
  });

  console.log("back from baseRequest");

  console.log("testing");

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deploy failed`);
  }

  console.log("response was OK");

  const deployData = await getDeployData();

  // console.log(
  //   "about to go through deployList to get subscribeArgs for subscriptions"
  // );
  // for (const item of deployList) {
  //   if (item.type === "subscription") {
  //     if (item.subscribeArgs && item.subscribeArgs instanceof Function) {
  //       const subscribeArgsData = deployData[item.data.name];
  //       const subscribeArgs = await item.subscribeArgs(subscribeArgsData);
  //       await setSubscribeArgs(envName, {
  //         name: item.data.name,
  //         subscribeArgs,
  //       });
  //     } else {
  //       throw new Error(`Missing deploy for ${item.data.name}`);
  //     }
  //   }
  // }

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
  [actionName: string]: ActionData;
}

export async function getDeployData(): Promise<DeployData> {
  console.log("in getDeployData");
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/deploy/data`,
  });

  const data = <DeployData>await response.json();

  for (const actionData of Object.values(data)) {
    const { auths, secrets } = actionData;

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
  }

  return data;
}
