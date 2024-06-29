import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";
import { HubSpotScope } from "./types/HubSpotScope";

/**
 * @alpha
 */
export interface HubSpotOAuthProps extends OAuthConnectorProps {
  scopes?: Array<HubSpotScope>;
}

/**
 * @alpha
 */
export class HubSpotOAuth extends OAuthConnector {
  scopes: Array<HubSpotScope>;

  constructor(props: HubSpotOAuthProps) {
    const {
      scopes = [
        "crm.objects.contacts.read",
        "crm.objects.contacts.write",
        "crm.objects.companies.write",
        "crm.objects.companies.read",
        "crm.objects.deals.read",
        "crm.objects.deals.write",
      ],
      ...rest
    } = props;
    super(rest);

    this.scopes = scopes;
  }

  getAuthRequestUrlBase(): string {
    return "https://app.hubspot.com/oauth/authorize";
  }
  getAuthRequestUrlParams() {
    return {
      ...super.getAuthRequestUrlParams(),
      scope: this.scopes.join(" "),
    };
  }
  getAccessTokenUrl(): string {
    return "https://api.hubapi.com/oauth/v1/token";
  }
}
