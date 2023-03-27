import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { UserFilter } from "./UserFilter";
import { NullableUserFilter } from "./NullableUserFilter";
import { StringComparator } from "./StringComparator";
import { NullableDateComparator } from "./NullableDateComparator";
import { IssueCollectionFilter } from "./IssueCollectionFilter";
import { RoadmapCollectionFilter } from "./RoadmapCollectionFilter";

export interface ProjectFilter {
  /**
   * Compound filters, all of which need to be matched by the project.
   */
  and?: Array<ProjectFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the projects creator must satisfy.
   */
  creator?: UserFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filters that the projects issues must satisfy.
   */
  issues?: IssueCollectionFilter;

  /**
   * Filters that the projects lead must satisfy.
   */
  lead?: NullableUserFilter;

  /**
   * Filters that the projects members must satisfy.
   */
  members?: UserFilter;

  /**
   * Comparator for the project name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the project.
   */
  or?: Array<ProjectFilter>;

  /**
   * Filters that the projects roadmaps must satisfy.
   */
  roadmaps?: RoadmapCollectionFilter;

  /**
   * Comparator for the project slug ID.
   */
  slugId?: StringComparator;

  /**
   * Comparator for the project start date.
   */
  startDate?: NullableDateComparator;

  /**
   * Comparator for the project state.
   */
  state?: StringComparator;

  /**
   * Comparator for the project target date.
   */
  targetDate?: NullableDateComparator;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
