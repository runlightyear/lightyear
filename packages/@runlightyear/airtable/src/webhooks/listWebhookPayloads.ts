import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";
import { WebhookPayload } from "../types/WebhookPayload";

export interface ListWebhookPayloadsProps {
  baseId: string;
  webhookId: string;
  /**
   * The first time this action is called, the cursor argument may be omitted from the request and will default to 1. After that, cursors should be saved between invocations of this action. When a client receives a ping, it should use the last cursor that this action returned when polling for new payloads, no matter how old that cursor value is. The cursor argument indicates the transaction number of the payload to start listing from.
   */
  cursor?: number;
  /**
   * If given the limit parameter specifies the maximum number of payloads to return in the response. A maximum of 50 payloads can be returned in a single request. A single payload can contain multiple updates.
   */
  limit?: number;
}

/**
 * Response format
 * cursor
 * number
 * The cursor field in the response indicates the transaction number of the payload that would immediately follow the last payload returned in this request. Payloads are returned in transaction order, so the last payload's transaction number is (cursor-1), the second-to-last payload's transaction number is (cursor-2), and so on. Each payload is associated with an incrementing cursor number. If there are no returned payloads, then the cursor in the response will be the same as the cursor specified in the request. The number of the next payload to be generated can be retrieved from cursorForNextPayload in list webhooks. Payloads are deleted from Airtable's servers after 1 week whether or not the client has seen them. The cursor value for the next payload is never reset, even if payloads are deleted.
 *
 * mightHaveMore
 * boolean
 * Indicates whether or not there are additional payloads. If mightHaveMore is true, the client should send another request immediately and pass in the cursor from this response.
 *
 * payloads
 * array of Webhooks payloads
 */
export interface ListWebhookPayloadsResponseData {
  /**
   * The cursor field in the response indicates the transaction number of the payload that would immediately follow the last payload returned in this request. Payloads are returned in transaction order, so the last payload's transaction number is (cursor-1), the second-to-last payload's transaction number is (cursor-2), and so on. Each payload is associated with an incrementing cursor number. If there are no returned payloads, then the cursor in the response will be the same as the cursor specified in the request. The number of the next payload to be generated can be retrieved from cursorForNextPayload in list webhooks. Payloads are deleted from Airtable's servers after 1 week whether or not the client has seen them. The cursor value for the next payload is never reset, even if payloads are deleted.
   */
  cursor: number;
  /**
   * Indicates whether or not there are additional payloads. If mightHaveMore is true, the client should send another request immediately and pass in the cursor from this response.
   */
  mightHaveMore: boolean;
  /**
   * array of Webhooks payloads
   */
  payloads: Array<WebhookPayload>;
}

export interface ListWebhookPayloadsResponse extends HttpProxyResponse {
  data: ListWebhookPayloadsResponseData;
}

export const listWebhookPayloads =
  (self: Airtable) =>
  async (
    props: ListWebhookPayloadsProps
  ): Promise<ListWebhookPayloadsResponse> => {
    const { baseId, webhookId, cursor, limit } = props;

    return self.get({
      url: `/bases/${baseId}/webhooks/${webhookId}/payloads`,
      params: {
        cursor,
        limit,
      },
    });
  };
