import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface NumberDatabaseProperty extends BaseDatabaseProperty {
  type: "number";
  number: Number;
}

export interface Number {
  format: string;
}

export interface NumberDatabasePropertyInput extends BaseDatabasePropertyInput {
  number: NumberInput;
}

export interface NumberInput {
  format: string;
}
