import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface FilesDatabaseProperty extends BaseDatabaseProperty {
  type: "files";
  files: {};
}

export interface FilesDatabasePropertyInput extends BaseDatabasePropertyInput {
  files: {};
}
