import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface SalesforceOAuthProps extends OAuthConnectorProps {}

/**
 * @beta
 */
export class SalesforceOAuth extends OAuthConnector {
  constructor(props: SalesforceOAuthProps) {
    super(props);
  }

  getAuthRequestUrlBase(): string {
    return "https://login.salesforce.com/services/oauth2/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    return { ...super.getAuthRequestUrlParams(), response_type: "code" };
  }

  getAccessTokenUrl(): string {
    return "https://login.salesforce.com/services/oauth2/token";
  }
}
