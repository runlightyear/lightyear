import { NumberComparator } from "./NumberComparator";

export interface NullableNumberComparator extends NumberComparator {
  /**
   * Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
   */
  null?: boolean;
}
