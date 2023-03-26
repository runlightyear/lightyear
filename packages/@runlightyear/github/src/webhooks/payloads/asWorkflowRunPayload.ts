import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { WorkflowRun } from "../../types/WorkflowRun";
import { Workflow } from "../../types/Workflow";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_run
 */
export interface WorkflowRunPayload extends CommonPayload {
  action: "requested" | "in_progress" | "completed";

  workflow: Workflow;

  workflowRun: WorkflowRun;
}

export function asWorkflowRunPayload(data: WebhookDeliveryData) {
  return commonPayload<WorkflowRunPayload>("workflow_run", data);
}
