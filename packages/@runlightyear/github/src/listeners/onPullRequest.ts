import { createListener } from "./createListener";
import {
  asPullRequestPayload,
  PullRequestPayload,
} from "../webhooks/payloads/asPullRequestPayload";

export const onPullRequest = createListener<PullRequestPayload>({
  event: "pull_request",
  payloadCaster: asPullRequestPayload,
});
