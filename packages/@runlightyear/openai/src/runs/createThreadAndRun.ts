/**
 * Create thread and runBeta
 * POST
 *
 * https://api.openai.com/v1/threads/runs
 *
 * Create a thread and run it in one request.
 *
 * Request body
 * assistant_id
 * string
 * Required
 * The ID of the assistant to use to execute this run.
 *
 * thread
 * object
 * Optional
 *
 * Show properties
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
 * metadata
 * map
 * Optional
 * Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maxium of 512 characters long.
 *
 * Returns
 * A run object.
 */
import { ThreadMessageInput } from "../types/Thread";
import { Tool } from "../types/Tool";
import { Run } from "../types/Run";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface CreateThreadAndRunProps {
  /**
   * The ID of the assistant to use to execute this run.
   */
  assistantId: string;
  thread?: {
    messages?: ThreadMessageInput[];
    metadata?: Record<string, string>;
  };
  model?: string | null;
  instructions?: string | null;
  tools?: Tool[] | null;
  metadata?: Record<string, string>;
}

export interface CreateThreadAndRunResponse extends HttpProxyResponse {
  data: Run;
}

export const createThreadAndRun =
  (self: OpenAI) =>
  async (
    props: CreateThreadAndRunProps
  ): Promise<CreateThreadAndRunResponse> => {
    const { assistantId, thread, model, instructions, tools, metadata } = props;

    return self.post({
      url: "/threads/runs",
      data: {
        assistant_id: assistantId,
        thread,
        model,
        instructions,
        tools,
        metadata,
      },
    });
  };
