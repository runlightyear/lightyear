import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { Deployment } from "../../types/Deployment";
import { WorkflowJob } from "../../types/WorkflowJob";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_job
 */
export interface WorkflowJobPayload extends CommonPayload {
  action: "completed" | "in_progress" | "queued" | "waiting";
  ref: string;
  workflowJob: WorkflowJob;
  deployment: Deployment;
}

export default function workflowJobPayload(
  data: WebhookDeliveryData
): WorkflowJobPayload {
  const payload = commonPayload("workflow_job", data) as unknown;
  return payload as WorkflowJobPayload;
}
