import { DateComparator } from "./DateComparator";

export interface NullableDateComparator extends DateComparator {
  /**
   * Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
   */
  null?: boolean;
}
