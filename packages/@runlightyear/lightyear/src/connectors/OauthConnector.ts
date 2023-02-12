import invariant from "tiny-invariant";
import { AuthData } from "../base/auth";
import dayjsUtc from "../util/dayjsUtc";
import inDevelopment from "../util/inDevelopment";

export interface OauthConnectorProps {
  appName?: string;
  customAppName?: string;
  oauthConfigData: OauthConfigData;
  authData: AuthData;
}

export interface OauthConfigData {
  clientId: string | null;
  clientSecret: string | null;
  authRequestUrl: string | null;
}

/**
 * Oauth2 token management
 */
export abstract class OauthConnector {
  appName?: string;
  customAppName?: string;
  oauthConfigData: OauthConfigData;
  authData?: AuthData;

  protected constructor(props: OauthConnectorProps) {
    const { oauthConfigData, appName, customAppName, authData } = props;
    this.oauthConfigData = oauthConfigData;

    const { clientId, clientSecret, authRequestUrl } = this.oauthConfigData;
    invariant(clientId, "Missing clientId");
    invariant(clientSecret, "Missing clientSecret");
    invariant(authRequestUrl, "Missing authRequestUrl");

    this.appName = appName;
    this.customAppName = customAppName;
    this.authData = authData;
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
    const suffix = inDevelopment() ? "-local" : "";

    if (this.appName) {
      return `https://app.runlightyear.com/api/v1/oauth2/${this.appName}/redirect${suffix}`;
    }

    return `https://app.runlightyear.com/api/v1/oauth2-custom/${this.customAppName}/redirect${suffix}`;
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

    const tokenType = data["token_type"];
    const accessToken = data["access_token"];
    const refreshToken = data["refresh_token"];

    const expiresIn = data["expires_in"];
    let expiresAt: string | undefined;
    if (expiresIn) {
      expiresAt = dayjsUtc().add(parseInt(expiresIn), "seconds").format();
    }

    return { tokenType, accessToken, refreshToken, expiresAt, apiKey: null };
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
}
