import { OAuthConnectorProps, OAuthConnector } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface NotionOAuthProps extends OAuthConnectorProps {}

/**
 * @beta
 */
export class NotionOAuth extends OAuthConnector {
  constructor(props: NotionOAuthProps) {
    super(props);
  }

  getAuthRequestUrlBase(): string {
    return "https://api.notion.com/v1/oauth/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    return {
      ...super.getAuthRequestUrlParams(),
      response_type: "code",
      owner: "user",
    };
  }

  getAccessTokenUrl(): string {
    return "https://api.notion.com/v1/oauth/token";
  }

  getRequestAccessTokenHeaders(): { [p: string]: string } {
    const { clientId, clientSecret } = this.oauthConfigData;
    const credential = `${clientId}:${clientSecret}`;
    const encodedCredential = Buffer.from(credential, "binary").toString(
      "base64"
    );

    return {
      ...super.getRequestAccessTokenHeaders(),
      Authorization: `Basic ${encodedCredential}`,
    };
  }
}
