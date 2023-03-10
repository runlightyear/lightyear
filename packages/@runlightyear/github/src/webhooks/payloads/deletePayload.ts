import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";

export interface DeletePayload extends CommonPayload {
  /**
   * The pusher type for the event. Can be either user or a deploy key.
   */
  pusherType: string;

  /**
   * The git ref resource.
   */
  ref: string;

  /**
   * The type of Git ref object deleted in the repository.
   *
   * Can be one of: tag, branch
   */
  refType: "tag" | "branch";
}

export function deletePayload(data: WebhookDeliveryData): DeletePayload {
  const payload = commonPayload("delete", data) as unknown;
  return payload as DeletePayload;
}
