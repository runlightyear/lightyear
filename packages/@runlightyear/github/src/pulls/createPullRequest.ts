import { Github } from "../Github";

export interface CreatePullRequestOptions {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * The title of the new pull request. Required unless issue is specified.
   */
  title?: string;
  /**
   * The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace head with a user like this: username:branch.
   */
  head: string;
  /**
   * The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.
   */
  base: string;
  /**
   * The contents of the pull request.
   */
  body?: string;
  /**
   * Indicates whether maintainers can modify the pull request.
   */
  maintainerCanModify?: boolean;
  /**
   * Indicates whether the pull request is a draft. See "Draft Pull Requests" in the GitHub Help documentation to learn more.
   */
  draft?: boolean;
  /**
   * An issue in the repository to convert to a pull request. The issue title, body, and comments will become the title, body, and comments on the new pull request. Required unless title is specified.
   */
  issue?: number;
}

const createPullRequest =
  (self: Github) => async (options: CreatePullRequestOptions) => {
    const {
      owner,
      repo,
      title,
      head,
      base,
      body,
      maintainerCanModify,
      draft,
      issue,
    } = options;

    return await self.post({
      url: `/repos/${owner}/${repo}/pulls`,
      data: {
        title,
        head,
        base,
        body,
        maintainerCanModify,
        draft,
        issue,
      },
    });
  };

export default createPullRequest;
