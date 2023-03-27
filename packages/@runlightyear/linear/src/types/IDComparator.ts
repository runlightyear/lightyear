export interface IDComparator {
  /**
   * Equals constraint.
   */
  eq?: string;

  /**
   * In-array constraint.
   */
  in?: Array<string>;

  /**
   * Not-equals constraint.
   */
  neq?: string;

  /**
   * Not-in-array constraint.
   */
  nin?: Array<string>;
}
