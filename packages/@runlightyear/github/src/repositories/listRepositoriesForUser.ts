import { Github } from "../Github";

export interface ListRepositoriesForUserOptions {
  /**
   * The handle for the GitHub user account.
   */
  username: string;
  /**
   * Limit results to repositories of the specified type.
   *
   * Default: owner
   */
  type?: "all" | "owner" | "member";
  /**
   * The property to sort the results by.
   *
   * Default: full_name
   */
  sort?: "created" | "updated" | "pushed" | "full_name";
  /**
   * The order to sort by. Default: asc when using full_name, otherwise desc.
   */
  direction?: "asc" | "desc";
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
  page?: number;
}

const listRepositoriesForUser =
  (self: Github) => async (options: ListRepositoriesForUserOptions) => {
    const { username, type, sort, direction, perPage, page } = options;

    return await self.get({
      url: `/users/${username}/repos`,
      params: {
        type,
        sort,
        direction,
        per_page: perPage,
        page,
      },
    });
  };

export default listRepositoriesForUser;
