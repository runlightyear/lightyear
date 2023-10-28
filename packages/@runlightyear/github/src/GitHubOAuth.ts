import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";
import { GitHubScope } from "./types/GitHubScope";

export interface GitHubOAuthProps extends OAuthConnectorProps {
  scopes?: Array<GitHubScope>;
}

/**
 * Connector to the GitHub OAuth2 API
 */
export class GitHubOAuth extends OAuthConnector {
  scopes: Array<GitHubScope>;

  constructor(props: GitHubOAuthProps) {
    const {
      scopes = ["public_repo", "repo", "notifications", "gist"],
      ...rest
    } = props;
    super(rest);

    this.scopes = scopes;
  }

  getAuthRequestUrlBase() {
    return "https://github.com/login/oauth/authorize";
  }

  getAuthRequestUrlParams() {
    return {
      ...super.getAuthRequestUrlParams(),
      scope: this.scopes.join(","),
      login: "your user",
    };
  }

  getAccessTokenUrl() {
    return "https://github.com/login/oauth/access_token";
  }
}
