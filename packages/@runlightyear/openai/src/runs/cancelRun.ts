/**
 * Cancel a runBeta
 * POST
 *
 * https://api.openai.com/v1/threads/{thread_id}/runs/{run_id}/cancel
 *
 * Cancels a run that is in_progress.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread to which this run belongs.
 *
 * run_id
 * string
 * Required
 * The ID of the run to cancel.
 *
 * Returns
 * The modified run object matching the specified ID.
 */
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Run } from "../types/Run";
import { OpenAI } from "../OpenAI";

export interface CancelRunProps {
  /**
   * The ID of the thread to which this run belongs.
   */
  threadId: string;
  /**
   * The ID of the run to cancel.
   */
  runId: string;
}

export interface CancelRunResponse extends HttpProxyResponse {
  data: Run;
}

export const cancelRun =
  (self: OpenAI) =>
  async (props: CancelRunProps): Promise<CancelRunResponse> => {
    const { threadId, runId } = props;

    return self.post({
      url: `/threads/${threadId}/runs/${runId}/cancel`,
    });
  };
