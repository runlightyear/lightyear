import { createListener } from "./createListener";
import {
  asWorkflowDispatchPayload,
  WorkflowDispatchPayload,
} from "../webhooks/payloads/asWorkflowDispatchPayload";

export const onWorkflowDispatch = createListener<WorkflowDispatchPayload>({
  event: "workflow_dispatch",
  payloadCaster: asWorkflowDispatchPayload,
});
