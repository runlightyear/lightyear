import {
  AuthType,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import { HubSpotOAuth } from "./HubSpotOAuth";
import { HubSpotAppWebhook } from "./HubSpotAppWebhook";
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
  static OAuth = HubSpotOAuth;
  static AppWebhook = HubSpotAppWebhook;
  static variables = ["appId"];
  static Synchronizer = HubSpotSynchronizer;

  getBaseUrl(): string {
    return "https://api.hubapi.com";
  }
}
