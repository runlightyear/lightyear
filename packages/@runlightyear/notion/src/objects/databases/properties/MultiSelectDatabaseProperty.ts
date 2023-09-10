import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";
import { ForegroundColor } from "../../types/Color";

export interface MultiSelectDatabaseProperty extends BaseDatabaseProperty {
  type: "multi_select";
  multiSelect: MultiSelect;
}

export interface MultiSelect {
  options: Array<MultiSelectDatabasePropertyOption>;
}

export interface MultiSelectDatabasePropertyOption {
  id: string;
  color: ForegroundColor;
  name: string;
}

export interface MultiSelectDatabasePropertyInput {
  multiSelect: MultiSelectInput;
}

export interface MultiSelectInput {
  options: Array<MultiSelectDatabasePropertyOptionInput>;
}

export interface MultiSelectDatabasePropertyOptionInput
  extends BaseDatabasePropertyInput {
  name: string;
  color?: ForegroundColor;
}
