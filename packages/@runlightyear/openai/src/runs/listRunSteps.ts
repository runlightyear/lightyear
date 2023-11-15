/**
 * List run stepsBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}/runs/{run_id}/steps
 *
 * Returns a list of run steps belonging to a run.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread the run and run steps belong to.
 *
 * run_id
 * string
 * Required
 * The ID of the run the run steps belong to.
 *
 * Query parameters
 * limit
 * integer
 * Optional
 * Defaults to 20
 * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
 *
 * order
 * string
 * Optional
 * Defaults to desc
 * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
 *
 * after
 * string
 * Optional
 * A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.
 *
 * before
 * string
 * Optional
 * A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.
 *
 * Returns
 * A list of run step objects.
 *
 */
import { RunStep } from "../types/RunStep";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ListRunStepsProps {
  /**
   * The ID of the thread the run and run steps belong to.
   */
  threadId: string;
  /**
   * The ID of the run the run steps belong to.
   */
  runId: string;
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
   */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   */
  order?: "asc" | "desc";
  /**
   * A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

export interface ListRunStepsResponseData {
  object: "list";
  data: RunStep[];
  firstId: string;
  lastId: string;
  hasMore: boolean;
}

export interface ListRunStepsResponse extends HttpProxyResponse {
  data: ListRunStepsResponseData;
}

export const listRunSteps =
  (self: OpenAI) =>
  async (props: ListRunStepsProps): Promise<ListRunStepsResponse> => {
    const { threadId, runId, limit, order, after, before } = props;

    return self.get({
      url: `/threads/${threadId}/runs/${runId}/steps`,
      params: {
        limit,
        order,
        after,
        before,
      },
    });
  };
