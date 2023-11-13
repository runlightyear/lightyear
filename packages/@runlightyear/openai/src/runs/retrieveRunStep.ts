/**
 * Retrieve run stepBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}/runs/{run_id}/steps/{step_id}
 *
 * Retrieves a run step.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to which the run and run step belongs.
 *
 * run_id
 * string
 * Required
 * The ID of the run to which the run step belongs.
 *
 * step_id
 * string
 * Required
 * The ID of the run step to retrieve.
 *
 * Returns
 * The run step object matching the specified ID.
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { RunStep } from "../types/RunStep";
import { OpenAI } from "../OpenAI";

export interface RetrieveRunStepProps {
  /**
   * The ID of the thread to which the run and run step belongs.
   */
  threadId: string;
  /**
   * The ID of the run to which the run step belongs.
   */
  runId: string;
  /**
   * The ID of the run step to retrieve.
   */
  stepId: string;
}

export interface RetrieveRunStepResponse extends HttpProxyResponse {
  data: RunStep;
}

export const retrieveRunStep =
  (self: OpenAI) =>
  async (props: RetrieveRunStepProps): Promise<RetrieveRunStepResponse> => {
    const { threadId, runId, stepId } = props;

    return self.get({
      url: `/threads/${threadId}/runs/${runId}/steps/${stepId}`,
    });
  };
