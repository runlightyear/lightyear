import { GitHub } from "../GitHub";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { User } from "../types/User";

export interface SearchUsersProps {
  /**
   * The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching users" for a detailed list of qualifiers.
   */
  q: string;

  /**
   * Sorts the results of your query by number of followers or repositories, or when the person joined GitHub. Default: best match
   *
   * Can be one of: followers, repositories, joined
   */
  sort?: "followers" | "repositories" | "joined";

  /**
   * Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort.
   *
   * Default: desc
   *
   * Can be one of: desc, asc
   */
  order?: "asc" | "desc";

  /**
   * The number of results per page (max 100).
   *
   * Default: 30
   */
  perPage?: number;

  /**
   * Page number of the results to fetch.
   *
   * Default: 1
   */
  page?: string;
}

export interface SearchUsersResponse extends HttpProxyResponse {
  data: {
    totalCount: 12;
    incompleteResults: false;
    items: Array<User>;
  };
}

export const searchUsers =
  (self: GitHub) =>
  async (props: SearchUsersProps): Promise<SearchUsersResponse> => {
    const { q, sort, order, perPage, page } = props;

    return self.post({
      url: `/search/users`,
      params: {
        q,
        sort,
        order,
        perPage,
        page,
      },
    });
  };
