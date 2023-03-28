import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { NumberComparator } from "./NumberComparator";
import { TeamFilter } from "./TeamFilter";
import { StringComparator } from "./StringComparator";
import { IssueCollectionFilter } from "./IssueCollectionFilter";

export interface WorkflowStateFilter {
  /**
   * Compound filters, all of which need to be matched by the workflow state.
   */
  and?: Array<WorkflowStateFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Comparator for the workflow state description.
   */
  description?: StringComparator;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filters that the workflow states issues must satisfy.
   */
  issues?: IssueCollectionFilter;

  /**
   * Comparator for the workflow state name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the workflow state.
   */
  or?: Array<WorkflowStateFilter>;

  /**
   * Comparator for the workflow state position.
   */
  position?: NumberComparator;

  /**
   * Filters that the workflow states team must satisfy.
   */
  team?: TeamFilter;

  /**
   * Comparator for the workflow state type.
   */
  type?: StringComparator;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
