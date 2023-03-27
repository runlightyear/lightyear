import { SlaStatus } from "./SlaStatus";

export interface SlaStatusComparator {
  /**
   * Equals constraint.
   */
  eq?: SlaStatus;

  /**
   * In-array constraint.
   */
  in?: Array<SlaStatus>;

  /**
   * Not-equals constraint.
   */
  neq?: SlaStatus;

  /**
   * Not-in-array constraint.
   */
  nin?: Array<SlaStatus>;

  /**
   * Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
   */
  null?: boolean;
}
