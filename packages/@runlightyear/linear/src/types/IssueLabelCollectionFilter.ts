import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { NumberComparator } from "./NumberComparator";
import { TeamFilter } from "./TeamFilter";
import { NullableUserFilter } from "./NullableUserFilter";
import { StringComparator } from "./StringComparator";
import { IssueLabelFilter } from "./IssueLabelFilter";

export interface IssueLabelCollectionFilter {
  /**
   * Compound filters, all of which need to be matched by the label.
   */
  and?: Array<IssueLabelCollectionFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the issue labels creator must satisfy.
   */
  creator?: NullableUserFilter;

  /**
   * Filters that needs to be matched by all issue labels.
   */
  every?: IssueLabelFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Comparator for the collection length.
   */
  length?: NumberComparator;

  /**
   * Comparator for the name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the label.
   */
  or?: Array<IssueLabelCollectionFilter>;

  /**
   * Filters that the issue label's parent label must satisfy.
   */
  parent?: IssueLabelFilter;

  /**
   * Filters that needs to be matched by some issue labels.
   */
  some?: IssueLabelFilter;

  /**
   * Filters that the issue labels team must satisfy.
   */
  team?: TeamFilter;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
