import { Linear } from "../Linear";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface CreateIssueProps {
  /**
   * The identifier of the user to assign the issue to.
   */
  assigneeId?: string;

  /**
   * The position of the issue in its column on the board view.
   */
  boardOrder?: number;

  /**
   * Create issue as a user with the provided name. This option is only available to OAuth applications creating issues in actor=application mode.
   */
  createAsUser?: string;

  /**
   *   The date when the issue was created (e.g. if importing from another system). Must be a date in the past. If none is provided, the backend will generate the time as now.
   */
  createdAt?: string;

  /**
   * The cycle associated with the issue.
   */
  cycleId?: string;

  /**
   * The issue description in markdown format.
   */
  description?: string;

  /**
   * The issue description as a Prosemirror document.
   */
  descriptionData?: object;

  /**
   * Provide an external user avatar URL. Can only be used in conjunction with the createAsUser options. This option is only available to OAuth applications creating comments in actor=application mode.
   */
  displayIconUrl?: string;

  /**
   * The date at which the issue is due.
   */
  dueDate?: string;

  /**
   * The estimated complexity of the issue.
   */
  estimate?: number;

  /**
   * The identifier in UUID v4 format. If none is provided, the backend will generate one.
   */
  id?: string;

  /**
   * The identifiers of the issue labels associated with this ticket.
   */
  labelIds?: string[];

  /**
   * The identifier of the parent issue.
   */
  parentId?: string;

  /**
   * The priority of the issue.
   */
  priority?: number;

  /**
   * The project associated with the issue.
   */
  projectId?: string;
  /**
   * The comment the issue is referencing.
   */

  referenceCommentId?: string;

  /**
   * The position of the issue related to other issues.
   */
  sortOrder?: number;

  /**
   * The team state of the issue.
   */
  stateId?: string;

  /**
   * The position of the issue in parent's sub-issue list.
   */
  subIssueSortOrder?: number;

  /**
   * The identifiers of the users subscribing to this ticket.
   */
  subscriberIds?: string[];

  /**
   * The identifier or key of the team associated with the issue.
   */
  teamId: string;

  /**
   * The title of the issue.
   */
  title: string;
}

export interface CreateIssueResponse extends HttpProxyResponse {
  data: {
    issue: {
      id: string;
    };
  };
}

const query = `
mutation IssueCreate($input: IssueCreateInput!) {
  issueCreate(input: $input) {
    issue {
      id
    }    
  }
}
`;

const createIssue =
  (self: Linear) =>
  async (props: CreateIssueProps): Promise<CreateIssueResponse> => {
    const {
      assigneeId,
      boardOrder,
      createAsUser,
      createdAt,
      cycleId,
      description,
      descriptionData,
      displayIconUrl,
      dueDate,
      estimate,
      id,
      labelIds,
      parentId,
      priority,
      projectId,
      referenceCommentId,
      sortOrder,
      stateId,
      subIssueSortOrder,
      subscriberIds,
      teamId,
      title,
    } = props;

    return self.execute({
      query,
      variables: {
        input: {
          assigneeId,
          boardOrder,
          createAsUser,
          createdAt,
          cycleId,
          description,
          descriptionData,
          displayIconUrl,
          dueDate,
          estimate,
          id,
          labelIds,
          parentId,
          priority,
          projectId,
          referenceCommentId,
          sortOrder,
          stateId,
          subIssueSortOrder,
          subscriberIds,
          teamId,
          title,
        },
      },
    });
  };
