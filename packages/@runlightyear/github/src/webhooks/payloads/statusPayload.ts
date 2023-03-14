import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { Commit } from "../../types/Commit";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#status
 */
export interface StatusPayload extends CommonPayload {
  avatarUrl: string | null;

  /**
   * An array of branch objects containing the status' SHA. Each branch contains the given SHA, but the SHA may or may not be the head of the branch. The array includes a maximum of 10 branches.
   */
  branches: Array<{
    commit: {
      sha: string | null;
      url: string | null;
    };
    name: string;
    protected: boolean;
  }>;

  commit: Commit;

  context: string;

  createdAt: string;

  /**
   * The optional human-readable description added to the status.
   */
  description: string | null;

  /**
   * The unique identifier of the status.
   */
  id: number;

  name: string;

  /**
   * The Commit SHA.
   */
  sha: string;

  /**
   * The new state. Can be pending, success, failure, or error.
   *
   * Can be one of: pending, success, failure, error
   */
  state: string;

  /**
   * The optional link added to the status.
   */
  targetUrl: string | null;

  updatedAt: string;
}

export function statusPayload(data: WebhookDeliveryData): StatusPayload {
  const payload = commonPayload("status", data) as unknown;
  return payload as StatusPayload;
}
