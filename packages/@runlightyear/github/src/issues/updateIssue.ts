import { GitHub } from "../GitHub";

export interface UpdateIssueProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * The number that identifies the issue.
   */
  issueNumber: number;
  /**
   * The title of the issue.
   */
  title?: string | number | null;
  /**
   * The contents of the issue.
   */
  body?: string | null;
  /**
   * State of the issue.
   */
  state?: "open" | "closed";
  /**
   * The reason for the current state
   */
  stateReason?: "completed" | "not_planned" | "reopened" | null;
  /**
   * The number of the milestone to associate this issue with or null to remove current.
   *
   * NOTE: Only users with push access can set the milestone for issues. The milestone is silently dropped otherwise.
   */
  milestone?: string | number | null;
  /**
   * Labels to associate with this issue. Pass one or more Labels to replace the set of Labels on this Issue. Send an empty array ([]) to clear all Labels from the Issue.
   *
   * NOTE: Only users with push access can set labels for issues. Labels are silently dropped otherwise.
   */
  labels?: Array<string> | Array<object>;
  /**
   * Logins for Users to assign to this issue. Pass one or more user logins to replace the set of assignees on this Issue. Send an empty array ([]) to clear all assignees from the Issue.
   *
   * NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise.
   */
  assignees?: Array<string>;
}

const updateIssue = (self: GitHub) => async (props: UpdateIssueProps) => {
  const {
    owner,
    repo,
    issueNumber,
    title,
    body,
    state,
    milestone,
    labels,
    assignees,
  } = props;

  return await self.patch({
    url: `/repos/${owner}/${repo}/issues/${issueNumber}`,
    data: {
      title,
      body,
      state,
      milestone,
      labels,
      assignees,
    },
  });
};

export default updateIssue;
