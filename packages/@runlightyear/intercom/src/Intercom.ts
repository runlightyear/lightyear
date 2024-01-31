import {
  AuthType,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import { IntercomOAuth } from "./IntercomOAuth";
import { IntercomAppWebhook } from "./IntercomAppWebhook";

/**
 * @alpha
 */
export interface IntercomProps extends RestConnectorProps {}

/**
 * @alpha
 */
export class Intercom extends RestConnector {
  static authType: AuthType = "OAUTH2";
  static OAuth = IntercomOAuth;
  static AppWebhook = IntercomAppWebhook;

  getBaseUrl(): string {
    return "https://api.intercom.io";
  }
}
