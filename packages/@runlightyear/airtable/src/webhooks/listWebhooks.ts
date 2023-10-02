import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Webhook } from "../types/Webhook";
import { Airtable } from "../Airtable";

export interface ListWebhooksProps {
  baseId: string;
}

export interface ListWebhooksResponse extends HttpProxyResponse {
  data: Array<Webhook>;
}

export const listWebhooks =
  (self: Airtable) =>
  async (props: ListWebhooksProps): Promise<ListWebhooksResponse> => {
    const { baseId } = props;

    return self.get({
      url: `/bases/${baseId}/webhooks`,
    });
  };
