import { WorkflowStateFilter } from "../types/WorkflowStateFilter";
import { PaginationOrderBy } from "../types/PaginationOrderBy";
import {
  CommentResponse,
  commentResponseFields,
} from "../comments/CommentResponse";
import {
  WorkflowStateResponse,
  workflowStateResponseFields,
} from "./WorkflowStateResponse";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { PageInfo } from "../types/PageInfo";
import { Linear } from "../Linear";

export interface ListWorkflowStatesProps {
  /**
   * Filter returned workflow states.
   */
  filter?: WorkflowStateFilter;

  /**
   * A cursor to be used with last for backward pagination.
   */
  before?: string;

  /**
   * A cursor to be used with first for forward pagination
   */
  after?: string;

  /**
   * The number of items to forward paginate (used with after). Defaults to 50.
   */
  first?: number;

  /**
   * The number of items to backward paginate (used with before). Defaults to 50.
   */
  last?: number;

  /**
   * Should archived resources be included (default: false)
   */
  includeArchived?: boolean;

  /**
   * By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
   */
  orderBy?: PaginationOrderBy;
}

const query = `
query ListWorkflowStates($filter: WorkflowStateFilter, $before: String, $after: String, $first: Int, $last: Int, $includeArchived: Boolean, $orderBy: PaginationOrderBy) {
  workflowStates(filter: $filter, before: $before, after: $after, first: $first, last: $last, includeArchived: $includeArchived, orderBy: $orderBy) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      ${workflowStateResponseFields}
    }
  }
}
`;

export interface ListWorkflowStatesResponse extends HttpProxyResponse {
  data: {
    pageInfo: PageInfo;
    workflowStates: Array<WorkflowStateResponse>;
  };
}

export const listWorkflowStates =
  (self: Linear) =>
  async (
    props?: ListWorkflowStatesProps
  ): Promise<ListWorkflowStatesResponse> => {
    const { filter, before, after, first, last, includeArchived, orderBy } =
      props || {};

    const response = await self.execute({
      query,
      variables: {
        filter,
        before,
        after,
        first,
        last,
        includeArchived,
        orderBy,
      },
    });

    return {
      ...response,
      data: {
        pageInfo: response.data.data.pageInfo,
        workflowStates: response.data.data.workflowStates.nodes,
      },
    };
  };
