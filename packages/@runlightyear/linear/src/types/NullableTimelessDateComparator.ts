import { TimelessDateComparator } from "./TimelessDateComparator";

export interface NullableTimelessDateComparator extends TimelessDateComparator {
  /**
   * Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
   */
  null?: boolean;
}
