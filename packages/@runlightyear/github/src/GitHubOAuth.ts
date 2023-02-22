import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";
import { GitHubScope } from "./types/GitHubScope";

export interface GitHubOAuthProps extends OAuthConnectorProps {}

/**
 * Connector to the GitHub OAuth2 API
 */
export class GitHubOAuth extends OAuthConnector {
  constructor(props: GitHubOAuthProps) {
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
