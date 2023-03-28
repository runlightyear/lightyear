import { ProjectFilter } from "./ProjectFilter";

export interface NullableProjectFilter extends ProjectFilter {
  /**
   * Compound filters, all of which need to be matched by the project.
   */
  and?: Array<NullableProjectFilter>;

  /**
   * Filter based on the existence of the relation.
   */
  null?: boolean;

  /**
   * Compound filters, one of which need to be matched by the project.
   */
  or?: Array<NullableProjectFilter>;
}
