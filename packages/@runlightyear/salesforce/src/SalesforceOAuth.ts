import {
  AuthData,
  OAuthConnector,
  OAuthConnectorProps,
} from "@runlightyear/lightyear";
import { dayjsUtc } from "@runlightyear/lightyear";

/**
 * @internal
 */
export interface SalesforceOAuthProps extends OAuthConnectorProps {
  scopes?: Array<string>;
  prompt?: {
    login?: boolean;
    consent?: boolean;
    selectAccount?: boolean;
  };
}

/**
 * @internal
 */
export class SalesforceOAuth extends OAuthConnector {
  scopes: Array<string>;
  prompt?: {
    login?: boolean;
    consent?: boolean;
    selectAccount?: boolean;
  };

  constructor(props: SalesforceOAuthProps) {
    const { scopes = ["full", "refresh_token"], prompt, ...rest } = props;
    super(rest);

    this.scopes = scopes;
    this.prompt = prompt;
  }

  getAuthRequestUrlBase(): string {
    return "https://login.salesforce.com/services/oauth2/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    const prompts = [];
    if (this.prompt?.login) prompts.push("login");
    if (this.prompt?.consent) prompts.push("consent");
    if (this.prompt?.selectAccount) prompts.push("select_account");
    const promptsParam = prompts.length > 0 ? prompts.join(" ") : undefined;

    return {
      ...super.getAuthRequestUrlParams(),
      response_type: "code",
      scope: this.scopes.join(" "),
      ...(promptsParam && { prompt: promptsParam }),
    };
  }

  getAccessTokenUrl(): string {
    return "https://login.salesforce.com/services/oauth2/token";
  }

  protected extractExtraData(data: Record<string, any>): Record<string, any> | undefined {
    return {
      instanceUrl: data["instance_url"],
    };
  }

  protected calculateExpiresAt(data: Record<string, any>): string | undefined {
    return dayjsUtc().add(1, "hour").format();
  }

  processRefreshAccessTokenResponse(props: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    text: string;
  }): AuthData {
    if (!this.authData) throw new Error("No auth data");

    return {
      ...super.processRefreshAccessTokenResponse(props),
      refreshToken: this.authData.refreshToken,
      expiresAt: dayjsUtc().add(1, "hour").format(),
    };
  }
}
