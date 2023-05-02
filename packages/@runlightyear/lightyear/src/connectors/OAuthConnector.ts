import invariant from "tiny-invariant";
import { AuthData, getAuthData, updateAuthData } from "../base/auth";
import { dayjsUtc } from "../util/dayjsUtc";
import inDevelopment from "../util/inDevelopment";
import {
  HttpProxyRequestProps,
  HttpProxyResponse,
  httpRequest,
} from "../base/http";
import queryString from "query-string";

/**
 * @public
 */
export interface OAuthConnectorProps {
  appName?: string;
  customAppName?: string;
  oauthConfigData: OAuthConfigData;
  authData: AuthData;
  inDevelopment?: boolean;
  proxied?: boolean;
}

/**
 * @public
 */
export interface OAuthConfigData {
  clientId: string | null;
  clientSecret: string | null;
  authRequestUrl: string | null;
}

/**
 * @public
 *
 * OAuth2 Connector
 *
 * Creates the input to the 3 essential OAuth tasks:
 *
 * 1. Generates a url to request an access token
 * 2. Converts the oauth callback parameters into the https call to request an access token
 * 3. Provides the https params to refresh an access token
 */
export abstract class OAuthConnector {
  appName?: string;
  customAppName?: string;
  oauthConfigData: OAuthConfigData;
  authData?: AuthData;
  inDevelopment?: boolean;
  proxied?: boolean;

  constructor(props: OAuthConnectorProps) {
    const {
      oauthConfigData,
      appName,
      customAppName,
      authData,
      inDevelopment = false,
      proxied = true,
    } = props;
    this.oauthConfigData = oauthConfigData;

    const { clientId, clientSecret, authRequestUrl } = this.oauthConfigData;
    invariant(clientId, "Missing clientId");
    invariant(clientSecret, "Missing clientSecret");

    this.appName = appName;
    this.customAppName = customAppName;
    this.authData = authData;
    this.inDevelopment = inDevelopment;
    this.proxied = proxied;
  }

  abstract getAuthRequestUrlBase(): string;

  getAuthRequestUrlParams(): Record<string, string> {
    invariant(this.authData, "Missing authData");

    const { clientId } = this.oauthConfigData;
    invariant(clientId, "Client ID not set");

    const { state } = this.authData;
    invariant(state, "Missing state");

    return { client_id: clientId, state, redirect_uri: this.redirectUri() };
  }

  getAuthRequestUrl(): string {
    const base = this.getAuthRequestUrlBase();
    invariant(base, "Missing authRequestUrlBase");

    const params = this.getAuthRequestUrlParams();

    const url = new URL(`${base}?${new URLSearchParams(params)}`);

    return url.href;
  }

  abstract getAccessTokenUrl(): string;

  getRefreshTokenUrl(): string {
    return this.getAccessTokenUrl();
  }

  redirectUri(): string {
    const suffix = inDevelopment() || this.inDevelopment ? "-local" : "";

    if (this.appName) {
      return `https://app.runlightyear.com/api/v1/oauth2/${this.appName}/redirect${suffix}`;
    }

    return `https://app.runlightyear.com/api/v1/custom-oauth2/${this.customAppName}/redirect${suffix}`;
  }

