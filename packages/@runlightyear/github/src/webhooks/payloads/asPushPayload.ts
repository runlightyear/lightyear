import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { PushCommit } from "../../types/PushCommit";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#push
 */
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
  headCommit: PushCommit;
  /**
   * 	URL that shows the changes in this ref update, from the before commit to the after commit. For a newly created ref that is directly based on the default branch, this is the comparison between the head of the default branch and the after commit. Otherwise, this shows all commits until the after commit.
   */
  compare: string;
  /**
   * 	An array of commit objects describing the pushed commits. (Pushed commits are all commits that are included in the compare between the before commit and the after commit.)
   */
  commits: Array<PushCommit>;
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

export function asPushPayload(data: WebhookDeliveryData) {
  return commonPayload<PushPayload>("push", data);
}
