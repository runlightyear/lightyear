import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";

export interface NullableProjectMilestoneFilter {
  /**
   * Compound filters, all of which need to be matched by the project milestone.
   */
  and?: Array<NullableProjectMilestoneFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filter based on the existence of the relation.
   */
  null?: Boolean;

  /**
   * Compound filters, one of which need to be matched by the project milestone.
   */
  or?: Array<NullableProjectMilestoneFilter>;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
