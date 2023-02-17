import {
  AuthConnectorProps,
  OauthConnector,
  OauthConnectorProps,
} from "@runlightyear/lightyear";
import { GithubScope } from "./types/GithubScope";

export interface GithubOauthProps extends OauthConnectorProps {}

/**
 * Connector to the Github Oauth2 API
 */
export class GithubOauth extends OauthConnector {
  constructor(props: GithubOauthProps) {
    super(props);
  }

  getAuthRequestUrlBase() {
    return "https://github.com/login/oauth/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    const scopes: Array<GithubScope> = [
      "public_repo",
      "repo",
      "notifications",
      "gist",
    ];

    return { ...super.getAuthRequestUrlParams(), scope: scopes.join(",") };
  }

  getAccessTokenUrl(): string {
    return "https://github.com/login/oauth/access_token";
  }
}
