import { WebhookDeliveryData } from "@bigidea/integration";
import WebhookEvent from "./WebhookEvent";

export default function isWebhookEventType(
  expectedEvent: WebhookEvent,
  deliveryData: WebhookDeliveryData
): boolean {
  const event = deliveryData.headers && deliveryData.headers["x-github-event"];
  return event === expectedEvent;
}
