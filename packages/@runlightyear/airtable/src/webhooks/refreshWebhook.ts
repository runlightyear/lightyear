import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";

export interface RefreshWebhookProps {
  baseId: string;
  webhookId: string;
}

export interface RefreshWebhookResponseData {
  expirationTime: string;
}

export interface RefreshWebhookResponse extends HttpProxyResponse {
  data: RefreshWebhookResponseData;
}

export const refreshWebhook =
  (self: Airtable) =>
  async (props: RefreshWebhookProps): Promise<RefreshWebhookResponse> => {
    const { baseId, webhookId } = props;

    return await self.post({
      url: `/bases/${baseId}/webhooks/${webhookId}/refresh`,
    });
  };
