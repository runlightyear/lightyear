import { BaseConnector, BaseConnectorOptions } from "./BaseConnector";
import { AuthData } from "../base/auth";

/**
 * AuthConnectorOptions
 *
 * Some more text
 */
export interface AuthConnectorOptions extends BaseConnectorOptions {
  /**
   * Name of the auth to use
   */
  auth: AuthData;
}

/**
 * Docs for AuthConnector
 *
 * @public
 */
export class AuthConnector extends BaseConnector {
  _auth: AuthData;

  constructor({ auth, ...rest }: AuthConnectorOptions) {
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
