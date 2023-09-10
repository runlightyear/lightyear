import { NotionDate } from "../../types/NotionDate";

export interface FormulaProperty {
  id: string;
  type: "formula";
  formula:
    | FormulaBooleanResult
    | FormulaDateResult
    | FormulaNumberResult
    | FormulaStringResult;
}

export interface FormulaBooleanResult {
  type: "boolean";
  boolean: boolean;
}

export interface FormulaDateResult {
  type: "date";
  date: NotionDate;
}

export interface FormulaNumberResult {
  type: "number";
  number: number;
}

export interface FormulaStringResult {
  type: "string";
  string: string;
}

/** Can't be updated **/
