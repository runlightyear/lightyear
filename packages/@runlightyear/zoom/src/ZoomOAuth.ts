import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface ZoomOAuthProps extends OAuthConnectorProps {}

/**
 * @beta
 */
export class ZoomOAuth extends OAuthConnector {
  constructor(props: ZoomOAuthProps) {
    super(props);
  }

  getAuthRequestUrlBase(): string {
    return "https://zoom.us/oauth/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    return {
      ...super.getAuthRequestUrlParams(),
      response_type: "code",
    };
  }
  getAccessTokenUrl(): string {
    return "https://zoom.us/oauth/token";
  }
}
