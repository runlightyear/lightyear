import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { NullableStringComparator } from "./NullableStringComparator";
import { StringComparator } from "./StringComparator";
import { IssueCollectionFilter } from "./IssueCollectionFilter";

export interface TeamFilter {
  /**
   * Compound filters, all of which need to be matched by the team.
   */
  and?: Array<TeamFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Comparator for the team description.
   */
  description?: NullableStringComparator;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filters that the teams issues must satisfy.
   */
  issues?: IssueCollectionFilter;

  /**
   * Comparator for the team key.
   */
  key?: StringComparator;

  /**
   * Comparator for the team name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the team.
   */
  or?: Array<TeamFilter>;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
