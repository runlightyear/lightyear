import { GitHub } from "../GitHub";
import { Commit } from "../types/Commit";
import { User } from "../types/User";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface CompareTwoCommitsProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;

  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;

  /**
   * The base branch and head branch to compare. This parameter expects the format BASE...HEAD. Both must be branch names in repo. To compare with a branch that exists in a different repository in the same network as repo, the basehead parameter expects the format USERNAME:BASE...USERNAME:HEAD.
   */
  basehead: string;

  /**
   * Page number of the results to fetch.
   *
   * Default: 1
   */
  page?: number;

  /**
   * The number of results per page (max 100).
   *
   * Default: 30
   */
  perPage?: number;
}

export interface CompareTwoCommitsResponseData {
  url: string;
  htmlUrl: string;
  permalinkUrl: string;
  diffUrl: string;
  patchUrl: string;
  baseCommit: Commit;
  mergeBaseCommit: Commit;
  status: string;
  aheadBy: number;
  behindBy: number;
  totalCommits: number;
  commits: Array<Commit>;
  files: Array<{
    sha: string;
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    blobUrl: string;
    rawUrl: string;
    contentsUrl: string;
    patch: string;
  }>;
}

export interface CompareTwoCommitsResponse extends HttpProxyResponse {
  data: CompareTwoCommitsResponseData;
}

export const compareTwoCommits =
  (self: GitHub) =>
  async (props: CompareTwoCommitsProps): Promise<CompareTwoCommitsResponse> => {
    const { owner, repo, basehead, page, perPage } = props;

    return await self.get({
      url: `/repos/${owner}/${repo}/compare/${basehead}`,
      params: {
        page,
        per_page: perPage,
      },
    });
  };
