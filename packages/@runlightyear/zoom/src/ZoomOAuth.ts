import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";

/**
 * @alpha
 */
export interface ZoomOAuthProps extends OAuthConnectorProps {}

/**
 * @alpha
 */
export class ZoomOAuth extends OAuthConnector {
  getAuthRequestUrlBase(): string {
    return "https://zoom.us/oauth/authorize";
  }

  getAccessTokenUrl(): string {
    return "https://zoom.us/oauth/token";
  }
}
