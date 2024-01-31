import {
  AuthType,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import { HubspotOAuth } from "./HubSpotOAuth";
import { HubspotAppWebhook } from "./HubSpotAppWebhook";

/**
 * @alpha
 */
export interface HubSpotProps extends RestConnectorProps {}

/**
 * @alpha
 */
export class HubSpot extends RestConnector {
  static authType: AuthType = "OAUTH2";
  static OAuth = HubspotOAuth;
  static AppWebhook = HubspotAppWebhook;
  static variables = ["appId"];

  getBaseUrl(): string {
    return "https://api.hubapi.com";
  }
}
