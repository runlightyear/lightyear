import { Github } from "../Github";

export interface CreateIssueOptions {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * The title of the issue.
   */
  title: string;
  /**
   * The contents of the issue.
   */
  body?: string;
  /**
   * The number of the milestone to associate this issue with.
   *
   * NOTE: Only users with push access can set the milestone for new issues. The milestone is silently dropped otherwise.
   */
  milestone?: string | number | null;
  /**
   * Labels to associate with this issue.
   *
   * NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise.
   */
  labels?: Array<string> | Array<object>;
  /**
   * Logins for Users to assign to this issue.
   *
   * NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise.
   */
  assignees?: Array<string>;
}

const createIssue = (self: Github) => async (options: CreateIssueOptions) => {
  const { owner, repo, title, milestone, labels, assignees } = options;

  return await self.post({
    url: `/repos/${owner}/${repo}/issues`,
    data: {
      title,
      milestone,
      labels,
      assignees,
    },
  });
};

export default createIssue;
