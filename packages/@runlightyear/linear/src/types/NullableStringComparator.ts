import { StringComparator } from "./StringComparator";

export interface NullableStringComparator extends StringComparator {
  /**
   * Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
   */
  null?: boolean;
}
