import { AuthType, BaseConnector, BaseConnectorProps } from "./BaseConnector";
import { AuthData, getAuthData } from "../base/auth";
import { dayjsUtc } from "../util/dayjsUtc";

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
        managedUser: null,
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

  async refreshAuthData() {
    this._auth = await getAuthData({
      appName: this._auth.appName ?? undefined,
      customAppName: this._auth.customAppName ?? undefined,
      authName: this._auth.authName,
    });
    console.info(
      "Refreshed auth data for",
      this._auth.appName || this._auth.customAppName,
      this._auth.authName
    );
  }

  async refreshAuthDataIfNecessary() {
    if (
      this._auth.expiresAt &&
      dayjsUtc(this._auth.expiresAt).diff(dayjsUtc(), "minutes") < 5
    ) {
      await this.refreshAuthData();
    }
  }
}
