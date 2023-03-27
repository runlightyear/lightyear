import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";
import { IssueFilter } from "../types/IssueFilter";
import { PageInfo } from "../types/PageInfo";
import { IssueResponse, issueResponseFields } from "./IssueResponse";

export interface ListIssuesProps {
  /**
   * Filter returned issues.
   */
  filter?: IssueFilter;

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
  orderBy?: "createdAt" | "updatedAt";
}

const query = `
query ListIssues($filter: IssueFilter, $before: String, $after: String, $first: Int, $last: Int, $includeArchived: Boolean, $orderBy: PaginationOrderBy) {
  issues(filter: $filter, before: $before, after: $after, first: $first, last: $last, includeArchived: $includeArchived, orderBy: $orderBy) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      ${issueResponseFields}
    }
  }
}
`;

export interface ListIssuesResponse extends HttpProxyResponse {
  data: {
    pageInfo: PageInfo;
    issues: Array<IssueResponse>;
  };
}

export const listIssues =
  (self: Linear) =>
  async (props?: ListIssuesProps): Promise<ListIssuesResponse> => {
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
        issues: response.data.data.issues.nodes,
      },
    };
  };
