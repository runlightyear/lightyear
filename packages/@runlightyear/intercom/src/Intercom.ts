import { RestConnector, RestConnectorProps } from "@runlightyear/lightyear";
import { IntercomOAuth } from "./IntercomOAuth";
import { IntercomAppWebhook } from "./IntercomAppWebhook";

export interface IntercomProps extends RestConnectorProps {}

export class Intercom extends RestConnector {
  static OAuth = IntercomOAuth;
  static AppWebhook = IntercomAppWebhook;

  getBaseUrl(): string {
    return "https://api.intercom.io";
  }
}
