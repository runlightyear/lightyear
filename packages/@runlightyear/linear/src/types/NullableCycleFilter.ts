import { IDComparator } from "./IDComparator";
import { BooleanComparator } from "./BooleanComparator";
import { DateComparator } from "./DateComparator";
import { NumberComparator } from "./NumberComparator";
import { StringComparator } from "./StringComparator";
import { IssueCollectionFilter } from "./IssueCollectionFilter";
import { TeamFilter } from "./TeamFilter";

export interface NullableCycleFilter {
  /**
   * Compound filters, one of which need to be matched by the cycle.
   */
  and?: Array<NullableCycleFilter>;

  /**
   * Comparator for the cycle completed at date.
   */
  completedAt?: DateComparator;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Comparator for the cycle ends at date.
   */
  endsAt?: DateComparator;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Comparator for the filtering active cycle.
   */
  isActive?: BooleanComparator;

  /**
   * Comparator for the filtering future cycles.
   */
  isFuture?: BooleanComparator;

  /**
   * Comparator for the filtering next cycle.
   */
  isNext?: BooleanComparator;

  /**
   * Comparator for the filtering past cycles.
   */
  isPast?: BooleanComparator;

  /**
   * Comparator for the filtering previous cycle.
   */
  isPrevious?: BooleanComparator;

  /**
   * Filters that the cycles issues must satisfy.
   */
  issues?: IssueCollectionFilter;

  /**
   * Comparator for the cycle name.
   */
  name?: StringComparator;

  /**
   * Filter based on the existence of the relation.
   */
  null?: Boolean;

  /**
   * Comparator for the cycle number.
   */
  number?: NumberComparator;

  /**
   * Compound filters, one of which need to be matched by the cycle.
   */
  or?: Array<NullableCycleFilter>;

  /**
   * Comparator for the cycle start date.
   */
  startsAt?: DateComparator;

  /**
   * Filters that the cycles team must satisfy.
   */
  team?: TeamFilter;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
