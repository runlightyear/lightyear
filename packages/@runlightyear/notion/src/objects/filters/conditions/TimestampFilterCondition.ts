import { DateFilterCondition } from "./DateFilterCondition";
import { Timestamp } from "../../types/Timestamp";

export interface TimestampFilterCondition {
  /**
   * 	A constant string representing the type of timestamp to use as a filter.
   */
  timestamp: Timestamp;

  /**
   * A date filter condition used to filter the specified timestamp.
   */
  createdTime?: DateFilterCondition;

  /**
   * A date filter condition used to filter the specified timestamp.
   */
  lastEditedTime?: DateFilterCondition;
}
