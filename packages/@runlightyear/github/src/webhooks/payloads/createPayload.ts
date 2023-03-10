import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";

export interface CreatePayload extends CommonPayload {
  /**
   * The repository's current description.
   */
  description: string | null;

  /**
   * An enterprise on GitHub.
   */
  enterprise?: object;

  /**
   * The name of the repository's default branch (usually main).
   */
  masterBranch: string;

  /**
   * The pusher type for the event. Can be either user or a deploy key.
   */
  pusherType: string;

  /**
   * The git ref resource.
   */
  ref: string;

  /**
   *  The type of Git ref object created in the repository.
   *
   *  Can be one of: tag, branch
   */
  refType: "tag" | "branch";
}

export function createPayload(data: WebhookDeliveryData): CreatePayload {
  const payload = commonPayload("create", data) as unknown;
  return payload as CreatePayload;
}