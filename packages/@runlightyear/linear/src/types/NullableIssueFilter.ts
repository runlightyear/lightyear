import { IssueFilter } from "./IssueFilter";

export interface NullableIssueFilter extends IssueFilter {
  /**
   * Filter based on the existence of the relation.
   */
  null?: boolean;
}
