/**
 * Retrieve threadBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}
 *
 * Retrieves a thread.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to retrieve.
 *
 * Returns
 * The thread object matching the specified ID.
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
 *   const myThread = await openai.beta.threads.retrieve(
 *     "thread_abc123"
 *   );
 *
 *   console.log(myThread);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "thread_abc123",
 *   "object": "thread",
 *   "created_at": 1699014083,
 *   "metadata": {}
 * }
 *
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Thread } from "../types/Thread";
import { OpenAI } from "../OpenAI";

export interface RetrieveThreadProps {
  /**
   * The ID of the thread to retrieve.
   */
  threadId: string;
}

export interface RetrieveThreadResponse extends HttpProxyResponse {
  data: Thread;
}

export const retrieveThread =
  (self: OpenAI) =>
  async (props: RetrieveThreadProps): Promise<RetrieveThreadResponse> => {
    const { threadId } = props;

    return self.get({
      url: `/threads/${threadId}`,
    });
  };
