import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface PhoneNumberDatabaseProperty extends BaseDatabaseProperty {
  type: "phone_number";
  phone_number: {};
}

export interface PhoneNumberDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  phone_number: {};
}
