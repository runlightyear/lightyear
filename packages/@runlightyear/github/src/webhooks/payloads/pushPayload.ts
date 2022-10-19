import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";

export interface PushPayload extends CommonPayload {
  /**
   * The full git ref that was pushed. Example: refs/heads/main or refs/tags/v3.14.1.
   */
  ref: string;
  /**
   * 	The SHA of the most recent commit on ref before the push.
   */
  before: string;
  /**
   * The SHA of the most recent commit on ref after the push.
   */
  after: string;
  /**
   * 	Whether this push created the ref.
   */
  created: boolean;
  /**
   * Whether this push deleted the ref.
   */
  deleted: boolean;
  /**
   * Whether this push was a force push of the ref.
   */
  forced: boolean;
  /**
   * 	For pushes where after is or points to a commit object, an expanded representation of that commit. For pushes where after refers to an annotated tag object, an expanded representation of the commit pointed to by the annotated tag.
   */
  head_commit: object;
  /**
   * 	URL that shows the changes in this ref update, from the before commit to the after commit. For a newly created ref that is directly based on the default branch, this is the comparison between the head of the default branch and the after commit. Otherwise, this shows all commits until the after commit.
   */
  compare: string;
  /**
   * 	An array of commit objects describing the pushed commits. (Pushed commits are all commits that are included in the compare between the before commit and the after commit.)
   */
  commits: Array<{
    /**
     * The SHA of the commit.
     */
    id: string;
    /**
     * The ISO 8601 timestamp of the commit.
     */
    timestamp: string;
    /**
     * The commit message.
     */
    message: string;
    /**
     * The git author of the commit.
     */
    author: {
      /**
       * The git author's name.
       */
      name: string;
      /**
       * The git author's email address.
       */
      email: string;
    };
    /**
     * URL that points to the commit API resource.
     */
    url: string;
    /**
     * Whether this commit is distinct from any that have been pushed before.
     */
    distinct: boolean;
    /**
     * An array of files added in the commit. For extremely large commits where GitHub is unable to calculate this list in a timely manner, this may be empty even if files were added.
     */
    added: string[];
    /**
     * An array of files modified by the commit. For extremely large commits where GitHub is unable to calculate this list in a timely manner, this may be empty even if files were modified.
     */
    modified: string[];
    /**
     * An array of files removed in the commit. For extremely large commits where GitHub is unable to calculate this list in a timely manner, this may be empty even if files were removed.
     */
    removed: string[];
  }>;
  /**
   * The user who pushed the commits.
   */
  pusher: {
    /**
     * The pushers name.
     */
    name: string;
    /**
     * The pushers email address.
     */
    email: string;
  };
}

export default function pushPayload(data: WebhookDeliveryData): PushPayload {
  const payload = commonPayload("push", data) as unknown;
  return payload as PushPayload;
}
