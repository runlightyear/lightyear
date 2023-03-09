import { GitHub } from "../GitHub";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { User } from "../types/User";

export interface SearchIssuesAndPullRequestsProps {
  /**
   * The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching issues and pull requests" for a detailed list of qualifiers.
   */
  q: string;

  /**
   * Sorts the results of your query by the number of comments, reactions, reactions-+1, reactions--1, reactions-smile, reactions-thinking_face, reactions-heart, reactions-tada, or interactions. You can also sort results by how recently the items were created or updated, Default: best match
   *
   * Can be one of: comments, reactions, reactions-+1, reactions--1, reactions-smile, reactions-thinking_face, reactions-heart, reactions-tada, interactions, created, updated
   */
  sort?:
    | "comments"
    | "reactions"
    | "reactions-+1"
    | "reactions--1"
    | "reactions-smile"
    | "reactions-thinking_face"
    | "reactions-heart"
    | "reactions-tada"
    | "interactions"
    | "created"
    | "updated";

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

export interface SearchIssuesAndPullRequestsResponse extends HttpProxyResponse {
  data: {
    totalCount: number;
    incompleteResults: boolean;
    items: Array<{
      url: string;
      repositoryUrl: string;
      labelsUrl: string;
      commentsUrl: string;
      eventsUrl: string;
      htmlUrl: string;
      id: number;
      nodeId: string;
      number: number;
      title: string;
      user: User;
      labels: Array<{
        id: number;
        nodeId: string;
        url: string;
        name: string;
        color: string;
      }>;
      state: string;
      assignee: null;
      milestone: {
        url: string;
        htmlUrl: string;
        labelsUrl: string;
        id: number;
        nodeId: string;
        number: number;
        state: string;
        title: string;
        description: string;
        creator: User;
        openIssues: number;
        closedIssues: number;
        createdAt: string;
        updatedAt: string;
        closedAt: string;
        dueOn: string;
      };
      comments: number;
      createdAt: string;
      updatedAt: string;
      closedAt: string;
      pullRequest: {
        url: string;
        htmlUrl: string;
        diffUrl: string;
        patchUrl: string;
      };
      body: string;
      score: number;
      locked: boolean;
      authorAssociation: string;
      stateReason: string;
    }>;
  };
}

/**
 *
 * @param self
 */

export const searchIssuesAndPullRequests =
  (self: GitHub) =>
  async (
    props: SearchIssuesAndPullRequestsProps
  ): Promise<SearchIssuesAndPullRequestsResponse> => {
    const { q, sort, order, perPage, page } = props;

    return self.post({
      url: `/search/issues`,
      params: {
        q,
        sort,
        order,
        perPage,
        page,
      },
    });
  };
