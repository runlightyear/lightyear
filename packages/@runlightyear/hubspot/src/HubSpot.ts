import {
  AuthType,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import { HubspotOAuth } from "./HubSpotOAuth";
import { HubspotAppWebhook } from "./HubSpotAppWebhook";
import { HubSpotSynchronizer } from "./synchronizers/HubSpotSynchronizer";

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
  static Synchronizer = HubSpotSynchronizer;

  getBaseUrl(): string {
    return "https://api.hubapi.com";
  }
}
