import { createListener } from "./createListener";
import {
  asWorkflowRunPayload,
  WorkflowRunPayload,
} from "../webhooks/payloads/asWorkflowRunPayload";

export const onWorkflowRun = createListener<WorkflowRunPayload>({
  event: "issues",
  payloadCaster: asWorkflowRunPayload,
});
