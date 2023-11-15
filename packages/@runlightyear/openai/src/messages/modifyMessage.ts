/**
 * Modify messageBeta
 * POST
 *
 * https://api.openai.com/v1/threads/{thread_id}/messages/{message_id}
 *
 * Modifies a message.
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
 * The ID of the message to modify.
 *
 * Request body
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * The modified message object.
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
 *   const message = await openai.beta.threads.messages.update(
 *     "thread_abc123",
 *     "msg_abc123",
 *     {
 *       metadata: {
 *         modified: "true",
 *         user: "abc123",
 *       },
 *     }
 *   }'
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
 *   "metadata": {
 *     "modified": "true",
 *     "user": "abc123"
 *   }
 * }
 */
import { Message } from "../types/Message";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ModifyMessageProps {
  /**
   * The ID of the thread to which this message belongs.
   */
  threadId: string;

  /**
   * The ID of the message to modify.
   */
  messageId: string;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata?: Record<string, string>;
}

export interface ModifyMessageResponse extends HttpProxyResponse {
  data: Message;
}

export const modifyMessage =
  (self: OpenAI) =>
  async (props: ModifyMessageProps): Promise<ModifyMessageResponse> => {
    const { threadId, messageId, metadata } = props;

    return self.post({
      url: `/threads/${threadId}/messages/${messageId}`,
      data: {
        metadata,
      },
    });
  };
