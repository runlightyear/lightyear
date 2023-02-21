import { Response } from "node-fetch";
import {
  OAuthConnector,
  OAuthConnectorProps,
  AuthData,
} from "@runlightyear/lightyear";
import { SlackScope } from "./types/SlackScope";

/**
 * Connector to the Slack OAuth2 API
 */
export class SlackOAuth extends OAuthConnector {
  constructor(props: OAuthConnectorProps) {
    super(props);
  }

  getAuthRequestUrlBase() {
    return "https://slack.com/oauth/v2/authorize";
  }

  getAuthRequestUrlParams() {
    const scopes: SlackScope[] = [
      "channels:manage",
      "channels:read",
      "channels:join",
      "chat:write",
      "chat:write.customize",
      "chat:write.public",
      "files:write",
      "im:write",
      "mpim:write",
      "team:read",
      "users.profile:read",
      "users:read",
      "users:read.email",
      "workflow.steps:execute",
    ];

    return {
      ...super.getAuthRequestUrlParams(),
      scope: scopes.join(","),
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
