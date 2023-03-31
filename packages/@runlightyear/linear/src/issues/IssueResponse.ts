import { DateTime } from "../types/DateTime";
import { LinearID } from "../types/LinearID";
import { TimelessDate } from "../types/TimelessDate";

export const issueResponseFields = `
archivedAt
assignee {
  id
  name
}
autoArchivedAt
autoClosedAt
branchName
canceledAt
completedAt
createdAt
creator {
  id
  name
}
customerTicketCount
cycle {
  id
  name
}
description
dueDate
estimate
externalUserCreator {
  id
  name
}
id
identifier
number
parent {
  id
  title
}
previousIdentifiers
priority
priorityLabel
project {
  id
  name
}
projectMilestone {
  id
  name
}
snoozedBy {
  id
  name
}
snoozedUntilAt
sortOrder
startedAt
startedTriageAt
state {
  id
  name
}
subIssueSortOrder
team {
  id
  name
}
title
trashed
triagedAt
updatedAt
url
`;

export interface IssueResponse {
  /**
   * The time at which the entity was archived. Null if the entity has not been archived.
   */
  archivedAt: DateTime;

  /**
   * The user to whom the issue is assigned to.
   */
  assignee: {
    id: LinearID;
    name: string;
  };

  /**
   * The time at which the issue was automatically archived by the auto pruning process.
   */
  autoArchivedAt: DateTime;

  /**
   * The time at which the issue was automatically closed by the auto pruning process.
   */
  autoClosedAt: DateTime;

  /**
   * Suggested branch name for the issue.
   */
  branchName: string;

  /**
   * The time at which the issue was moved into canceled state.
   */
  canceledAt: DateTime;

  /**
   * The time at which the issue was moved into completed state.
   */
  completedAt: DateTime;

  /**
   * The time at which the entity was created.
   */
  createdAt: DateTime;

  /**
   * The user who created the issue.
   */
  creator: {
    id: LinearID;
    name: string;
  };

  /**
   * Returns the number of Attachment resources which are created by customer support ticketing systems (e.g. Zendesk).
   */
  customerTicketCount: number;

  /**
   * The cycle that the issue is associated with.
   */
  cycle: {
    id: LinearID;
    name: string;
  };

  /**
   * The issue's description in markdown format.
   */
  description: String;

  /**
   * The date at which the issue is due.
   */
  dueDate: TimelessDate;

  /**
   * The estimate of the complexity of the issue.
   */
  estimate: number;

  /**
   * [ALPHA] The external user who created the issue.
   */
  externalUserCreator: {
    id: LinearID;
    name: string;
  };

  /**
   * The unique identifier of the entity.
   */
  id: LinearID;

  /**
   * Issue's human readable identifier (e.g. ENG-123).
   */
  identifier: string;

  /**
   * The issue's unique number.
   */
  number: number;

  /**
   * The parent of the issue.
   */
  parent: {
    id: LinearID;
    title: string;
  };

  /**
   * Previous identifiers of the issue if it has been moved between teams.
   */
  previousIdentifiers: Array<string>;

  /**
   * The priority of the issue.
   */
  priority: number;

  /**
   * Label for the priority.
   */
  priorityLabel: string;

  /**
   * The project that the issue is associated with.
   */
  project: {
    id: LinearID;
    name: string;
  };

  /**
   * [ALPHA] The projectMilestone that the issue is associated with.
   */
  projectMilestone: {
    id: LinearID;
    name: string;
  };

  /**
   * The user who snoozed the issue.
   */
  snoozedBy: {
    id: LinearID;
    name: string;
  };

  /**
   * The time until an issue will be snoozed in Triage view.
   */
  snoozedUntilAt: DateTime;

  /**
   * The order of the item in relation to other items in the organization.
   */
  sortOrder: number;

  /**
   * The time at which the issue was moved into started state.
   */
  startedAt: DateTime;

  /**
   * The time at which the issue entered triage.
   */
  startedTriageAt: DateTime;

  /**
   * The workflow state that the issue is associated with.
   */
  state: {
    id: LinearID;
    name: string;
  };

  /**
   * The order of the item in the sub-issue list. Only set if the issue has a parent.
   */
  subIssueSortOrder: number;

  /**
   * The team that the issue is associated with.
   */
  team: {
    id: LinearID;
    name: string;
  };

  /**
   * The issue's title.
   */
  title: string;

  /**
   * A flag that indicates whether the issue is in the trash bin.
   */
  trashed: boolean;

  /**
   * The time at which the issue left triage.
   */
  triagedAt: DateTime;

  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't been updated after creation.
   */
  updatedAt: DateTime;

  /**
   * Issue URL.
   */
  url: string;
}
