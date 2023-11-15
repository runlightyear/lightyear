/**
 * List message filesBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}/messages/{message_id}/files
 *
 * Returns a list of message files.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread that the message and files belong to.
 *
 * message_id
 * string
 * Required
 * The ID of the message that the files belongs to.
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
 * A list of message file objects.
 *
 * Example request
 * node.js
 *
 * node.js
 * import OpenAI from "openai";
 * const openai = new OpenAI();
 *
 * async function main() {
 *   const messageFiles = await openai.beta.threads.messages.files.list(
 *     "thread_abc123",
 *     "msg_abc123"
 *   );
 *   console.log(messageFiles);
 * }
 *
 * main();
 * Response
 * {
 *   "object": "list",
 *   "data": [
 *     {
 *       "id": "file-abc123",
 *       "object": "thread.message.file",
 *       "created_at": 1699061776,
 *       "message_id": "msg_abc123"
 *     },
 *     {
 *       "id": "file-abc123",
 *       "object": "thread.message.file",
 *       "created_at": 1699061776,
 *       "message_id": "msg_abc123"
 *     }
 *   ],
 *   "first_id": "file-abc123",
 *   "last_id": "file-abc123",
 *   "has_more": false
 * }
 */
import { MessageFile } from "../types/MessageFile";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ListMessageFilesProps {
  /**
   * The ID of the thread that the message and files belong to.
   */
  threadId: string;
  /**
   * The ID of the message that the files belongs to.
   */
  messageId: string;
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

export interface ListMessageFilesResponseData {
  object: "list";
  data: MessageFile[];
  firstId: string;
  lastId: string;
  hasMore: boolean;
}

export interface ListMessageFilesResponse extends HttpProxyResponse {
  data: ListMessageFilesResponseData;
}

export const listMessageFiles =
  (self: OpenAI) =>
  async (props: ListMessageFilesProps): Promise<ListMessageFilesResponse> => {
    const { threadId, messageId, limit, order, after, before } = props;

    return self.get({
      url: `/threads/${threadId}/messages/${messageId}/files`,
      params: {
        limit,
        order,
        after,
        before,
      },
    });
  };
