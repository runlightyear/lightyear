import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";
import { TypeformScope } from "./types/TypeformScope";

export interface TypeformOAuthProps extends OAuthConnectorProps {
  scopes?: Array<TypeformScope>;
}

export class TypeformOAuth extends OAuthConnector {
  scopes: TypeformScope[];

  constructor(props: TypeformOAuthProps) {
    const {
      scopes = [
        "accounts:read",
        "forms:read",
        "forms:write",
        "images:read",
        "images:write",
        "themes:read",
        "themes:write",
        "responses:read",
        "responses:write",
        "webhooks:read",
        "webhooks:write",
        "workspaces:read",
        "workspaces:write",
      ],
      ...rest
    } = props;
    super(rest);

    this.scopes = scopes;
  }

  getAuthRequestUrlBase() {
    return "https://api.typeform.com/oauth/authorize";
  }

  getAccessTokenUrl() {
    return "https://api.typeform.com/oauth/token";
  }

  getAuthRequestUrlParams(): Record<string, string> {
    return {
      ...super.getAuthRequestUrlParams(),
      scope: ["offline", ...this.scopes].join("+"),
    };
  }
}
