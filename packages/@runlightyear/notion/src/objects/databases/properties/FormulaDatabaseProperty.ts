import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface FormulaDatabaseProperty extends BaseDatabaseProperty {
  type: "formula";
  formula: Formula;
}

export interface Formula {
  expression: string;
}

export interface FormulaDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  formula: FormulaInput;
}

export interface FormulaInput {
  expression: string;
}
