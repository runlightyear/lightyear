import { Github } from "../Github";

export interface CreatePullRequestCommentProps {
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
   * The text of the review comment.
   */
  body: string;
  /**
   * The SHA of the commit needing a comment. Not using the latest commit SHA may render your comment outdated if a subsequent commit modifies the line you specify as the position.
   */
  commitId?: string;
  /**
   * The relative path to the file that necessitates a comment.
   */
  path?: string;
  /**
   * In a split diff view, the side of the diff that the pull request's changes appear on. Can be LEFT or RIGHT. Use LEFT for deletions that appear in red. Use RIGHT for additions that appear in green or unchanged lines that appear in white and are shown for context. For a multi-line comment, side represents whether the last line of the comment range is a deletion or addition. For more information, see "Diff view props" in the GitHub Help documentation.
   *
   * Can be one of: LEFT, RIGHT
   */
  side?: "LEFT" | "RIGHT";
  /**
   * The line of the blob in the pull request diff that the comment applies to. For a multi-line comment, the last line of the range that your comment applies to.
   */
  line: number;
  /**
   * Required when using multi-line comments unless using in_reply_to.
   *
   * The start_line is the first line in the pull request diff that your multi-line comment applies to. To learn more about multi-line comments, see "Commenting on a pull request" in the GitHub Help documentation.
   */
  startLine?: number;
  /**
   * Required when using multi-line comments unless using in_reply_to.
   *
   * The start_side is the starting side of the diff that the comment applies to. Can be LEFT or RIGHT. To learn more about multi-line comments, see "Commenting on a pull request" in the GitHub Help documentation. See side in this table for additional context.
   *
   * Can be one of: LEFT, RIGHT, side
   */
  startSide?: "LEFT" | "RIGHT" | "side";
  /**
   * The ID of the review comment to reply to. To find the ID of a review comment with "List review comments on a pull request". When specified, all parameters other than body in the request body are ignored.
   */
  inReplyTo?: number;
}

const createReviewCommentForPullRequest =
  (self: Github) => async (props: CreatePullRequestCommentProps) => {
    const {
      owner,
      repo,
      pullNumber,
      body,
      commitId,
      path,
      side,
      line,
      startLine,
      startSide,
      inReplyTo,
    } = props;

    return await self.post({
      url: `/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
      data: {
        body,
        commit_id: commitId,
        path,
        side,
        line,
        start_line: startLine,
        start_side: startSide,
        in_reply_to: inReplyTo,
      },
    });
  };

export default createReviewCommentForPullRequest;
