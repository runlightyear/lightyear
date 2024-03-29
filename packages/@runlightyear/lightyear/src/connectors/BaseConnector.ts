/* eslint-disable */

import { OAuthConnector } from "./OAuthConnector";
import { VariableDef } from "../base/variable";
import { SecretDef } from "../base/secret";
import { AppWebhookConnector } from "./AppWebhookConnector";

export type AuthType = "BASIC" | "APIKEY" | "OAUTH2";

/**
 * @public
 */
export interface BaseConnectorProps {}

/**
 * @public
 *
 * The Base for all connectors.
 */
export abstract class BaseConnector {
  static authType: AuthType;
  static OAuth: typeof OAuthConnector | null = null;
  static AppWebhook: typeof AppWebhookConnector | null = null;
  static variables: Array<VariableDef> = [];
  static secrets: Array<SecretDef> = [];

  constructor(props: BaseConnectorProps) {}
}
