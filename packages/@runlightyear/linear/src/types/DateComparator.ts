export interface DateComparator {
  /**
   * Equals constraint.
   */
  eq?: string;

  /**
   * Greater-than constraint. Matches any values that are greater than the given value.
   */
  gt?: string;

  /**
   * Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
   */
  gte?: string;

  /**
   * In-array constraint.
   */
  in?: Array<string>;

  /**
   * Less-than constraint. Matches any values that are less than the given value.
   */
  lt?: string;

  /**
   * Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
   */
  lte?: string;

  /**
   * Not-equals constraint.
   */
  neq?: string;

  /**
   * Not-in-array constraint.
   */
  nin?: Array<string>;
}
