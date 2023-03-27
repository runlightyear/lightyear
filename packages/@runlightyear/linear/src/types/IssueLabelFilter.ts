import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { TeamFilter } from "./TeamFilter";
import { NullableUserFilter } from "./NullableUserFilter";
import { StringComparator } from "./StringComparator";

export interface IssueLabelFilter {
  /**
   * Compound filters, all of which need to be matched by the label.
   */
  and?: Array<IssueLabelFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the issue labels creator must satisfy.
   */
  creator?: NullableUserFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Comparator for the name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the label.
   */
  or?: Array<IssueLabelFilter>;

  /**
   * Filters that the issue label's parent label must satisfy.
   */
  parent?: IssueLabelFilter;

  /**
   * Filters that the issue labels team must satisfy.
   */
  team?: TeamFilter;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
