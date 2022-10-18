import { WebhookDeliveryData } from "@bigidea/integration";
import { Github } from "../../Github";
import WebhookEvent from "../WebhookEvent";

export interface CommonPayload {
  /**
   * The action that was performed. Can be one of requested or completed.
   */
  // action: "requested" | "completed";
  /**
   * The user that triggered the event.
   */
  sender: object;
  /**
   * The repository where the event occurred.
   */
  repository: object;
  /**
   * Webhook payloads contain the organization object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization.
   */
  organization: object;
  /**
   * The GitHub App installation.
   */
  installation: object;
}

export default function commonPayload(
  expectedEvent: WebhookEvent,
  deliveryData: WebhookDeliveryData
): CommonPayload {
  const event = deliveryData.headers && deliveryData.headers["x-github-event"];
  if (event !== expectedEvent) {
    throw new Error(`Expected event: ${expectedEvent}, got: ${event}`);
  }

  const data = Github.processDelivery(deliveryData);
  return data.body as CommonPayload;
}
