import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { UserFilter } from "./UserFilter";
import { StringComparator } from "./StringComparator";

export interface RoadmapFilter {
  /**
   * Compound filters, all of which need to be matched by the roadmap.
   */
  and?: Array<RoadmapFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the roadmap creator must satisfy.
   */
  creator?: UserFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Comparator for the roadmap name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the roadmap.
   */
  or?: Array<RoadmapFilter>;

  /**
   * Comparator for the roadmap slug ID.
   */
  slugId?: StringComparator;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
