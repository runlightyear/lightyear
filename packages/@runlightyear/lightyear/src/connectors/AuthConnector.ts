import { BaseConnector, BaseConnectorOptions } from "./BaseConnector";
import { AuthData, defineAuth } from "../base/auth";

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

  static defineAuth({
    name,
    app,
    customApp,
  }: {
    name: string;
    app?: string;
    customApp?: string;
  }) {
    return defineAuth({ name, app, customApp });
  }

  constructor({ auth, ...rest }: AuthConnectorOptions) {
    super(rest);
    this._auth = auth;
  }

  getAuthData() {
    console.log("in AuthConnector.getAuthData");
    return this._auth;
  }

  async refreshToken() {
    console.log("in AuthConnector.refreshToken");
    // return await refreshToken(this._auth);
  }
}
