import { PaginationOrderBy } from "../types/PaginationOrderBy";
import { UserFilter } from "../types/UserFilter";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { PageInfo } from "../types/PageInfo";
import { Linear } from "../Linear";
import { UserResponse, userResponseFields } from "./UserResponse";

export interface ListUsersProps {
  /**
   * Filter returned users.
   */
  filter?: UserFilter;

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
query ListComments($filter: UserFilter, $before: String, $after: String, $first: Int, $last: Int, $includeArchived: Boolean, $orderBy: PaginationOrderBy) {
  comments(filter: $filter, before: $before, after: $after, first: $first, last: $last, includeArchived: $includeArchived, orderBy: $orderBy) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      ${userResponseFields}
    }
  }
}
`;

export interface ListUsersResponse extends HttpProxyResponse {
  data: {
    pageInfo: PageInfo;
    users: Array<UserResponse>;
  };
}

export const listUsers =
  (self: Linear) =>
  async (props?: ListUsersProps): Promise<ListUsersResponse> => {
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
        users: response.data.data.users.nodes,
      },
    };
  };
