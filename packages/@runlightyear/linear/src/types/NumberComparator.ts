export interface NumberComparator {
  /**
   * Equals constraint.
   */
  eq?: number;

  /**
   * Greater-than constraint. Matches any values that are greater than the given value.
   */
  gt?: number;

  /**
   * Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
   */
  gte?: number;

  /**
   * In-array constraint.
   */
  in?: Array<number>;

  /**
   * Less-than constraint. Matches any values that are less than the given value.
   */
  lt?: number;

  /**
   * Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
   */
  lte?: number;

  /**
   * Not-equals constraint.
   */
  neq?: number;

  /**
   * Not-in-array constraint.
   */
  nin?: Array<number>;
}
