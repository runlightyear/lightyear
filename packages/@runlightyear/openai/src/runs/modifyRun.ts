/**
 * Modify runBeta
 * POST
 *
 * https://api.openai.com/v1/threads/{thread_id}/runs/{run_id}
 *
 * Modifies a run.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread that was run.
 *
 * run_id
 * string
 * Required
 * The ID of the run to modify.
 *
 * Request body
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * The modified run object matching the specified ID.
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
 *   const run = await openai.beta.threads.runs.update(
 *     "thread_abc123",
 *     "run_abc123",
 *     {
 *       metadata: {
 *         user_id: "user_abc123",
 *       },
 *     }
 *   );
 *
 *   console.log(run);
 * }
 *
 * main();
 * Response
 * {
 *   "id": "run_abc123",
 *   "object": "thread.run",
 *   "created_at": 1699075072,
 *   "assistant_id": "asst_abc123",
 *   "thread_id": "thread_abc123",
 *   "status": "completed",
 *   "started_at": 1699075072,
 *   "expires_at": null,
 *   "cancelled_at": null,
 *   "failed_at": null,
 *   "completed_at": 1699075073,
 *   "last_error": null,
 *   "model": "gpt-3.5-turbo",
 *   "instructions": null,
 *   "tools": [
 *     {
 *       "type": "code_interpreter"
 *     }
 *   ],
 *   "file_ids": [
 *     "file-abc123",
 *     "file-abc456"
 *   ],
 *   "metadata": {
 *     "user_id": "user_abc123"
 *   }
 * }
 */
import { Run } from "../types/Run";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ModifyRunProps {
  /**
   * The ID of the thread that was run.
   */
  threadId: string;

  /**
   * The ID of the run to modify.
   */
  runId: string;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata?: Record<string, string>;
}

export interface ModifyRunResponse extends HttpProxyResponse {
  data: Run;
}

export const modifyRun =
  (self: OpenAI) =>
  async (props: ModifyRunProps): Promise<ModifyRunResponse> => {
    const { threadId, runId, metadata } = props;

    return self.post({
      url: `/threads/${threadId}/runs/${runId}`,
      data: {
        metadata,
      },
    });
  };
