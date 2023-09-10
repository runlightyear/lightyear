import { NotionDate } from "../../types/NotionDate";

export interface RollupProperty {
  id: string;
  type: "rollup";
  rollup:
    | ArrayRollup
    | DateRollup
    | NumberRollup
    | IncompleteRollup
    | UnsupportedRollup;
}

export interface ArrayRollup {
  type: "array";
}

export interface DateRollup {
  type: "date";
  date: NotionDate;
}

export interface NumberRollup {
  type: "number";
  number: number;
}

export interface IncompleteRollup {
  type: "incomplete";
}

export interface UnsupportedRollup {
  type: "unsupported";
}

/** Can't be updated **/
