import { WebhookSpecification } from "./WebhookSpecification";
import { WebhookNotification } from "./WebhookNotification";

export interface Webhook {
  /**
   * An identifier for the webhook (WebhookId).
   */
  id: string;
  /**
   * Whether or not notifications are enabled for the webhook.
   */
  areNotificationsEnabled: boolean;
  /**
   * The cursor associated with the next payload that will be generated. This cursor will increase every time a new payload is generated for this webhook.
   */
  cursorForNextPayload: number;
  /**
   * Whether or not the webhook is enabled. Webhooks may be turned off automatically such as when the specification becomes invalid. See error codes.
   */
  isHookEnabled: boolean;
  /**
   * The time of the most recent successful notification.
   */
  lastSuccessfulNotificationTime: string | null;
  /**
   * The url registered with the webhook. May be null if none was given.
   */
  notificationUrl: string | null;
  /**
   * The time when the webhook expires and is disabled in the ISO format. The webhook will not expire if this is null (in the case User API keys are used)
   */
  expirationTime?: string;
  /**
   * The result of the most recent notification.
   */
  lastNotificationResult: WebhookNotification | null;
  /**
   * The specification registered with the webhook.
   */
  specification: WebhookSpecification;
}
