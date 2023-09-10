import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface LastEditedTimeDatabaseProperty extends BaseDatabaseProperty {
  type: "last_edited_time";
  last_edited_time: {};
}

export interface LastEditedTimeDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  last_edited_time: {};
}
