/**
 * Delete threadBeta
 * DELETE
 *
 * https://api.openai.com/v1/threads/{thread_id}
 *
 * Delete a thread.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to delete.
 *
 * Returns
 * Deletion status
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
 *   const response = await openai.beta.threads.del("thread_abc123");
 *
 *   console.log(response);
 * }
 * main();
 * Response
 * {
 *   "id": "thread_abc123",
 *   "object": "thread.deleted",
 *   "deleted": true
 * }
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface DeleteThreadProps {
  /**
   * The ID of the thread to delete.
   */
  threadId: string;
}

export interface DeleteThreadResponseData {
  id: string;
  object: "thread.deleted";
  deleted: boolean;
}

export interface DeleteThreadResponse extends HttpProxyResponse {
  data: DeleteThreadResponseData;
}

export const deleteThread =
  (self: OpenAI) =>
  async (props: DeleteThreadProps): Promise<DeleteThreadResponse> => {
    const { threadId } = props;

    return self.delete({
      url: `/threads/${threadId}`,
    });
  };
