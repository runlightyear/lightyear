/**
 * Create messageBeta
 * POST
 *
 * https://api.openai.com/v1/threads/{thread_id}/messages
 *
 * Create a message.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to create a message for.
 *
 * Request body
 * role
 * string
 * Required
 * The role of the entity that is creating the message. Currently only user is supported.
 *
 * content
 * string
 * Required
 * The content of the message.
 *
 * file_ids
 * array
 * Optional
 * Defaults to []
 * A list of File IDs that the message should use. There can be a maximum of 10 files attached to a message. Useful for tools like retrieval and code_interpreter that can access and use files.
 *
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * A message object.
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
 *   const threadMessages = await openai.beta.threads.messages.create(
 *     "thread_abc123",
 *     { role: "user", content: "How does AI work? Explain it in simple terms." }
 *   );
 *
 *   console.log(threadMessages);
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

export interface CreateMessageProps {
  /**
   * The ID of the thread to create a message for.
   */
  threadId: string;

  /**
   * The role of the entity that is creating the message. Currently only user is supported.
   */
  role: string;

  /**
   * The content of the message.
   */
  content: string;

  /**
   * A list of File IDs that the message should use. There can be a maximum of 10 files attached to a message. Useful for tools like retrieval and code_interpreter that can access and use files.
   */
  fileIds?: string[];

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maximum of 512 characters long.
   */
  metadata?: Record<string, string>;
}

export interface CreateMessageResponse extends HttpProxyResponse {
  data: Message;
}

export const createMessage =
  (self: OpenAI) =>
  async (props: CreateMessageProps): Promise<CreateMessageResponse> => {
    const { threadId, role, content, fileIds, metadata } = props;

    return self.post({
      url: `/threads/${threadId}/messages`,
      data: {
        role,
        content,
        file_ids: fileIds,
        metadata,
      },
    });
  };
