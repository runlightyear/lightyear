import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface EmailDatabaseProperty extends BaseDatabaseProperty {
  type: "email";
  email: {};
}

export interface EmailDatabasePropertyInput extends BaseDatabasePropertyInput {
  email: {};
}
