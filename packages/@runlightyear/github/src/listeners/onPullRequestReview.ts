import { createListener } from "./createListener";
import {
  asPullRequestReviewPayload,
  PullRequestReviewPayload,
} from "../webhooks/payloads/asPullRequestReviewPayload";

export const onPullRequestReview = createListener<PullRequestReviewPayload>({
  event: "pull_request_review",
  payloadCaster: asPullRequestReviewPayload,
});
