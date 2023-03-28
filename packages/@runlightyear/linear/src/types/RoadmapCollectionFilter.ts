import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { UserFilter } from "./UserFilter";
import { NumberComparator } from "./NumberComparator";
import { StringComparator } from "./StringComparator";
import { RoadmapFilter } from "./RoadmapFilter";

export interface RoadmapCollectionFilter {
  /**
   * Compound filters, all of which need to be matched by the roadmap.
   */
  and?: Array<RoadmapCollectionFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the roadmap creator must satisfy.
   */
  creator?: UserFilter;

  /**
   * Filters that needs to be matched by all roadmaps.
   */
  every?: RoadmapFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Comparator for the collection length.
   */
  length?: NumberComparator;

  /**
   * Comparator for the roadmap name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the roadmap.
   */
  or?: Array<RoadmapCollectionFilter>;

  /**
   * Comparator for the roadmap slug ID.
   */
  slugId?: StringComparator;

  /**
   * Filters that needs to be matched by some roadmaps.
   */
  some?: RoadmapFilter;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
