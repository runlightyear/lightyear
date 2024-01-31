import {
  AuthType,
  GraphQLConnector,
  GraphQLConnectorQueryProps,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import { createIssue, CreateIssueProps } from "./issues/createIssue";
import { listTeams, ListTeamsProps } from "./teams/listTeams";
import { createComment, CreateCommentProps } from "./comments/createComment";
import { listIssues, ListIssuesProps } from "./issues/listIssues";
import { getTeam, GetTeamProps } from "./teams/getTeam";
import { getIssue, GetIssueProps } from "./issues/getIssue";
import { getComment, GetCommentProps } from "./comments/getComment";
import { listComments, ListCommentsProps } from "./comments/listComments";
import { listUsers, ListUsersProps } from "./users/listUsers";
import { getUser, GetUserProps } from "./users/getUser";
import { updateIssue, UpdateIssueProps } from "./issues/updateIssue";
import {
  listWorkflowStates,
  ListWorkflowStatesProps,
} from "./workflowStates/listWorkflowStates";
import {
  findIssueByIdentifier,
  FindIssueByIdentifierProps,
} from "./helpers/findIssueByIdentifier";
import {
  findWorkflowStateByName,
  FindWorkflowStateByNameProps,
} from "./helpers/findWorkflowStateByName";
import { LinearOAuth } from "./LinearOAuth";

/**
 * @beta
 */
export interface LinearProps extends RestConnectorProps {}

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
 * @example Create an issue
 * ```typescript
 * await linear.createIssue({ teamId: "<team id>", title: "New Issue" });
 * ```
 */
export class Linear extends GraphQLConnector {
  static authType: AuthType = "OAUTH2";
  static OAuth = LinearOAuth;

  constructor(props: LinearProps) {
    super(props);
  }

  getBaseUrl(): string {
    return "https://api.linear.app/graphql";
  }

  /**
   * @group GraphQL
   *
   * @param props
   */
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

  /**
   * List teams
   *
   * All teams whose issues can be accessed by the user. This might be different from administrableTeams, which also includes teams whose settings can be changed by the user.
   *
   * @group Team
   *
   * @param props
   */
  async listTeams(props?: ListTeamsProps) {
    return listTeams(this)(props);
  }

  /**
   * Get a team
   *
   * @group Team
   *
   * @param props
   */
  async getTeam(props: GetTeamProps) {
    return getTeam(this)(props);
  }

  /**
   * List issues
   *
   * @group Issue
   *
   * @example List issues created since date
   * ```typescript
   * const response = await linear.listIssues({
   *   filter: { createdAt: { gt: "<date>" } }
   * });
   *
   * const issues = response.data.issues;
   * ```
   *
   * @example Get issue with identifier LY-123
   * ```typescript
   * const response = await linear.listIssues({
   *   filter: {
   *     team: { key: { eq: "LY" } },
   *     number: { eq: 123 },
   *   },
   * });
   *
   * const issue = response.data.issues[0];
   * ```
   *
   * @param props
   */
  async listIssues(props?: ListIssuesProps) {
    return listIssues(this)(props);
  }

  /**
   * Get an issue
   *
   * @group Issue
   *
   * @param props
   */
  async getIssue(props: GetIssueProps) {
    return getIssue(this)(props);
  }

  /**
   * Create an issue
   *
   * @group Issue
   *
   * @param props
   */
  async createIssue(props: CreateIssueProps) {
    return createIssue(this)(props);
  }

  /**
   * Update an issue
   *
   * @group Issue
   *
   * @param props
   */
  async updateIssue(props: UpdateIssueProps) {
    return updateIssue(this)(props);
  }

  /**
   * List comments
   *
   * @group Comment
   *
   * @param props
   */
  async listComments(props?: ListCommentsProps) {
    return listComments(this)(props);
  }

  /**
   * Get a comment
   *
   * @group Comment
   *
   * @param props
   */
  async getComment(props: GetCommentProps) {
    return getComment(this)(props);
  }

  /**
   * Create a comment
   *
   * @group Comment
   *
   * @param props
   */
  async createComment(props: CreateCommentProps) {
    return createComment(this)(props);
  }

  /**
   * List users
   *
   * @group User
   *
   * @param props
   */
  async listUsers(props?: ListUsersProps) {
    return listUsers(this)(props);
  }

  /**
   * Get a user
   *
   * @group User
   *
   * @param props
   */
  async getUser(props: GetUserProps) {
    return getUser(this)(props);
  }

  /**
   * List workflow states
   *
   * @group Workflow State
   *
   * @param props
   */
  async listWorkflowStates(props?: ListWorkflowStatesProps) {
    return listWorkflowStates(this)(props);
  }

  /**
   * Find issue by identifier
   *
   * @group Helper
   *
   * @example
   * ```typescript
   * const issue = await linear.findIssueByIdentifier({ identifier: "ENG-102" });
   * ```
   */
  async findIssueByIdentifier(props: FindIssueByIdentifierProps) {
    return findIssueByIdentifier(this)(props);
  }

  /**
   * Find workflow state by name
   *
   * @group Helper
   *
   * @example
   * ```typescript
   * const workflowState = await linear.findWorkflowStateByName({ name: "Done" });
   * ```
   */
  async findWorkflowStateByName(props: FindWorkflowStateByNameProps) {
    return findWorkflowStateByName(this)(props);
  }
}
