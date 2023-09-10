import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface TitleDatabaseProperty extends BaseDatabaseProperty {
  type: "title";
  title: {};
}

export interface TitleDatabasePropertyInput
  extends BaseDatabasePropertyInput,
    BaseDatabasePropertyInput {
  title: {};
}
