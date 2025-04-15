import {
  AuthType,
  ModelConnector,
  SyncConnector,
  SyncConnectorProps,
} from "@runlightyear/lightyear";
import { HubSpotOAuth } from "./HubSpotOAuth";
import { HubSpotAppWebhook } from "./HubSpotAppWebhook";
import { HubSpotAccount } from "./models/HubSpotAccount";
import { HubSpotContact } from "./models/HubSpotContact";
/**
 * @alpha
 */
export interface HubSpotProps extends SyncConnectorProps {}

/**
 * @alpha
 */
export class HubSpot extends SyncConnector {
  static authType: AuthType = "OAUTH2";
  static OAuth = HubSpotOAuth;
  static AppWebhook = HubSpotAppWebhook;
  static variables = ["appId"];

  getBaseUrl(): string {
    return "https://api.hubapi.com";
  }

  getModels(): { [key: string]: ModelConnector } {
    const commonProps = {
      hubspot: this,
      connector: this,
      collectionName: this.collectionName,
    };

    return {
      account: new HubSpotAccount({
        ...commonProps,
        modelName: "account",
      }),
      contact: new HubSpotContact({
        ...commonProps,
        modelName: "contact",
      }),
    };
  }
}
