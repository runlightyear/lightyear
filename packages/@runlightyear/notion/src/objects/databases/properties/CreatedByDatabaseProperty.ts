import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface CreatedByDatabaseProperty extends BaseDatabaseProperty {
  type: "created_by";
  createdBy: {};
}

export interface CreatedByDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  createdBy: {};
}
