import { GitHub } from "../GitHub";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { User } from "../types/User";

export interface CreateIssueCommentProps {
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
   * The contents of the comment.
   */
  body: string;
}

export interface CreateIssueCommentResponse extends HttpProxyResponse {
  data: {
    id: number;
    nodeId: string;
    url: string;
    htmlUrl: string;
    body: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    issueUrl: string;
    authorAssociation: string;
  };
}

export const createIssueComment =
  (self: GitHub) =>
  async (
    props: CreateIssueCommentProps
  ): Promise<CreateIssueCommentResponse> => {
    const { owner, repo, issueNumber, body } = props;

    return self.post({
      url: `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      data: {
        body,
      },
    });
  };
