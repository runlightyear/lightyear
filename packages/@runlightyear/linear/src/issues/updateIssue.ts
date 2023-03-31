import { DateTime } from "../types/DateTime";
import { Linear } from "../Linear";
import { IssueResponse, issueResponseFields } from "./IssueResponse";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { LinearID } from "../types/LinearID";

export interface UpdateIssueProps {
  /**
   * The identifier of the user to assign the issue to.
   */
  assigneeId?: LinearID;

  /**
   * The position of the issue in its column on the board view.
   */
  boardOrder?: number;

  /**
   * The cycle associated with the issue.
   */
  cycleId?: LinearID;

  /**
   * The issue description in markdown format.
   */
  description?: string;

  /**
   * The issue description as a Prosemirror document.
   */
  descriptionData?: object;

  /**
   * The date at which the issue is due.
   */
  dueDate?: string;

  /**
   * The estimated complexity of the issue.
   */
  estimate?: number;

  /**
   * The identifier in UUID v4 format.
   */
  id: LinearID;

  /**
   * The identifiers of the issue labels associated with this ticket.
   */
  labelIds?: LinearID[];

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
  projectId?: LinearID;

  /**
   * The project milestone associated with the issue.
   */
  projectMilestoneId?: LinearID;

  /**
   * The identifier of the user who snoozed the issue.
   */
  snoozedById?: LinearID;

  /**
   * The time until an issue will be snoozed in Triage view.
   */
  snoozedUntilAt?: DateTime;

  /**
   * The position of the issue related to other issues.
   */
  sortOrder?: number;

  /**
   * The team state of the issue.
   */
  stateId?: LinearID;

  /**
   * The position of the issue in parent's sub-issue list.
   */
  subIssueSortOrder?: number;

  /**
   * The identifiers of the users subscribing to this ticket.
   */
  subscriberIds?: LinearID[];

  /**
   * The identifier or key of the team associated with the issue.
   */
  teamId?: LinearID;

  /**
   * The title of the issue.
   */
  title?: string;

  /**
   * Whether the issue has been trashed.
   */
  trashed?: boolean;
}

const query = `
mutation IssueUpdate($id: String!, $input: IssueUpdateInput!) {
  issueUpdate(id: $id, input: $input) {
    issue {
      ${issueResponseFields}
    }    
  }
}
`;

export interface UpdateIssueResponse extends HttpProxyResponse {
  data: IssueResponse;
}

export const updateIssue =
  (self: Linear) =>
  async (props: UpdateIssueProps): Promise<UpdateIssueResponse> => {
    const {
      assigneeId,
      boardOrder,
      cycleId,
      description,
      descriptionData,
      dueDate,
      estimate,
      id,
      labelIds,
      parentId,
      priority,
      projectId,
      projectMilestoneId,
      snoozedById,
      snoozedUntilAt,
      sortOrder,
      stateId,
      subIssueSortOrder,
      subscriberIds,
      teamId,
      title,
      trashed,
    } = props;

    const response = await self.execute({
      query,
      variables: {
        id,
        input: {
          assigneeId,
          boardOrder,
          cycleId,
          description,
          descriptionData,
          dueDate,
          estimate,
          labelIds,
          parentId,
          priority,
          projectId,
          projectMilestoneId,
          snoozedById,
          snoozedUntilAt,
          sortOrder,
          stateId,
          subIssueSortOrder,
          subscriberIds,
          teamId,
          title,
          trashed,
        },
      },
    });

    return { ...response, data: response.data.data.issueUpdate.issue };
  };
