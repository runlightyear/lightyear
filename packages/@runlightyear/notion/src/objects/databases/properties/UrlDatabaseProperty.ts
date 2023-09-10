import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface UrlDatabaseProperty extends BaseDatabaseProperty {
  type: "url";
  url: {};
}

export interface UrlDatabasePropertyInput extends BaseDatabasePropertyInput {
  url: {};
}
