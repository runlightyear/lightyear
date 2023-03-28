import { UserFilter } from "./UserFilter";

export interface NullableUserFilter extends UserFilter {
  /**
   * Filter based on the existence of the relation.
   */
  null?: boolean;
}
