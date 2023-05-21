import { createListener } from "./createListener";
import {
  asWorkflowJobPayload,
  WorkflowJobPayload,
} from "../webhooks/payloads/asWorkflowJobPayload";

export const onWorkflowJob = createListener<WorkflowJobPayload>({
  event: "workflow_job",
  payloadCaster: asWorkflowJobPayload,
});
