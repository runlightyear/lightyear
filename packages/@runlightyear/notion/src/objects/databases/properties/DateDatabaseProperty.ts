import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface DateDatabaseProperty extends BaseDatabaseProperty {
  type: "date";
  date: {};
}

export interface DateDatabasePropertyInput extends BaseDatabasePropertyInput {
  date: {};
}
