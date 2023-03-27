import {
  GraphQLConnector,
  AuthConnectorProps,
  GraphQLConnectorQueryProps,
} from "@runlightyear/lightyear";
import { createIssue, CreateIssueProps } from "./issues/createIssue";
import { listTeams } from "./teams/listTeams";
import { createComment, CreateCommentProps } from "./comments/createComment";
import { listIssues, ListIssuesProps } from "./issues/listIssues";

/**
 * @beta
 */
export interface LinearProps extends AuthConnectorProps {}

/**
 * @beta
 *
 * Connector to the Linear API
 *
 * @example Import
 * ```typescript
 * import { Linear } from "@runlightyear/linear"
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "linearExample",
 *   title: "Linear Example"
 *   apps: ["linear"],
 *   run: async ({ auths }) => {
 *     const linear = new Linear({ auth: auths.linear });
 *   }
 * }
 * ```
 *
 * @example Crate an issue
 * ```typescript
 * await linear.createIssue({ teamId: "<team id>", title: "New Issue" });
 * ```
 */
export class Linear extends GraphQLConnector {
  constructor(props: LinearProps) {
    super({ ...props, baseUrl: "https://api.linear.app/graphql" });
  }

  async execute(props: GraphQLConnectorQueryProps) {
    const response = await super.execute(props);

    if (response.data.errors) {
      console.error(
        "Linear error(s)",
        JSON.stringify(response.data.errors, null, 2)
      );
      throw new Error("Errors in linear response");
    }

    return response;
  }

  async listTeams() {
    return listTeams(this)();
  }

  async listIssues(props?: ListIssuesProps) {
    return listIssues(this)(props);
  }

  async createIssue(props: CreateIssueProps) {
    return createIssue(this)(props);
  }

  async createComment(props: CreateCommentProps) {
    return createComment(this)(props);
  }
}
