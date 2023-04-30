import { OAuthConnectorProps, OAuthConnector } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface GmailOAuthProps extends OAuthConnectorProps {}

/**
 * @beta
 */
export class GmailOAuth extends OAuthConnector {
  scopes = [
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.modify",
  ];

  constructor(props: GmailOAuthProps) {
    super(props);
  }

  getAuthRequestUrlBase(): string {
    return "https://accounts.google.com/o/oauth2/v2/auth";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    return {
      ...super.getAuthRequestUrlParams(),
      response_type: "code",
      scope: this.scopes.join(" "),
      prompt: "consent",
      access_type: "offline",
    };
  }

  getAccessTokenUrl(): string {
    return "https://oauth2.googleapis.com/token";
  }
}
