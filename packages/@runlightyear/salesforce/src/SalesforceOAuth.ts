import {
  AuthData,
  OAuthConnector,
  OAuthConnectorProps,
} from "@runlightyear/lightyear";
import dayjsUtc from "@runlightyear/lightyear/src/util/dayjsUtc";

/**
 * @beta
 */
export interface SalesforceOAuthProps extends OAuthConnectorProps {}

/**
 * @beta
 */
export class SalesforceOAuth extends OAuthConnector {
  scopes = ["full", "refresh_token"];

  constructor(props: SalesforceOAuthProps) {
    super(props);
  }

  getAuthRequestUrlBase(): string {
    return "https://login.salesforce.com/services/oauth2/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    return {
      ...super.getAuthRequestUrlParams(),
      response_type: "code",
      scope: this.scopes.join(" "),
    };
  }

  getAccessTokenUrl(): string {
    return "https://login.salesforce.com/services/oauth2/token";
  }

  processRequestAccessTokenResponse({
    status,
    statusText,
    headers,
    text,
  }: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    text: string;
  }): AuthData {
    return {
      ...super.processRequestAccessTokenResponse({
        status,
        statusText,
        headers,
        text,
      }),
      expiresAt: dayjsUtc().add(1, "hour").format(),
    };
  }
}
