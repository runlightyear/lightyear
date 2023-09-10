import { DateFilterCondition } from "./conditions/DateFilterCondition";

export type TimestampFilter = CreatedTimeFilter | LastEditedTimeFilter;

export interface CreatedTimeFilter {
  timestamp: "created_time";
  createdTime: DateFilterCondition;
}

export interface LastEditedTimeFilter {
  timestamp: "last_edited_time";
  lastEditedTime: DateFilterCondition;
}
