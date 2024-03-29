import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#ping
 */
export interface PingPayload extends CommonPayload {
  /**
   * Random string of GitHub zen.
   */
  zen: string;
  /**
   * The ID of the webhook that triggered the ping.
   */
  hookId: number;
  /**
   * The webhook configuration.
   */
  hook: {
    /**
     * When you register a new GitHub App, GitHub sends a ping event to the webhook URL you specified during registration. The event contains the app_id, which is required for authenticating an app.
     */
    appId: number;
  };
}

export function asPingPayload(data: WebhookDeliveryData) {
  return commonPayload<PingPayload>("ping", data);
}
