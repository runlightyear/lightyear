import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_dispatch
 */
export interface WorkflowDispatchPayload extends CommonPayload {
  inputs: object | null;
  ref: string;
  workflow: string;
}

export function asWorkflowDispatchPayload(
  data: WebhookDeliveryData
): WorkflowDispatchPayload {
  const payload = commonPayload(
    "workflow_dispatch",
    data,
    "asWorkflowDispatchPayload"
  ) as unknown;
  return payload as WorkflowDispatchPayload;
}
