import { TimelessDate } from "./TimelessDate";

export interface TimelessDateComparator {
  /**
   * Equals constraint.
   */
  eq?: TimelessDate;

  /**
   * Greater-than constraint. Matches any values that are greater than the given value.
   */
  gt?: TimelessDate;

  /**
   * Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
   */
  gte?: TimelessDate;

  /**
   * In-array constraint.
   */
  in?: Array<TimelessDate>;

  /**
   * Less-than constraint. Matches any values that are less than the given value.
   */
  lt?: TimelessDate;

  /**
   * Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
   */
  lte?: TimelessDate;

  /**
   * Not-equals constraint.
   */
  neq?: TimelessDate;

  /**
   * Not-in-array constraint.
   */
  nin?: Array<TimelessDate>;
}
