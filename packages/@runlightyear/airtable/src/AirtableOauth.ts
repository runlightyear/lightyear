import {
  base64ToBase64Url,
  OauthConnector,
  OauthConnectorProps,
} from "@runlightyear/lightyear";
import { AirtableScope } from "./types/AirtableScope";
import crypto from "crypto";
import invariant from "tiny-invariant";

export interface AirtableOauthProps extends OauthConnectorProps {
  scopes?: AirtableScope[];
}

export class AirtableOauth extends OauthConnector {
  scopes: AirtableScope[];

  constructor(props: AirtableOauthProps) {
    const {
      scopes = [
        "data.records:read",
        "data.records:write",
        "data.recordComments:read",
        "data.recordComments:write",
        "schema.bases:read",
        "schema.bases:write",
        "webhook:manage",
      ],
      ...rest
    } = props;

    super(rest);

    this.scopes = scopes;
  }

  getAuthRequestUrlBase(): string {
    return "https://airtable.com/oauth2/v1/authorize";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    invariant(this.authData, "Missing authData");
    const { codeVerifier } = this.authData;
    invariant(codeVerifier, "Missing codeVerifier");

    const codeChallenge = base64ToBase64Url(
      crypto.createHash("sha256").update(codeVerifier).digest("base64")
    );

    console.debug("codeChallenge", codeChallenge);

    return {
      ...super.getAuthRequestUrlParams(),
      response_type: "code",
      scope: this.scopes.join(" "),
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    };
  }

  getAccessTokenUrl(): string {
    return "https://airtable.com/oauth2/v1/token";
  }

  getRequestAccessTokenHeaders(): { [p: string]: string } {
    const { clientId, clientSecret } = this.oauthConfigData;

    const credentials = `${clientId}:${clientSecret}`;
    const base64Credentials = Buffer.from(credentials).toString("base64");

    return {
      ...super.getRequestAccessTokenHeaders(),
      Authorization: `Basic ${base64Credentials}`,
    };
  }

  getRequestAccessTokenParams(code: string) {
    invariant(this.authData, "Missing authData");
    const { codeVerifier } = this.authData;
    invariant(codeVerifier, "Missing codeVerifier");

    return {
      ...super.getRequestAccessTokenParams(code),
      code_verifier: codeVerifier,
    };
  }
}
