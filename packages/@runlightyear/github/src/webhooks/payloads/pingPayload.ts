import { WebhookDeliveryData } from "@bigidea/integration";
import commonPayload, { CommonPayload } from "./commonPayload";

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

export default function pingPayload(data: WebhookDeliveryData): PingPayload {
  const payload = commonPayload("ping", data) as unknown;
  return payload as PingPayload;
}
