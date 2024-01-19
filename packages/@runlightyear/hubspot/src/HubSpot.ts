import { RestConnector, RestConnectorProps } from "@runlightyear/lightyear";
import { HubspotOAuth } from "./HubSpotOAuth";
import { HubspotAppWebhook } from "./HubSpotAppWebhook";

export interface HubSpotProps extends RestConnectorProps {}

export class HubSpot extends RestConnector {
  static OAuth = HubspotOAuth;
  static AppWebhook = HubspotAppWebhook;
  static variables = ["appId"];

  getBaseUrl(): string {
    return "https://api.hubapi.com";
  }
}
