import {
  OauthConnector,
  OauthConnectorProps,
} from "@runlightyear/lightyear";
import { GitHubScope } from "./types/GitHubScope";

export interface GitHubOauthProps extends OauthConnectorProps {}

/**
 * Connector to the GitHub Oauth2 API
 */
export class GitHubOauth extends OauthConnector {
  constructor(props: GitHubOauthProps) {
    super(props);
  }

  getAuthRequestUrlBase() {
    return "https://github.com/login/oauth/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    const scopes: Array<GitHubScope> = [
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