  getRequestAccessTokenHeaders(): {
    [name: string]: string;
  } {
    return {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  getRequestAccessTokenParams(code: string): Record<string, string> {
    invariant(code, "Missing code");

    invariant(this.authData, "Missing authData");

    const { state } = this.authData;
    invariant(state, "Missing state");

    const { clientId, clientSecret } = this.oauthConfigData;

    invariant(clientId, "Missing clientId");
    invariant(clientSecret, "Missing clientSecret");

    return {
      grant_type: "authorization_code",
      code,
      state,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: this.redirectUri(),
    };
  }

  getRequestAccessTokenBody(code: string): string {
    const rawParams = this.getRequestAccessTokenParams(code);

    const params = new URLSearchParams();
    Object.entries(rawParams).forEach((nameValuePair) => {
      params.append(nameValuePair[0], nameValuePair[1]);
    });

    return params.toString();
  }

  processRequestAccessTokenResponse({
    status,
    statusText,
    headers,
    text,
  }: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    text: string;
  }): AuthData {
    if (status >= 300) {
      console.error(text);
      throw new Error(`Request access token failed: ${status} ${statusText}`);
    }

    console.debug("status", status);
    const data = JSON.parse(text);

    const { appName, customAppName, authName } = data;

    const tokenType = data["token_type"];
    const accessToken = data["access_token"];
    const refreshToken = data["refresh_token"];

    const expiresIn = data["expires_in"];
    let expiresAt: string | undefined;
    if (expiresIn) {
      expiresAt = dayjsUtc().add(parseInt(expiresIn), "seconds").format();
    }

    return {
      appName,
      customAppName,
      authName,
      tokenType,
      accessToken,
      refreshToken,
      expiresAt,
      apiKey: null,
      username: null,
      password: null,
    };
  }

  getRefreshAccessTokenHeaders() {
    return this.getRequestAccessTokenHeaders();
  }

  getRefreshAccessTokenBody(): string {
    const { clientId, clientSecret } = this.oauthConfigData;
    invariant(clientId, "Missing clientId");
    invariant(clientSecret, "Missing clientSecret");

    invariant(this.authData, "Missing authData");
    const { refreshToken } = this.authData;
    invariant(refreshToken, "Missing refreshToken");

    const params = new URLSearchParams();
    params.append("refresh_token", refreshToken);
    params.append("grant_type", "refresh_token");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    return params.toString();
  }

  processRefreshAccessTokenResponse({
    status,
    statusText,
    headers,
    text,
  }: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    text: string;
  }): AuthData {
    const authData = this.processRequestAccessTokenResponse({
      status,
      statusText,
      headers,
      text,
    });
    const refreshedAt = dayjsUtc().format();
    return { ...authData, refreshedAt };
  }

  buildUrl(url: string, params?: Record<string, any>) {
    const queryStr = params ? `?${queryString.stringify(params)}` : "";

    return url + queryStr;
  }

  /**
   * Make a proxied http request
   */
  async request(props: HttpProxyRequestProps): Promise<HttpProxyResponse> {
    console.debug("in RestConnector.request");
    const { method, url, params, headers, data, body } = props;

    const proxyProps = {
      method,
      url: this.buildUrl(url, params),
      headers: {
        ...headers,
      },
      body: data ? JSON.stringify(data) : body,
    };

    let response: HttpProxyResponse;

    if (this.proxied) {
      response = await httpRequest(proxyProps);
    } else {
      console.error("Only proxying supported for now...");
      throw new Error("Only proxying supported for now...");
    }

    return { ...response, data: response.data };
  }

  async post(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "post" });
  }

  async requestAccessToken(code: string) {
    const url = this.getAccessTokenUrl();
    const headers = this.getRequestAccessTokenHeaders();
    const body = this.getRequestAccessTokenBody(code);

    const response = await this.post({ url, headers, body });

    const newAuthData = await this.processRequestAccessTokenResponse({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      text: JSON.stringify(response.data),
    });

    const authName = this.appName || this.customAppName;
    invariant(authName, "Need an auth name");

    await updateAuthData({
      appName: this.appName,
      customAppName: this.customAppName,
      authName,
      authData: newAuthData,
    });
  }

  async refreshAccessToken() {
    const url = this.getRefreshTokenUrl();
    const headers = this.getRefreshAccessTokenHeaders();
    const body = this.getRefreshAccessTokenBody();

    const response = await this.post({ url, headers, body });

    const newAuthData = await this.processRefreshAccessTokenResponse({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      text: JSON.stringify(response.data),
    });

    const authName = this.appName || this.customAppName;
    invariant(authName, "Need an auth name");

    await updateAuthData({
      appName: this.appName,
      customAppName: this.customAppName,
      authName,
      authData: newAuthData,
    });
  }
}
