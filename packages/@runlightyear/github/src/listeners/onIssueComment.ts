import { createListener } from "./createListener";
import {
  asIssueCommentPayload,
  IssueCommentPayload,
} from "../webhooks/payloads/asIssueCommentPayload";

export const onIssueComment = createListener<IssueCommentPayload>({
  event: "issue_comment",
  payloadCaster: asIssueCommentPayload,
});
