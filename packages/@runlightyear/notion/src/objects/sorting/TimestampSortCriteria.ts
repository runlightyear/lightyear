import { Timestamp } from "../types/Timestamp";
import { SortDirection } from "./SortDirection";

export interface TimestampSortCriteria {
  /**
   * The name of the timestamp to sort against.
   */
  timestamp: Timestamp;

  /**
   * The direction to sort.
   */
  direction: SortDirection;
}
