/**
 * List messagesBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}/messages
 *
 * Returns a list of messages for a given thread.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread the messages belong to.
 *
 * Query parameters
 * limit
 * integer
 * Optional
 * Defaults to 20
 * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
 *
 * order
 * string
 * Optional
 * Defaults to desc
 * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
 *
 * after
 * string
 * Optional
 * A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.
 *
 * before
 * string
 * Optional
 * A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.
 *
 * Returns
 * A list of message objects.
 *
 * Example request
 * node.js
 *
 * node.js
 * import OpenAI from "openai";
 *
 * const openai = new OpenAI();
 *
 * async function main() {
 *   const threadMessages = await openai.beta.threads.messages.list(
 *     "thread_abc123"
 *   );
 *
 *   console.log(threadMessages.data);
 * }
 *
 * main();
 * Response
 * {
 *   "object": "list",
 *   "data": [
 *     {
 *       "id": "msg_abc123",
 *       "object": "thread.message",
 *       "created_at": 1699016383,
 *       "thread_id": "thread_abc123",
 *       "role": "user",
 *       "content": [
 *         {
 *           "type": "text",
 *           "text": {
 *             "value": "How does AI work? Explain it in simple terms.",
 *             "annotations": []
 *           }
 *         }
 *       ],
 *       "file_ids": [],
 *       "assistant_id": null,
 *       "run_id": null,
 *       "metadata": {}
 *     },
 *     {
 *       "id": "msg_abc456",
 *       "object": "thread.message",
 *       "created_at": 1699016383,
 *       "thread_id": "thread_abc123",
 *       "role": "user",
 *       "content": [
 *         {
 *           "type": "text",
 *           "text": {
 *             "value": "Hello, what is AI?",
 *             "annotations": []
 *           }
 *         }
 *       ],
 *       "file_ids": [
 *         "file-abc123"
 *       ],
 *       "assistant_id": null,
 *       "run_id": null,
 *       "metadata": {}
 *     }
 *   ],
 *   "first_id": "msg_abc123",
 *   "last_id": "msg_abc456",
 *   "has_more": false
 * }
 */
import { Message } from "../types/Message";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ListMessagesProps {
  /**
   * The ID of the thread to list messages for.
   */
  threadId: string;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
   */
  limit?: number;

  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   */
  order?: string;

  /**
   * A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;

  /**
   * A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

export interface ListMessagesResponseData {
  /**
   * The object type, which is always list.
   */
  object: "list";

  /**
   * An array of message objects.
   */
  data: Message[];

  /**
   * The ID of the first object in the list.
   */
  firstId: string;

  /**
   * The ID of the last object in the list.
   */
  lastId: string;

  /**
   * Whether there are more objects beyond the ones returned.
   */
  hasMore: boolean;
}

export interface ListMessagesResponse extends HttpProxyResponse {
  data: ListMessagesResponseData;
}

export const listMessages =
  (self: OpenAI) =>
  async (props: ListMessagesProps): Promise<ListMessagesResponse> => {
    const { threadId, limit, order, after, before } = props;

    return self.get({
      url: `/threads/${threadId}/messages`,
      params: {
        limit,
        order,
        after,
        before,
      },
    });
  };
