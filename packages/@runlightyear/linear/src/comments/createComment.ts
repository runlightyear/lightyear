import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";

export interface CreateCommentProps {
  /**
   * The comment content in markdown format.
   */
  body?: string;

  /**
   * The comment content as a Prosemirror document.
   */
  bodyData?: object;

  /**
   * Create comment as a user with the provided name. This option is only available to OAuth applications creating comments in actor=application mode.
   */
  createAsUser?: string;

  /**
   * The date when the comment was created (e.g. if importing from another system). Must be a date in the past. If none is provided, the backend will generate the time as now.
   */
  createdAt?: string;

  /**
   * Provide an external user avatar URL. Can only be used in conjunction with the createAsUser options. This option is only available to OAuth applications creating comments in actor=application mode.
   */
  displayIconUrl?: string;

  /**
   * Flag to prevent auto subscription to the issue the comment is created on.
   */
  doNotSubscribeToIssue?: boolean;

  /**
   * The identifier in UUID v4 format. If none is provided, the backend will generate one.
   */
  id?: string;

  /**
   * The issue to associate the comment with.
   */
  issueId: string;

  /**
   * The parent comment under which to nest a current comment.
   */
  parentId?: string;
}

const query = `
mutation CommentCreate($input: CommentCreateInput!) {
  commentCreate(input: $input) {
    comment {
      id
    }    
  }
}
`;

export interface CreateCommentResponse extends HttpProxyResponse {
  data: {
    comment: {
      id: string;
    };
  };
}

export const createComment =
  (self: Linear) =>
  async (props: CreateCommentProps): Promise<CreateCommentResponse> => {
    const {
      body,
      bodyData,
      createAsUser,
      createdAt,
      displayIconUrl,
      doNotSubscribeToIssue,
      id,
      issueId,
      parentId,
    } = props;

    return self.execute({
      query,
      variables: {
        input: {
          body,
          bodyData,
          createAsUser,
          createdAt,
          displayIconUrl,
          doNotSubscribeToIssue,
          id,
          issueId,
          parentId,
        },
      },
    });
  };
