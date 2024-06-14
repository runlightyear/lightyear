/* eslint-disable */

import { OAuthConnector } from "./OAuthConnector";
import { VariableDef } from "../base/variable";
import { SecretDef } from "../base/secret";
import { AppWebhookConnector } from "./AppWebhookConnector";
import { CollectionSynchronizer } from "../synchronizers/CollectionSynchronizer";

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
  static Synchronizer: typeof CollectionSynchronizer | null = null;

  constructor(props: BaseConnectorProps) {}

  getSynchronizerClass() {
    return BaseConnector.Synchronizer;
  }
}
