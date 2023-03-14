import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { CommitComment } from "../../types/CommitComment";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#commit_comment
 */
export interface CommitCommentPayload extends CommonPayload {
  /**
   * The action performed. Can be created.
   */
  action: "created";

  comment: CommitComment;
}

export function commitCommentPayload(
  data: WebhookDeliveryData
): CommitCommentPayload {
  const payload = commonPayload("commit_comment", data) as unknown;
  return payload as CommitCommentPayload;
}
