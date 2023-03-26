import { WebhookDeliveryData } from "@runlightyear/lightyear";
import { GitHub } from "../../GitHub";
import WebhookEvent from "../../types/WebhookEvent";
import { User } from "../../types/User";
import { Repository } from "../../types/Repository";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#webhook-payload-object-common-properties
 */
export interface CommonPayload {
  /**
   * An enterprise on GitHub.
   */
  enterprise?: object;

  /**
   * The GitHub App installation.
   */
  installation?: object;

  /**
   * Webhook payloads contain the organization object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization.
   */
  organization?: object;

  /**
   * The repository where the event occurred.
   */
  repository: Repository;

  /**
   * The user that triggered the event.
   */
  sender: User;
}

export default function commonPayload<Payload>(
  expectedEvent: WebhookEvent,
  deliveryData: WebhookDeliveryData
): Payload | null {
  const event = deliveryData.headers && deliveryData.headers["x-github-event"];
  if (event === "ping") {
    console.debug("Skipping ping event");
    throw "SKIPPED";
  }

  if (event !== expectedEvent) {
    console.info(
      `Attempt to cast GitHub event ${event} to ${expectedEvent} failed, returning null`
    );
    return null;
  }

  const data = GitHub.processDelivery(deliveryData);
  return data.body as Payload;
}
