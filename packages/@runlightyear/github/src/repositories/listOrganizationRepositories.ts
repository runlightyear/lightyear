import { GitHub } from "../GitHub";

export interface ListOrganizationRepositoriesProps {
  /**
   * The organization name. The name is not case sensitive.
   */
  org: string;
  /**
   * Specifies the types of repositories you want returned. If your organization is associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+, type can also be internal. However, the internal value is not yet supported when a GitHub App calls this API with an installation access token.
   */
  type?:
    | "all"
    | "public"
    | "private"
    | "forks"
    | "sources"
    | "member"
    | "internal";
  /**
   * The property to sort the results by.
   *
   * Default: created
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

const listOrganizationRepositories =
  (self: GitHub) => async (props: ListOrganizationRepositoriesProps) => {
    const { org, type, sort, direction, perPage, page } = props;

    return await self.get({
      url: `/orgs/${org}/repos`,
      params: {
        type,
        sort,
        direction,
        per_page: perPage,
        page,
      },
    });
  };

export default listOrganizationRepositories;
