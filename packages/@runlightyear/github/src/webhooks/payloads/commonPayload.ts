import { WebhookDeliveryData } from "@runlightyear/lightyear";
import { GitHub } from "../../GitHub";
import WebhookEvent from "../../types/WebhookEvent";
import { User } from "../../types/User";
import { Repository } from "../../types/Repository";

export interface CommonPayload {
  /**
   * The user that triggered the event.
   */
  sender: User;

  /**
   * The repository where the event occurred.
   */
  repository: Repository;

  /**
   * Webhook payloads contain the organization object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization.
   */
  organization?: object;

  /**
   * The GitHub App installation.
   */
  installation?: object;
}

export default function commonPayload(
  expectedEvent: WebhookEvent,
  deliveryData: WebhookDeliveryData
): CommonPayload {
  const event = deliveryData.headers && deliveryData.headers["x-github-event"];
  if (event === "ping") {
    throw "SKIPPED";
  }

  if (event !== expectedEvent) {
    throw new Error(`Expected event: ${expectedEvent}, got: ${event}`);
  }

  const data = GitHub.processDelivery(deliveryData);
  return data.body as CommonPayload;
}
