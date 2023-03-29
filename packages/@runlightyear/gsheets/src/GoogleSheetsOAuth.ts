import { OAuthConnectorProps, OAuthConnector } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface GoogleSheetsOAuthProps extends OAuthConnectorProps {}

/**
 * @beta
 */
export class GoogleSheetsOAuth extends OAuthConnector {
  scopes = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ];

  constructor(props: GoogleSheetsOAuthProps) {
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
      access_type: "offline",
    };
  }

  getAccessTokenUrl(): string {
    return "https://oauth2.googleapis.com/token";
  }
}
