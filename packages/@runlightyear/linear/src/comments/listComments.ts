import { PaginationOrderBy } from "../types/PaginationOrderBy";
import { CommentFilter } from "../types/CommentFilter";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { DateTime } from "../types/DateTime";
import { ID } from "../types/ID";
import { Linear } from "../Linear";
import { PageInfo } from "../types/PageInfo";
import { CommentResponse, commentResponseFields } from "./CommentResponse";

export interface ListCommentsProps {
  /**
   * Filter returned comments.
   */
  filter: CommentFilter;

  /**
   * A cursor to be used with last for backward pagination.
   */
  before: string;

  /**
   * A cursor to be used with first for forward pagination
   */
  after: string;

  /**
   * The number of items to forward paginate (used with after). Defaults to 50.
   */
  first: number;

  /**
   * The number of items to backward paginate (used with before). Defaults to 50.
   */
  last: number;

  /**
   * Should archived resources be included (default: false)
   */
  includeArchived: boolean;

  /**
   * By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
   */
  orderBy: PaginationOrderBy;
}

const query = `
query ListComments($filter: CommentFilter, $before: String, $after: String, $first: Int, $last: Int, $includeArchived: Boolean, $orderBy: PaginationOrderBy) {
  comments(filter: $filter, before: $before, after: $after, first: $first, last: $last, includeArchived: $includeArchived, orderBy: $orderBy) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      ${commentResponseFields}
    }
  }
}
`;

export interface ListCommentsResponse extends HttpProxyResponse {
  data: {
    pageInfo: PageInfo;
    comments: Array<CommentResponse>;
  };
}

export const listComments =
  (self: Linear) =>
  async (props: ListCommentsProps): Promise<ListCommentsResponse> => {
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
        comments: response.data.data.comments.nodes,
      },
    };
  };
