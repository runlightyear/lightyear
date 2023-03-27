import { OAuthConnector, OAuthConnectorProps } from "@runlightyear/lightyear";
import { LinearScope } from "./types/LinearScope";

/**
 * @beta
 */
export interface LinearOAuthProps extends OAuthConnectorProps {
  /**
   * List of scopes
   */
  scope?: LinearScope[];
  /**
   * The consent screen is displayed every time, even if all scopes were previously granted. This can be useful if you want to give users the opportunity to connect multiple workspaces.
   */
  prompt?: "consent";
  /**
   * Define how the OAuth application should create issues, comments and other changes:
   */
  actor?: /**
   * Resources are created as the user who authorized the application. This option should be used if you want each user to do their own authentication
   */
  | "user"
    /**
     * Resources are created as the application. This option should be used if you have have only one user (e.g. admin) authorizing the application. Can be used together with createAsUser property when creating issues and comments.
     */
    | "application";
}

/**
 * @beta
 */
export class LinearOAuth extends OAuthConnector {
  scope: LinearScope[];
  prompt: "consent" | undefined;
  actor: "user" | "application";

  constructor(props: LinearOAuthProps) {
    const {
      scope = ["read", "issues:create", "comments:create"],
      prompt,
      actor = "user",
      ...rest
    } = props;

    super(rest);

    this.scope = scope;
    this.prompt = prompt;
    this.actor = actor;
  }

  getAuthRequestUrlBase() {
    return "https://linear.app/oauth/authorize";
  }

  getAuthRequestUrlParams() {
    const result: Record<string, string> = {
      ...super.getAuthRequestUrlParams(),
      response_type: "code",
      scope: this.scope.join(","),
      actor: this.actor,
    };

    if (this.prompt) {
      result["prompt"] = this.prompt;
    }

    return result;
  }

  getAccessTokenUrl(): string {
    return "https://api.linear.app/oauth/token";
  }
}
