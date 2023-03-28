import { DateTime } from "../types/DateTime";
import { ID } from "../types/ID";

export const teamResponseFields = `
activeCycle {
  id
  name
}
archivedAt
autoArchivePeriod
autoClosePeriod
autoCloseStateId
color
createdAt
cycleCalenderUrl
cycleCooldownTime
cycleDuration
cycleIssueAutoAssignCompleted
cycleIssueAutoAssignStarted
cycleLockToActive
cycleStartDay
cyclesEnabled
defaultIssueEstimate
defaultIssueState {
  id
  name
}
defaultTemplateForMembers {
  id
  name
}
defaultTemplateForNonMembers {
  id
  name
}
description
draftWorkflowState {
  id
  name
}
groupIssueHistory
icon
id
inviteHash
issueEstimationAllowZero
issueEstimationExtended
issueEstimationType
issueOrderingNoPriorityFirst
issueSortOrderDefaultToBottom
key
markedAsDuplicateWorkflowState{
  id
  name
}
name
organization {
  id
  name
}
private
requirePriorityToLeaveTriage
reviewWorkflowState {
  id
  name
}
startWorkflowState {
  id
  name
}
timezone
triageEnabled
triageIssueState {
  id
  name
}
upcomingCycleCount
updatedAt
`;

export interface TeamResponse {
  /**
   * Team's currently active cycle.
   */
  activeCycle: {
    id: ID;
    name: string;
  };

  /**
   * The time at which the entity was archived. Null if the entity has not been archived.
   */
  archivedAt: DateTime;

  /**
   * Period after which automatically closed and completed issues are automatically archived in months.
   */
  autoArchivePeriod: number;

  /**
   * Period after which issues are automatically closed in months. Null/undefined means disabled.
   */
  autoClosePeriod: number;

  /**
   * The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state.
   */
  autoCloseStateId: string;

  /**
   * The team's color.
   */
  color: string;

  /**
   * The time at which the entity was created.
   */
  createdAt: DateTime;

  /**
   * Calendar feed URL (iCal) for cycles.
   */
  cycleCalenderUrl: string;

  /**
   * The cooldown time after each cycle in weeks.
   */
  cycleCooldownTime: number;

  /**
   * The duration of a cycle in weeks.
   */
  cycleDuration: number;

  /**
   * Auto assign completed issues to current cycle.
   */
  cycleIssueAutoAssignCompleted: boolean;

  /**
   * Auto assign started issues to current cycle.
   */
  cycleIssueAutoAssignStarted: boolean;

  /**
   * Only allow issues issues with cycles in Active Issues.
   */
  cycleLockToActive: boolean;

  /**
   * The day of the week that a new cycle starts.
   */
  cycleStartDay: number;

  /**
   * Whether the team uses cycles.
   */
  cyclesEnabled: boolean;

  /**
   * What to use as an default estimate for unestimated issues.
   */
  defaultIssueEstimate: number;

  /**
   * The default workflow state into which issues are set when they are opened by team members.
   */
  defaultIssueState: {
    id: ID;
    name: string;
  };

  /**
   * The default template to use for new issues created by members of the team.
   */
  defaultTemplateForMembers: {
    id: ID;
    name: string;
  };

  /**
   * The default template to use for new issues created by non-members of the team.
   */
  defaultTemplateForNonMembers: {
    id: ID;
    name: string;
  };

  /**
   * The team's description.
   */
  description: string;

  /**
   * The workflow state into which issues are moved when a PR has been opened as draft.
   */
  draftWorkflowState: {
    id: ID;
    name: string;
  };

  /**
   * Whether to group recent issue history entries.
   */
  groupIssueHistory: boolean;

  /**
   * The icon of the team.
   */
  icon: string;

  /**
   * The unique identifier of the entity.
   */
  id: ID;

  /**
   * Unique hash for the team to be used in invite URLs.
   */
  inviteHash: string;

  /**
   * Whether to allow zeros in issues estimates.
   */
  issueEstimationAllowZero: boolean;

  /**
   * Whether to add additional points to the estimate scale.
   */
  issueEstimationExtended: boolean;

  /**
   * The issue estimation type to use.
   */
  issueEstimationType: string;

  /**
   * Whether issues without priority should be sorted first.
   */
  issueOrderingNoPriorityFirst: boolean;

  /**
   * Whether to move issues to bottom of the column when changing state.
   */
  issueSortOrderDefaultToBottom: boolean;

  /**
   * The team's unique key. The key is used in URLs.
   */
  key: string;

  /**
   * The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state.
   */
  markedAsDuplicateWorkflowState: {
    id: ID;
    name: string;
  };

  /**
   * The workflow state into which issues are moved when a PR has been merged.
   */
  mergeWorkflowState: {
    id: ID;
    name: string;
  };

  /**
   * The team's name.
   */
  name: string;

  /**
   * The organization that the team is associated with.
   */
  organization: {
    id: ID;
    name: string;
  };

  /**
   * Whether the team is private or not.
   */
  private: boolean;

  /**
   * Whether an issue needs to have a priority set before leaving triage
   */
  requirePriorityToLeaveTriage: boolean;

  /**
   * The workflow state into which issues are moved when a review has been requested for the PR.
   */
  reviewWorkflowState: {
    id: ID;
    name: string;
  };

  /**
   * The workflow state into which issues are moved when a PR has been opened.
   */
  startWorkflowState: {
    id: ID;
    name: string;
  };

  /**
   * The timezone of the team. Defaults to "America/Los_Angeles"
   */
  timezone: string;

  /**
   * Whether triage mode is enabled for the team or not.
   */
  triageEnabled: boolean;

  /**
   * The workflow state into which issues are set when they are opened by non-team members or integrations if triage is enabled.
   */
  triageIssueState: {
    id: ID;
    name: string;
  };

  /**
   * How many upcoming cycles to create.
   */
  upcomingCycleCount: number;

  /**
   *   The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't been updated after creation.
   */
  updatedAt: DateTime;
}
