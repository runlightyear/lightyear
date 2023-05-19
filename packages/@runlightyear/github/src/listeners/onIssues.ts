import { createListener } from "./createListener";
import {
  asIssuesPayload,
  IssuesPayload,
} from "../webhooks/payloads/asIssuesPayload";

export const onIssues = createListener<IssuesPayload>({
  event: "issues",
  payloadCaster: asIssuesPayload,
});
