/**
 * Create runBeta
 * POST
 *
 * https://api.openai.com/v1/threads/{thread_id}/runs
 *
 * Create a run.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to run.
 *
 * Request body
 * assistant_id
 * string
 * Required
 * The ID of the assistant to use to execute this run.
 *
 * model
 * string or null
 * Optional
 * The ID of the Model to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.
 *
 * instructions
 * string or null
 * Optional
 * Override the default system message of the assistant. This is useful for modifying the behavior on a per-run basis.
 *
 * tools
 * array or null
 * Optional
 * Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.
 *
 *
 * Show possible types
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * A run object.
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
 *   const run = await openai.beta.threads.runs.create(
 *     "thread_abc123",
 *     { assistant_id: "asst_abc123" }
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
 *   "created_at": 1699063290,
 *   "assistant_id": "asst_abc123",
 *   "thread_id": "thread_abc123",
 *   "status": "queued",
 *   "started_at": 1699063290,
 *   "expires_at": null,
 *   "cancelled_at": null,
 *   "failed_at": null,
 *   "completed_at": 1699063291,
 *   "last_error": null,
 *   "model": "gpt-4",
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
 *   "metadata": {}
 * }
 */
import { Tool } from "../types/Tool";
import { Run } from "../types/Run";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface CreateRunProps {
  /**
   * The ID of the thread to run.
   */
  threadId: string;

  /**
   * The ID of the assistant to use to execute this run.
   */
  assistantId: string;

  /**
   * The ID of the Model to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.
   */
  model?: string;

  /**
   * Override the default system message of the assistant. This is useful for modifying the behavior on a per-run basis.
   */
  instructions?: string;

  /**
   * Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.
   */
  tools?: Tool[];

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
   */
  metadata?: Record<string, string>;
}

export interface CreateRunResponse extends HttpProxyResponse {
  data: Run;
}

export const createRun =
  (self: OpenAI) =>
  async (props: CreateRunProps): Promise<CreateRunResponse> => {
    const { threadId, assistantId, model, instructions, tools, metadata } =
      props;

    return self.post({
      url: `/threads/${threadId}/runs`,
      data: {
        assistant_id: assistantId,
        model,
        instructions,
        tools,
        metadata,
      },
    });
  };
