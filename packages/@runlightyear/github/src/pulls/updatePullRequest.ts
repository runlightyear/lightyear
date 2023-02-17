import { Github } from "../Github";

/**
 * This is a description of these props
 */
export interface UpdatePullRequestProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * The number that identifies the pull request.
   */
  pullNumber: number;
  /**
   * The title of the pull request.
   */
  title?: string;
  /**
   * The contents of the pull request.
   */
  body?: string;
  /**
   * State of this Pull Request. Either open or closed.
   */
  state?: "open" | "closed";
  /**
   * The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot update the base branch on a pull request to point to another repository.
   */
  base?: string;
  /**
   * Indicates whether maintainers can modify the pull request.
   */
  maintainerCanModify?: boolean;
}

const updatePullRequest =
  (self: Github) => async (props: UpdatePullRequestProps) => {
    const {
      owner,
      repo,
      pullNumber,
      title,
      body,
      state,
      base,
      maintainerCanModify,
    } = props;

    return await self.patch({
      url: `/repos/${owner}/${repo}/pulls/${pullNumber}`,
      data: {
        title,
        body,
        state,
        base,
        maintainerCanModify,
      },
    });
  };

export default updatePullRequest;
