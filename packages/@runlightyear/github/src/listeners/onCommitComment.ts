import { createListener } from "./createListener";
import {
  asCommitCommentPayload,
  CommitCommentPayload,
} from "../webhooks/payloads/asCommitCommentPayload";

export const onCommitComment = createListener<CommitCommentPayload>({
  event: "commit_comment",
  payloadCaster: asCommitCommentPayload,
});
