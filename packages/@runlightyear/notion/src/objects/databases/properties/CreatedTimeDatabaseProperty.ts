import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface CreatedTimeDatabaseProperty extends BaseDatabaseProperty {
  type: "created_time";
  createdTime: {};
}

export interface CreatedTimeDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  createdTime: {};
}
