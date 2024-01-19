import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";

/**
 * @alpha
 */
export interface IntercomOAuthProps extends OAuthConnectorProps {}

/**
 * @alpha
 */
export class IntercomOAuth extends OAuthConnector {
  getAuthRequestUrlBase(): string {
    return "https://app.intercom.com/oauth";
  }

  getAccessTokenUrl(): string {
    return "https://api.intercom.io/auth/eagle/token";
  }
}
