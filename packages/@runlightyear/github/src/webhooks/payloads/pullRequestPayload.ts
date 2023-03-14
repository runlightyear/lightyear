import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request
 */
export interface PullRequestPayload extends CommonPayload {
  /**
   * The action that was performed.
   */
  action:
    | "assigned"
    | "auto_merge_disabled"
    | "auto_merge_enabled"
    /**
     * If the action is closed and the merged key is false, the pull request was closed with unmerged commits. If the action is closed and the merged key is true, the pull request was merged.
     */
    | "closed"
    | "converted_to_draft"
    | "edited"
    | "labeled"
    | "locked"
    | "opened"
    | "ready_for_review"
    | "reopened"
    | "review_request_removed"
    | "review_requested"
    /**
     * Triggered when a pull request's head branch is updated. For example, when the head branch is updated from the base branch, when new commits are pushed to the head branch, or when the base branch is changed."
     */
    | "synchronize"
    | "unassigned"
    | "unlabeled"
    | "unlocked";
  /**
   * The pull request number.
   */
  number: number;
  /**
   * The changes to the comment if the action was edited.
   */
  changes: {
    title: {
      /**
       * The previous version of the title if the action was edited.
       */
      from: string;
    };
    body: {
      /**
       * The previous version of the body if the action was edited.
       */
      from: string;
    };
  };
  /**
   * The pull request itself.
   */
  pullRequest: object;
  /**
   * The repository where the event occurred.
   */
}

export default function pullRequestPayload(
  data: WebhookDeliveryData
): PullRequestPayload {
  const payload = commonPayload("pull_request", data) as unknown;
  return payload as PullRequestPayload;
}
