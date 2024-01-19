import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";

export interface IntercomOAuthProps extends OAuthConnectorProps {}

export class IntercomOAuth extends OAuthConnector {
  getAuthRequestUrlBase(): string {
    return "https://app.intercom.com/oauth";
  }

  getAccessTokenUrl(): string {
    return "https://api.intercom.io/auth/eagle/token";
  }
}
