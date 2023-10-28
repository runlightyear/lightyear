import {
  OAuthConnector,
  OAuthConnectorProps,
  AuthData,
} from "@runlightyear/lightyear";
import { SlackScope } from "./types/SlackScope";

export interface SlackOAuthProps extends OAuthConnectorProps {
  scopes?: Array<SlackScope>;
}

/**
 * Connector to the Slack OAuth2 API
 */
export class SlackOAuth extends OAuthConnector {
  scopes: Array<SlackScope>;

  constructor(props: SlackOAuthProps) {
    const {
      scopes = [
        "channels:history",
        "channels:join",
        "channels:manage",
        "channels:read",
        "chat:write",
        "chat:write.customize",
        "chat:write.public",
        "files:write",
        "groups:history",
        "im:history",
        "im:read",
        "im:write",
        "mpim:history",
        "mpim:read",
        "mpim:write",
        "team:read",
        "users.profile:read",
        "users:read",
        "users:read.email",
        "workflow.steps:execute",
      ],
      ...rest
    } = props;
    super(rest);

    this.scopes = scopes;
  }

  getAuthRequestUrlBase() {
    return "https://slack.com/oauth/v2/authorize";
  }

  getAuthRequestUrlParams() {
    return {
      ...super.getAuthRequestUrlParams(),
      scope: this.scopes.join(","),
    };
  }

  getAccessTokenUrl() {
    return "https://slack.com/api/oauth.v2.access";
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
    const responseData = JSON.parse(text);

    if (!responseData.ok) {
      throw new Error(
        `Slack access token request failed: ${responseData.error}`
      );
    }

    return super.processRequestAccessTokenResponse({
      status,
      statusText,
      headers,
      text,
    });
  }
}
