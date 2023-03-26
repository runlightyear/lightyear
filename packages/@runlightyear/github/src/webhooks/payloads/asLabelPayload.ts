import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { Label } from "../../types/Label";

export interface LabelCreatedPayload extends CommonPayload {
  action: "created";
  label: Label;
}

export interface LabelDeletedPayload extends CommonPayload {
  action: "deleted";
  label: Label;
}

export interface LabelEditedPayload extends CommonPayload {
  action: "edited";
  changes: {
    color?: {
      from: string;
    };
    description?: {
      from: string;
    };
    name?: {
      from: string;
    };
  };
  label: Label;
}

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#label
 */
export type LabelPayload =
  | LabelCreatedPayload
  | LabelDeletedPayload
  | LabelEditedPayload;

export function asLabelPayload(data: WebhookDeliveryData) {
  return commonPayload<LabelPayload>("label", data);
}
