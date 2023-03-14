import { Reactions } from "./Reactions";
import { User } from "./User";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#commit_comment
 */
export type CommitComment = {
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
   * The text of the comment.
   */
  body: string;

  /**
   * The SHA of the commit to which the comment applies.
   */
  commitId: string;

  createdAt: string;

  htmlUrl: string;

  /**
   * The ID of the commit comment.
   */
  id: number;

  /**
   * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
   */
  line: number | null;

  /**
   * The node ID of the commit comment.
   */
  nodeId: string;

  /**
   * The relative path of the file to which the comment applies.
   */
  path: string | null;

  /**
   * The line index in the diff to which the comment applies.
   */
  position: number | null;

  reactions: Reactions;

  updatedAt: string;

  url: string;

  user: User | null;
};
