import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { Issue } from "../../types/Issue";
import { IssueComment } from "../../types/IssueComment";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
 */
export interface IssueCommentCreatedPayload extends CommonPayload {
  action: "created";
  comment: IssueComment;
  issue: Issue;
}

export interface IssueCommentDeletedPayload extends CommonPayload {
  action: "deleted";
  comment: IssueComment;
  issue: Issue;
}

export interface IssueCommentEditedPayload extends CommonPayload {
  action: "edited";
  changes: {
    body?: {
      from: string;
    };
  };
  comment: IssueComment;
}

export type IssueCommentPayload =
  | IssueCommentCreatedPayload
  | IssueCommentDeletedPayload
  | IssueCommentEditedPayload;

export function asIssueCommentPayload(data: WebhookDeliveryData) {
  return commonPayload<IssueCommentPayload>("issue_comment", data);
}
