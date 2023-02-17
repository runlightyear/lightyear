import { BaseConnector, BaseConnectorProps } from "./BaseConnector";
import { AuthData } from "../base/auth";

/**
 * @public
 */
export interface AuthConnectorProps extends BaseConnectorProps {
  /**
   * Name of the auth to use
   */
  auth: AuthData;
}

/**
 * @public
 *
 * Docs for AuthConnector
 */
export class AuthConnector extends BaseConnector {
  _auth: AuthData;

  constructor(props: AuthConnectorProps) {
    const { auth, ...rest } = props;

    super(rest);
    this._auth = auth;
  }

  getAuthData() {
    console.debug("in AuthConnector.getAuthData");
    return this._auth;
  }

  async refreshToken() {
    console.debug("in AuthConnector.refreshToken");
    // return await refreshToken(this._auth);
  }
}
