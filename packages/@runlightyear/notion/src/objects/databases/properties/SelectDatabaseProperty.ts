import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";
import { ForegroundColor } from "../../types/Color";

export interface SelectDatabaseProperty extends BaseDatabaseProperty {
  type: "select";
  select: {
    options: SelectDatabasePropertyOption[];
  };
}

export interface SelectDatabasePropertyOption {
  id: string;
  color: ForegroundColor;
  name: string;
}

export interface SelectDatabasePropertyInput {
  select: {
    options: SelectDatabasePropertyOptionInput[];
  };
}

export interface SelectDatabasePropertyOptionInput
  extends BaseDatabasePropertyInput {
  name: string;
  color?: ForegroundColor;
}
