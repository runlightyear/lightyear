/**
 * List assistantsBeta
 * GET
 *
 * https://api.openai.com/v1/assistants
 *
 * Returns a list of assistants.
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
 */
import { Assistant } from "../types/Assistant";
import { OpenAI } from "../OpenAI";

export interface ListAssistantsProps {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
   */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   */
  order?: string;
  /**
   * A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

export interface ListAssistantsResponseData {
  object: "list";
  data: Assistant[];
  firstId: string;
  lastId: string;
  hasMore: boolean;
}

export interface ListAssistantsResponse {
  data: ListAssistantsResponseData;
}

export const listAssistants =
  (self: OpenAI) =>
  async (props?: ListAssistantsProps): Promise<ListAssistantsResponse> => {
    const { limit, order, after, before } = props || {};

    return self.get({
      url: "/assistants",
      params: {
        limit,
        order,
        after,
        before,
      },
    });
  };
