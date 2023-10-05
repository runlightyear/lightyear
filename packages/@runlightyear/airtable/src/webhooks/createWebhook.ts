import { WebhookSpecification } from "../types/WebhookSpecification";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";

export interface CreateWebhookProps {
  /**
   * The id of the base to create the webhook on.
   */
  baseId: string;
  /**
   * An optional url that can receive notification pings. See notification delivery.
   */
  notificationUrl?: string;
  /**
   * A JSON object that describe the types of changes the webhook is interested in.
   */
  specification: WebhookSpecification;
}

export interface CreateWebhookResponseData {
  /**
   * An identifier for the webhook (WebhookId).
   */
  id: string;
  /**
   * A MAC secret. The client should store this value to authenticate webhook pings. There is no way to retrieve this value after the initial creation of the webhook.
   */
  macSecretBase64: string;
  /**
   * The time when the webhook expires and is disabled in the ISO format. The webhook will not expire if this is null (in the case User API keys are used)
   */
  expirationTime?: string;
}

export interface CreateWebhookResponse extends HttpProxyResponse {
  data: CreateWebhookResponseData;
}

export const createWebhook =
  (self: Airtable) =>
  async (props: CreateWebhookProps): Promise<CreateWebhookResponse> => {
    const { baseId, notificationUrl, specification } = props;

    return self.post({
      url: `/bases/${baseId}/webhooks`,
      data: {
        notificationUrl,
        specification,
      },
    });
  };
