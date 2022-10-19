import { Response } from "node-fetch";
import {
  OauthConnector,
  OauthConnectorProps,
  AuthData,
} from "@runlightyear/lightyear";
import { SlackScope } from "./types/SlackScope";

/**
 * Connector to the Slack Oauth2 API
 */
export class SlackOauth extends OauthConnector {
  constructor(props: OauthConnectorProps) {
    super(props);
  }

  getAuthRequestUrlBase() {
    return "https://slack.com/oauth/v2/authorize";
  }

  getAuthRequestUrlParams() {
    const scopes: SlackScope[] = ["chat:write"];

    return {
      ...super.getAuthRequestUrlParams(),
      scopes: scopes.join(","),
    };
  }

  getAccessTokenUrl() {
    return "https://slack.com/api/oauth.v2.access";
  }

  processRequestAccessTokenResponse({
    response,
    text,
  }: {
    response: Response;
    text: string;
  }): AuthData {
    const responseData = JSON.parse(text);

    console.log("responseData", responseData);
    if (!responseData.ok) {
      throw new Error(
        `Slack access token request failed: ${responseData.error}`
      );
    }

    return super.processRequestAccessTokenResponse({
      response,
      text,
    });
  }
}
