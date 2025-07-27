import { HttpProxyRequestProps, HttpProxyResponse, httpRequest } from "../http";

/**
 * @public
 */
export interface OAuthConnectorProps {
  appName?: string;
  customAppName?: string;
  oauthConfigData: OAuthConfigData;
  authData?: AuthData;
  inDevelopment?: boolean;
  proxied?: boolean;
  baseUrls?: OAuthConnectorBaseUrls;
}

/**
 * @public
 */
export interface OAuthConfigData {
  clientId: string | null;
  clientSecret: string | null;
  authRequestUrl?: string | null;
}

/**
 * @public
 */
export interface OAuthConnectorBaseUrls {
  authRequestUrl?: string;
  accessTokenUrl?: string;
  refreshTokenUrl?: string;
}

/**
 * @public
 */
export interface AuthData {
  appName?: string;
  customAppName?: string;
  managedUser?: string;
  authName?: string;
  tokenType?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  refreshedAt?: string;
  apiKey?: string | null;
  username?: string | null;
  password?: string | null;
  state?: string;
}

export interface OAuthConnectorRequestAccessTokenHeaders {
  [name: string]: string;
}

export interface OAuthConnectorProcessRequestAccessTokenProps {
  status: number;
  statusText: string;
  headers: OAuthConnectorRequestAccessTokenHeaders;
  text: string;
}

export interface OAuthConnectorProcessRefreshAccessTokenProps
  extends OAuthConnectorProcessRequestAccessTokenProps {}

