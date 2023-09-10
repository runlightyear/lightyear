import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface CheckboxDatabaseProperty extends BaseDatabaseProperty {
  type: "checkbox";
  checkbox: {};
}

export interface CheckboxDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  checkbox: {};
}
