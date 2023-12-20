/**
 * Create threadBeta
 * POST
 *
 * https://api.openai.com/v1/threads
 *
 * Create a thread.
 *
 * Request body
 * messages
 * array
 * Optional
 * A list of messages to start the thread with.
 *
 *
 * Show properties
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * A thread object.
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
 *   const emptyThread = await openai.beta.threads.create();
 *
 *   console.log(emptyThread);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "thread_abc123",
 *   "object": "thread",
 *   "created_at": 1699012949,
 *   "metadata": {}
 * }
 */
import { Message } from "../types/Message";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Thread } from "../types/Thread";
import { OpenAI } from "../OpenAI";

export interface CreateThreadProps {
  /**
   * A list of messages to start the thread with.
   */
  messages?: CreateThreadMessage[];
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maximum of 512 characters long.
   */
  metadata?: Record<string, string>;
}

export interface CreateThreadMessage {
  /**
   * The role of the entity that is creating the message. Currently only user is supported.
   */
  role: "user";
  /**
   * The content of the message in array of text and/or images.
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

export interface CreateThreadResponse extends HttpProxyResponse {
  data: Thread;
}

export const createThread =
  (self: OpenAI) =>
  async (props?: CreateThreadProps): Promise<CreateThreadResponse> => {
    const { messages, metadata } = props || {};

    return self.post({
      url: `/threads`,
      data: {
        messages,
        metadata,
      },
    });
  };