/**
 * @public
 *
 * OAuth2 Connector for SDK
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
  baseUrls?: OAuthConnectorBaseUrls;

  constructor(props: OAuthConnectorProps) {
    const {
      oauthConfigData,
      appName,
      customAppName,
      authData,
      inDevelopment = false,
      proxied = true,
      baseUrls,
    } = props;

    this.oauthConfigData = oauthConfigData;
    this.baseUrls = baseUrls;

    const { clientId, clientSecret } = this.oauthConfigData;

    if (appName) {
      if (!clientId) throw new Error("Client ID not set");
      if (!clientSecret) throw new Error("Client secret not set");
    }

    if (!clientId || !clientSecret) {
      console.error(
        `Custom app ${customAppName} is missing client id and/or client secret. Configure at https://app.runlightyear.com/envs/<envName>/custom-apps/${customAppName}`
      );
      throw new Error("Custom app client id and/or client secret not set");
    }

    this.appName = appName;
    this.customAppName = customAppName;
    this.authData = authData;
    this.inDevelopment = inDevelopment;
    this.proxied = proxied;
  }

  /**
   * Get the base URL for auth request. Can be overridden by baseUrls.authRequestUrl
   */
  abstract getAuthRequestUrlBase(): string;

  /**
   * Get the final auth request URL base, preferring configured baseUrls
   */
  private getConfiguredAuthRequestUrlBase(): string {
    return this.baseUrls?.authRequestUrl || this.getAuthRequestUrlBase();
  }

  getAuthRequestUrlParams(): Record<string, string> {
    if (!this.authData) throw new Error("Missing authData");

    const { clientId } = this.oauthConfigData;
    if (!clientId) throw new Error("Client ID not set");

    const { state } = this.authData;
    if (!state) throw new Error("Missing state");

    return {
      response_type: "code",
      client_id: clientId,
      redirect_uri: this.getRedirectUri(),
      state,
    };
  }

  getAuthRequestUrl(): string {
    const base = this.getConfiguredAuthRequestUrlBase();
    if (!base) throw new Error("Missing authRequestUrlBase");

    console.debug("Base URL:", base);

    const params = this.getAuthRequestUrlParams();
    console.debug("Params", params);

    const url = new URL(`${base}?${new URLSearchParams(params)}`);
    console.debug("Auth request URL:", url.href);

    console.info("Generated url");

    return url.href;
  }

  /**
   * Get the url of the access token endpoint.
   */
  abstract getAccessTokenUrl(): string;

  /**
   * Get the final access token URL, preferring configured baseUrls
   */
  private getConfiguredAccessTokenUrl(): string {
    return this.baseUrls?.accessTokenUrl || this.getAccessTokenUrl();
  }

  /**
   * Get the url of the refresh token endpoint
   *
   * By default, returns the same url as the access token endpoint
   */
  getRefreshTokenUrl(): string {
    return this.baseUrls?.refreshTokenUrl || this.getConfiguredAccessTokenUrl();
  }

  getRedirectUri(): string {
    console.debug("process.env.NODE_ENV", process.env.NODE_ENV);
    const suffix =
      this.inDevelopment || process.env.NODE_ENV === "development"
        ? "-local"
        : "";

    if (this.appName) {
      return `https://app.runlightyear.com/api/v1/oauth2/${this.appName}/redirect${suffix}`;
    }

    return `https://app.runlightyear.com/api/v1/custom-oauth2/${this.customAppName}/redirect${suffix}`;
  }

  getRequestAccessTokenHeaders(): OAuthConnectorRequestAccessTokenHeaders {
    return {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  getRequestAccessTokenParams(code: string): Record<string, string> {
    if (!code) throw new Error("Missing code");
    if (!this.authData) throw new Error("Missing authData");

    const { state } = this.authData;
    if (!state) throw new Error("Missing state");

    const { clientId, clientSecret } = this.oauthConfigData;
    if (!clientId) throw new Error("Missing clientId");
    if (!clientSecret) throw new Error("Missing clientSecret");

    return {
      grant_type: "authorization_code",
      code,
      state,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: this.getRedirectUri(),
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

  getRequestAccessTokenRedactKeys() {
    return ["access_token", "refresh_token"];
  }

  processRequestAccessTokenResponse(
    props: OAuthConnectorProcessRequestAccessTokenProps
  ): AuthData {
    const { status, statusText, headers, text } = props;

    if (status >= 300) {
      console.error(text);
      throw new Error(`Request access token failed: ${status} ${statusText}`);
    }

    console.debug("status", status);
    const data = JSON.parse(text);

    const { appName, customAppName, managedUser, authName } = data;

    const tokenType = data["token_type"];
    const accessToken = data["access_token"];
    const refreshToken = data["refresh_token"];

    const expiresIn = data["expires_in"];
    let expiresAt: string | undefined;
    if (expiresIn) {
      const expiryDate = new Date(Date.now() + parseInt(expiresIn) * 1000);
      expiresAt = expiryDate.toISOString();
    }

    return {
      appName,
      customAppName,
      managedUser,
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
    if (!clientId) throw new Error("Missing clientId");
    if (!clientSecret) throw new Error("Missing clientSecret");

    if (!this.authData) throw new Error("Missing authData");
    const { refreshToken } = this.authData;
    if (!refreshToken) throw new Error("Missing refreshToken");

    const params = new URLSearchParams();
    params.append("refresh_token", refreshToken);
    params.append("grant_type", "refresh_token");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    return params.toString();
  }

  getRefreshAccessTokenRedactKeys() {
    return this.getRequestAccessTokenRedactKeys();
  }

  processRefreshAccessTokenResponse(
    props: OAuthConnectorProcessRefreshAccessTokenProps
  ): AuthData {
    const { status, statusText, headers, text } = props;

    const authData = this.processRequestAccessTokenResponse({
      status,
      statusText,
      headers,
      text,
    });
    const refreshedAt = new Date().toISOString();
    return { ...authData, refreshedAt };
  }

  buildUrl(url: string, params?: Record<string, any>) {
    if (!params) return url;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryStr = searchParams.toString();
    return queryStr ? `${url}?${queryStr}` : url;
  }

  /**
   * Make a proxied http request
   */
  async request(props: HttpProxyRequestProps): Promise<HttpProxyResponse> {
    console.debug("in OAuthConnector.request");
    const { method, url, params, headers, data, body, redactKeys } = props;

    const proxyProps = {
      method,
      url: this.buildUrl(url, params),
      headers: {
        ...headers,
      },
      body: data ? JSON.stringify(data) : body,
      redactKeys,
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
    return await this.request({ ...props, method: "POST" });
  }

  async requestAccessToken(code: string): Promise<AuthData> {
    const url = this.getConfiguredAccessTokenUrl();
    const headers = this.getRequestAccessTokenHeaders();
    const body = this.getRequestAccessTokenBody(code);
    const redactKeys = this.getRequestAccessTokenRedactKeys();

    const response = await this.post({
      url,
      headers,
      body,
      redactKeys,
    });

    console.debug("Response:", response);

    const newAuthData = this.processRequestAccessTokenResponse({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      text: JSON.stringify(response.data),
    });

    return newAuthData;
  }

  async refreshAccessToken(): Promise<AuthData> {
    const url = this.getRefreshTokenUrl();
    const headers = this.getRefreshAccessTokenHeaders();
    const body = this.getRefreshAccessTokenBody();
    const redactKeys = this.getRefreshAccessTokenRedactKeys();

    const response = await this.post({ url, headers, body, redactKeys });

    console.debug("Response:", response);

    const newAuthData = this.processRefreshAccessTokenResponse({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      text: JSON.stringify(response.data),
    });

    return newAuthData;
  }
}
