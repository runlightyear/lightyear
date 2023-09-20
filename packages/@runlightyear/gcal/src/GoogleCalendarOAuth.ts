import { OAuthConnectorProps, OAuthConnector } from "@runlightyear/lightyear";

/**
 * @alpha
 */
export interface GoogleCalendarOAuthProps extends OAuthConnectorProps {}

/**
 * @alpha
 */
export class GoogleCalendarOAuth extends OAuthConnector {
  scopes = ["https://www.googleapis.com/auth/calendar"];

  constructor(props: GoogleCalendarOAuthProps) {
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
