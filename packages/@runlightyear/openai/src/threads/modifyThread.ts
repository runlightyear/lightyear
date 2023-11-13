/**
 * Modify threadBeta
 * POST
 *
 * https://api.openai.com/v1/threads/{thread_id}
 *
 * Modifies a thread.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to modify. Only the metadata can be modified.
 *
 * Request body
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * The modified thread object matching the specified ID.
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
 *   const updatedThread = await openai.beta.threads.update(
 *     "thread_abc123",
 *     {
 *       metadata: { modified: "true", user: "abc123" },
 *     }
 *   );
 *
 *   console.log(updatedThread);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "thread_abc123",
 *   "object": "thread",
 *   "created_at": 1699014083,
 *   "metadata": {
 *     "modified": "true",
 *     "user": "abc123"
 *   }
 * }
 */
import { Thread } from "../types/Thread";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ModifyThreadProps {
  /**
   * The ID of the thread to modify. Only the metadata can be modified.
   */
  threadId: string;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maximum of 512 characters long.
   */
  metadata?: Record<string, string>;
}

export interface ModifyThreadResponse extends HttpProxyResponse {
  data: Thread;
}

export const modifyThread =
  (self: OpenAI) =>
  async (props: ModifyThreadProps): Promise<ModifyThreadResponse> => {
    const { threadId, metadata } = props;

    return self.post({
      url: `/threads/${threadId}`,
      data: {
        metadata,
      },
    });
  };
