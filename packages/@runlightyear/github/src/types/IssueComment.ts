import { Reactions } from "./Reactions";
import { User } from "./User";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
 */
export type IssueComment = {
  /**
   * How the author is associated with the repository.
   *
   * Can be one of: COLLABORATOR, CONTRIBUTOR, FIRST_TIMER, FIRST_TIME_CONTRIBUTOR, MANNEQUIN, MEMBER, NONE, OWNER
   */
  authorAssociation:
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";

  /**
   * Contents of the issue comment
   */
  body: string;

  createdAt: string;

  htmlUrl: string;

  /**
   * Unique identifier of the issue comment
   */
  id: number;

  issueUrl: string;

  nodeId: string;

  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   */
  performedViaGithubApp: object;

  reactions: Reactions;

  updatedAt: string;

  /**
   * URL for the issue comment
   */
  url: string;

  user: User;
};
