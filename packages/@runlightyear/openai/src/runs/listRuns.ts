/**
 * List runsBeta
 * GET
 *
 * https://api.openai.com/v1/threads/{thread_id}/runs
 *
 * Returns a list of runs belonging to a thread.
 *
 * Path parameters
 * thread_id
 * string
 * Required
 * The ID of the thread the run belongs to.
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
 * A list of run objects.
 */
import { Run } from "../types/Run";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface ListRunsProps {
  /**
   * The ID of the thread the run belongs to.
   */
  threadId: string;
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

export interface ListRunsResponseData {
  /**
   * The object type, which is always list.
   */
  object: "list";
  /**
   * The list of runs.
   */
  data: Run[];
  /**
   * The ID of the first object in data.
   */
  firstId: string;
  /**
   * The ID of the last object in data.
   */
  lastId: string;
  hasMore: boolean;
}

export interface ListRunsResponse extends HttpProxyResponse {
  data: ListRunsResponseData;
}

export const listRuns =
  (self: OpenAI) =>
  async (props: ListRunsProps): Promise<ListRunsResponse> => {
    const { threadId, limit, order, after, before } = props;

    return self.get({
      url: `/threads/${threadId}/runs`,
      params: {
        limit,
        order,
        after,
        before,
      },
    });
  };
