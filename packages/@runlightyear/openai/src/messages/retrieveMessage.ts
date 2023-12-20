/**
 * Retrieve messageBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}/messages/{message_id}
 *
 * Retrieve a message.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to which this message belongs.
 *
 * message_id
 * string
 * Required
 * The ID of the message to retrieve.
 *
 * Returns
 * The message object matching the specified ID.
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
 *   const message = await openai.beta.threads.messages.retrieve(
 *     "thread_abc123",
 *     "msg_abc123"
 *   );
 *
 *   console.log(message);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "msg_abc123",
 *   "object": "thread.message",
 *   "created_at": 1699017614,
 *   "thread_id": "thread_abc123",
 *   "role": "user",
 *   "content": [
 *     {
 *       "type": "text",
 *       "text": {
 *         "value": "How does AI work? Explain it in simple terms.",
 *         "annotations": []
 *       }
 *     }
 *   ],
 *   "file_ids": [],
 *   "assistant_id": null,
 *   "run_id": null,
 *   "metadata": {}
 * }
 */
import { Message } from "../types/Message";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface RetrieveMessageProps {
  /**
   * The ID of the thread to which this message belongs.
   */
  threadId: string;

  /**
   * The ID of the message to retrieve.
   */
  messageId: string;
}

export interface RetrieveMessageResponse extends HttpProxyResponse {
  data: Message;
}

export const retrieveMessage =
  (self: OpenAI) =>
  async (props: RetrieveMessageProps): Promise<RetrieveMessageResponse> => {
    const { threadId, messageId } = props;

    return self.get({
      url: `/threads/${threadId}/messages/${messageId}`,
    });
  };
