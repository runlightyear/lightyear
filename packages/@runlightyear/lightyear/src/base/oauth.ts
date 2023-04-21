import {
  OAuthConnector,
  OAuthConnectorProps,
} from "../connectors/OAuthConnector";
import { getEnvName } from "../util/getEnvName";
import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { prefixedRedactedConsole } from "../logging";
import { ActionData } from "./action";

/**
 * @internal
 */
type OAuthIndex = {
  [name: string]: (props: OAuthConnectorProps) => OAuthConnector;
};

/**
 * @internal
 */
export const oAuthIndex: OAuthIndex = {};

export interface DefineOAuthProps {
  customApp: string;
  connector: (props: OAuthConnectorProps) => OAuthConnector;
}

export function defineOAuth(props: DefineOAuthProps) {
  const { customApp, connector } = props;

  oAuthIndex[customApp] = connector;
}

// export interface GetCustomAppData {
//   customAppName: string;
//   authName: string;
// }

// export async function getCustomAppData(
//   props: GetCustomAppData
// ): Promise<ActionData> {
//   const { customAppName, authName } = props;
//
//   const envName = getEnvName();
//   invariant(envName, "Missing ENV_NAME");
//
//   const response = await baseRequest({
//     method: "GET",
//     uri: `/api/v1/envs/${envName}/custom-apps/${customAppName}/auths/${authName}/data`,
//   });
//
//   const data = <ActionData>await response.json();
//
//   const { auths, variables, secrets, webhook } = data;
//
//   if (auths) {
//     for (const auth of Object.values(auths)) {
//       const { accessToken, refreshToken, apiKey } = auth;
//
//       accessToken && prefixedRedactedConsole.addSecrets([accessToken]);
//       refreshToken && prefixedRedactedConsole.addSecrets([refreshToken]);
//       apiKey && prefixedRedactedConsole.addSecrets([apiKey]);
//     }
//   }
//
//   if (secrets) {
//     prefixedRedactedConsole.addSecrets(Object.values(secrets));
//   }
//
//   return {
//     auths,
//     variables,
//     secrets,
//     webhook,
//   };
// }
