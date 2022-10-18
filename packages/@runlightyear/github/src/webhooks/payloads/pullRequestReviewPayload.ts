import { WebhookDeliveryData } from "@bigidea/integration";
import commonPayload, { CommonPayload } from "./commonPayload";

export interface PullRequestReviewPayload extends CommonPayload {
  /**
   * The action that was performed.
   */
  action: /**
   * A pull request review is submitted into a non-pending state.
   */
  | "submitted"
    /**
     * The body of a review has been edited.
     */
    | "edited"
    /**
     * A review has been dismissed.
     */
    | "dismissed";
  /**
   *  The pull request the review pertains to.
   */
  pullRequest: object;
  /**
   *  The review that was affected.
   */
  review: object;
  changes: {
    body: {
      /**
       * The previous version of the body if the action was edited.
       */
      from: string;
    };
  };
}

export default function pullRequestReviewPayload(
  data: WebhookDeliveryData
): PullRequestReviewPayload {
  const payload = commonPayload("pull_request_review", data) as unknown;
  return payload as PullRequestReviewPayload;
}
