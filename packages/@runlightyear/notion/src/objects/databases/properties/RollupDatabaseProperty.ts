import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface RollupDatabaseProperty extends BaseDatabaseProperty {
  type: "rollup";
  rollup: Rollup;
}

export interface Rollup {
  rollupPropertyName: string;
  relationPropertyName: string;
  rollupPropertyId: string;
  relationPropertyId: string;
  function: RollupDatabasePropertyFunction;
}

export interface RollupDatabasePropertyInput extends BaseDatabasePropertyInput {
  rollup: RollupInput;
}

export interface RollupInput {
  rollupPropertyName: string;
  relationPropertyName: string;
  rollupPropertyId: string;
  relationPropertyId: string;
  function: RollupDatabasePropertyFunction;
}

export type RollupDatabasePropertyFunction =
  | "average"
  | "checked"
  | "count_per_group"
  | "count"
  | "count_values"
  | "date_range"
  | "earliest_date"
  | "empty"
  | "latest_date"
  | "max"
  | "median"
  | "min"
  | "not_empty"
  | "percent_checked"
  | "percent_empty"
  | "percent_not_empty"
  | "percent_per_group"
  | "percent_unchecked"
  | "range"
  | "unchecked"
  | "unique"
  | "show_original"
  | "show_unique"
  | "sum"
  | string;
