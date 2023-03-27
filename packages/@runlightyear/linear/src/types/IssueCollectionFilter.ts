import { NullableUserFilter } from "./NullableUserFilter";
import { DateComparator } from "./DateComparator";
import { IssueFilter } from "./IssueFilter";
import { NullableStringComparator } from "./NullableStringComparator";
import { AttachmentCollectionFilter } from "./AttachmentCollectionFilter";
import { NumberComparator } from "./NumberComparator";
import { StringComparator } from "./StringComparator";
import { IDComparator } from "./IDComparator";
import { NullableDateComparator } from "./NullableDateComparator";
import { CommentCollectionFilter } from "./CommentCollectionFilter";
import { EstimateComparator } from "./EstimateComparator";
import { NullableIssueFilter } from "./NullableIssueFilter";
import { NullableCycleFilter } from "./NullableCycleFilter";
import { NullableNumberComparator } from "./NullableNumberComparator";
import { TeamFilter } from "./TeamFilter";
import { NullableTimelessDateComparator } from "./NullableTimelessDateComparator";
import { RelationExistsComparator } from "./RelationExistsComparator";
import { IssueLabelCollectionFilter } from "./IssueLabelCollectionFilter";
import { NullableProjectMilestoneFilter } from "./NullableProjectMilestoneFilter";
import { WorkflowStateFilter } from "./WorkflowStateFilter";
import { NullableProjectFilter } from "./NullableProjectFilter";
import { SlaStatusComparator } from "./SlaStatusComparator";
import { UserCollectionFilter } from "./UserCollectionFilter";

export interface IssueCollectionFilter {
  /**
   * Compound filters, all of which need to be matched by the issue.
   */
  and?: Array<IssueCollectionFilter>;

  /**
   * Filters that the issues assignee must satisfy.
   */
  assignee?: NullableUserFilter;

  /**
   * Filters that the issues attachments must satisfy.
   */
  attachments?: AttachmentCollectionFilter;

  /**
   * Comparator for the issues auto archived at date.
   */
  autoArchivedAt?: NullableDateComparator;

  /**
   * Comparator for the issues auto closed at date.
   */
  autoClosedAt?: NullableDateComparator;

  /**
   * Comparator for the issues canceled at date.
   */
  canceledAt?: NullableDateComparator;

  /**
   * Filters that the child issues must satisfy.
   */
  children?: IssueCollectionFilter;

  /**
   * Filters that the issues comments must satisfy.
   */
  comments?: CommentCollectionFilter;

  /**
   * Comparator for the issues completed at date.
   */
  completedAt?: NullableDateComparator;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the issues creator must satisfy.
   */
  creator?: NullableUserFilter;

  /**
   * Filters that the issues cycle must satisfy.
   */
  cycle?: NullableCycleFilter;

  /**
   * Comparator for the issues description.
   */
  description?: NullableStringComparator;

  /**
   * Comparator for the issues due date.
   */
  dueDate?: NullableTimelessDateComparator;

  /**
   * Comparator for the issues estimate.
   */
  estimate?: EstimateComparator;

  /**
   * Filters that needs to be matched by all issues.
   */
  every?: IssueFilter;

  /**
   * Comparator for filtering issues which are blocked.
   */
  hasBlockedByRelations?: RelationExistsComparator;

  /**
   * Comparator for filtering issues which are blocking.
   */
  hasBlockingRelations?: RelationExistsComparator;

  /**
   * Comparator for filtering issues which are duplicates.
   */
  hasDuplicateRelations?: RelationExistsComparator;

  /**
   * Comparator for filtering issues with relations.
   */
  hasRelatedRelations?: RelationExistsComparator;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filters that issue labels must satisfy.
   */
  labels?: IssueLabelCollectionFilter;

  /**
   * Comparator for the collection length.
   */
  length?: NumberComparator;

  /**
   * Comparator for the issues number.
   */
  number?: NumberComparator;

  /**
   * Compound filters, one of which need to be matched by the issue.
   */
  or?: Array<IssueCollectionFilter>;

  /**
   * Filters that the issue parent must satisfy.
   */
  parent?: NullableIssueFilter;

  /**
   * Comparator for the issues priority.
   */
  priority?: NullableNumberComparator;

  /**
   * Filters that the issues project must satisfy.
   */
  project?: NullableProjectFilter;

  /**
   * [ALPHA] Filters that the issues project milestone must satisfy.
   */
  projectMilestone?: NullableProjectMilestoneFilter;

  /**
   * Comparator for the issues sla status.
   */
  slaStatus?: SlaStatusComparator;

  /**
   * Filters that the issues snoozer must satisfy.
   */
  snoozedBy?: NullableUserFilter;

  /**
   * Comparator for the issues snoozed until date.
   */
  snoozedUntilAt?: NullableDateComparator;

  /**
   * Filters that needs to be matched by some issues.
   */
  some?: IssueFilter;

  /**
   * Comparator for the issues started at date.
   */
  startedAt?: NullableDateComparator;

  /**
   * Filters that the issues state must satisfy.
   */
  state?: WorkflowStateFilter;

  /**
   * Filters that issue subscribers must satisfy.
   */
  subscribers?: UserCollectionFilter;

  /**
   * Filters that the issues team must satisfy.
   */
  team?: TeamFilter;

  /**
   * Comparator for the issues title.
   */
  title?: StringComparator;

  /**
   * Comparator for the issues triaged at date.
   */
  triagedAt?: NullableDateComparator;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
