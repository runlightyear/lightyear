import { OauthConnector, OauthConnectorProps } from "@runlightyear/lightyear";

/**
 * Connector to the Github Oauth2 API
 */
export class GithubOauth extends OauthConnector {
  constructor(props: OauthConnectorProps) {
    super(props);
  }

  getAuthRequestUrlBase() {
    return "https://github.com/login/oauth/authorize";
  }

  getAccessTokenUrl(): string {
    return "https://github.com/login/oauth/access_token";
  }
}
