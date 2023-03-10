import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { User } from "../../types/User";
import { Issue } from "../../types/Issue";
import { Milestone } from "../../types/Milestone";
import { Label } from "../../types/Label";

export interface IssueAssignedPayload extends CommonPayload {
  action: "assigned";
  assignee: User;
  issue: Issue;
}

export interface IssueClosedPayload extends CommonPayload {
  action: "closed";
  issue: Issue;
}

export interface IssueDeletedPayload extends CommonPayload {
  action: "deleted";
  issue: Issue;
}

export interface IssueDemilestonedPayload extends CommonPayload {
  action: "demilestoned";
  issue: Issue;
  milestone: Milestone;
}

export interface IssueEditedPayload extends CommonPayload {
  action: "deleted";
  issue: Issue;
  label?: Label;
}

export interface IssueLabeledPayload extends CommonPayload {
  action: "labeled";
  issue: Issue;
  label?: Label;
}

export interface IssueLockedPayload extends CommonPayload {
  action: "locked";
  issue: Issue;
}

export interface IssueMilestonedPayload extends CommonPayload {
  action: "milestoned";
  issue: Issue;
  milestone: Milestone;
}

export interface IssueOpenedPayload extends CommonPayload {
  action: "opened";
  issue: Issue;
}

export interface IssuePinnedPayload extends CommonPayload {
  action: "pinned";
  issue: Issue;
}

export interface IssueReopenedPayload extends CommonPayload {
  action: "reopened";
  issue: Issue;
}

export interface IssueTransferredPayload extends CommonPayload {
  action: "transferred";
  issue: Issue;
}

export interface IssueUnassignedPayload extends CommonPayload {
  action: "unassigned";
  issue: Issue;
  assignee: User;
}

export interface IssueUnlabeledPayload extends CommonPayload {
  action: "unlabeled";
  issue: Issue;
  label: Label;
}

export interface IssueUnlockedPayload extends CommonPayload {
  action: "unlocked";
  issue: Issue;
}

export interface IssueUnpinnedPayload extends CommonPayload {
  action: "unpinned";
  issue: Issue;
}

export type IssuesPayload =
  | IssueAssignedPayload
  | IssueClosedPayload
  | IssueDeletedPayload
  | IssueDemilestonedPayload
  | IssueEditedPayload
  | IssueLabeledPayload
  | IssueLockedPayload
  | IssueMilestonedPayload
  | IssueOpenedPayload
  | IssuePinnedPayload
  | IssueReopenedPayload
  | IssueTransferredPayload
  | IssueUnassignedPayload
  | IssueUnlabeledPayload
  | IssueUnlockedPayload
  | IssueUnpinnedPayload;

export function issuesPayload(data: WebhookDeliveryData): IssuesPayload {
  const payload = commonPayload("issues", data) as unknown;
  return payload as IssuesPayload;
}
