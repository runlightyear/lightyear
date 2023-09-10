import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface LastEditedByDatabaseProperty extends BaseDatabaseProperty {
  type: "last_edited_by";
  last_edited_by: {};
}

export interface LastEditedByDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  last_edited_by: {};
}
