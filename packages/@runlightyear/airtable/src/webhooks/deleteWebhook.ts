import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";

export interface DeleteWebhookProps {
  baseId: string;
  webhookId: string;
}

export interface DeleteWebhookResponse extends HttpProxyResponse {
  data: undefined;
}

export const deleteWebhook =
  (self: Airtable) =>
  async (props: DeleteWebhookProps): Promise<DeleteWebhookResponse> => {
    const { baseId, webhookId } = props;

    return self.delete({
      url: `/bases/${baseId}/webhooks/${webhookId}`,
    });
  };
