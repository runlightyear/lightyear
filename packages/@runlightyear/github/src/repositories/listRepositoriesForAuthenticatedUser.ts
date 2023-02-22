import { GitHub } from "../GitHub";

export interface ListRepositoriesForAuthenticatedUserProps {
  /**
   * Limit results to repositories with the specified visibility.
   *
   * Default: all
   */
  visibility: "all" | "public" | "private";
  /**
   * Array of values. Can include:
   *
   * owner: Repositories that are owned by the authenticated user.
   * collaborator: Repositories that the user has been added to as a collaborator.
   * organization_member: Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on.
   *
   * Default: owner,collaborator,organization_member
   */
  affiliation: Array<"owner" | "collaborator" | "organization_member">;
  /**
   * Limit results to repositories of the specified type. Will cause a 422 error if used in the same request as visibility or affiliation.
   *
   * Default: all
   */
  type: Array<"all" | "owner" | "public" | "private" | "member">;
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
   */
  perPage?: number;
  /**
   * Page number of the results to fetch.
   */
  page?: number;
  /**
   * Only show notifications updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  since?: string;
  /**
   * Only show notifications updated before the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  before?: string;
}

const listRepositoriesForAuthenticatedUser =
  (self: GitHub) =>
  async (props: ListRepositoriesForAuthenticatedUserProps) => {
    const {
      visibility,
      affiliation,
      type,
      sort,
      direction,
      perPage,
      page,
      since,
      before,
    } = props;

    return await self.get({
      url: `/user/repos`,
      params: {
        visibility,
        affiliation: affiliation && affiliation.join(","),
        type: type && type.join(","),
        sort,
        direction,
        per_page: perPage,
        page,
        since,
        before,
      },
    });
  };

export default listRepositoriesForAuthenticatedUser;
