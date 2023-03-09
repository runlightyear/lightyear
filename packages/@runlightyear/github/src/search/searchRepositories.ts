import { GitHub } from "../GitHub";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { User } from "../types/User";

export interface SearchRepositoriesProps {
  /**
   * The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching for repositories" for a detailed list of qualifiers.
   */
  q: string;

  /**
   * Sorts the results of your query by number of stars, forks, or help-wanted-issues or how recently the items were updated. Default: best match
   *
   * Can be one of: stars, forks, help-wanted-issues, updated
   */
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";

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
  page?: number;
}

export interface SearchRepositoriesResponse extends HttpProxyResponse {
  data: {
    totalCount: number;
    incompleteResults: boolean;
    items: Array<{
      id: number;
      nodeId: string;
      name: string;
      fullName: string;
      owner: User;
      private: boolean;
      htmlUrl: string;
      description: string;
      fork: boolean;
      url: string;
      createdAt: string;
      updatedAt: string;
      pushedAt: string;
      homepage: string;
      size: number;
      stargazersCount: number;
      watchersCount: number;
      language: string;
      forksCount: number;
      openIssuesCount: number;
      masterBranch: string;
      defaultBranch: string;
      score: number;
      archiveUrl: string;
      assigneesUrl: string;
      blobsUrl: string;
      branchesUrl: string;
      collaboratorsUrl: string;
      commentsUrl: string;
      commitsUrl: string;
      compareUrl: string;
      contentsUrl: string;
      contributorsUrl: string;
      deploymentsUrl: string;
      downloadsUrl: string;
      eventsUrl: string;
      forksUrl: string;
      gitCommitsUrl: string;
      gitRefsUrl: string;
      gitTagsUrl: string;
      gitUrl: string;
      issueCommentUrl: string;
      issueEventsUrl: string;
      issuesUrl: string;
      keysUrl: string;
      labelsUrl: string;
      languagesUrl: string;
      mergesUrl: string;
      milestonesUrl: string;
      notificationsUrl: string;
      pullsUrl: string;
      releasesUrl: string;
      sshUrl: string;
      stargazersUrl: string;
      statusesUrl: string;
      subscribersUrl: string;
      subscriptionUrl: string;
      tagsUrl: string;
      teamsUrl: string;
      treesUrl: string;
      cloneUrl: string;
      mirrorUrl: string;
      hooksUrl: string;
      svnUrl: string;
      forks: number;
      openIssues: number;
      watchers: number;
      hasIssues: boolean;
      hasProjects: boolean;
      hasPages: boolean;
      hasWiki: boolean;
      hasDownloads: boolean;
      archived: boolean;
      disabled: boolean;
      visibility: string;
      license: {
        key: string;
        name: string;
        url: string;
        spdxId: string;
        nodeId: string;
        htmlUrl: string;
      };
    }>;
  };
}

export const searchRepositories =
  (self: GitHub) =>
  async (
    props: SearchRepositoriesProps
  ): Promise<SearchRepositoriesResponse> => {
    const { q, sort, order, perPage, page } = props;

    return self.post({
      url: `/search/repositories`,
      params: {
        q,
        sort,
        order,
        perPage,
        page,
      },
    });
  };
