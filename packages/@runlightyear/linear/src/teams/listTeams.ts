import { Linear } from "../Linear";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { TeamFilter } from "../types/TeamFilter";
import { PaginationOrderBy } from "../types/PaginationOrderBy";
import { ID } from "../types/ID";

export interface ListTeamsProps {
  /**
   * Filter returned teams.
   */
  filter: TeamFilter;

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
query ListTeams($filter: CommentFilter, $before: String, $after: String, $first: Int, $last: Int, $includeArchived: Boolean, $orderBy: PaginationOrderBy) {
  teams(filter: $filter, before: $before, after: $after, first: $first, last: $last, includeArchived: $includeArchived, orderBy: $orderBy) {
    nodes {
      id
      name
    }
  }
}
`;

export interface ListTeamsResponse extends HttpProxyResponse {
  data: Array<{
    id: ID;
    name: string;
  }>;
}

export const listTeams =
  (self: Linear) =>
  async (props?: ListTeamsProps): Promise<ListTeamsResponse> => {
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

    return { ...response, data: response.data.data.teams.nodes };
  };
