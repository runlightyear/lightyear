import { AuthType, BaseConnector, BaseConnectorProps } from "./BaseConnector";
import { AuthData } from "../base/auth";

/**
 * @public
 */
export interface AuthConnectorProps extends BaseConnectorProps {
  /**
   * Name of the auth to use
   */
  auth: AuthData | undefined;
}

/**
 * @public
 *
 * Docs for AuthConnector
 */
export abstract class AuthConnector extends BaseConnector {
  _auth: AuthData;

  constructor(props: AuthConnectorProps) {
    const { auth, ...rest } = props;

    super(rest);

    if (auth) {
      this._auth = auth;
    } else {
      this._auth = {
        appName: null,
        customAppName: null,
        authName: "null",
        username: null,
        password: null,
        apiKey: null,
        tokenType: null,
        state: null,
        codeVerifier: null,
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        refreshedAt: null,
        extraData: null,
        customAppData: undefined,
      };
    }
  }

  getAuthData() {
    return this._auth;
  }
}
