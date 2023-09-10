import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface PeopleDatabaseProperty extends BaseDatabaseProperty {
  type: "people";
  people: {};
}

export interface PeopleDatabasePropertyInput extends BaseDatabasePropertyInput {
  people: {};
}
