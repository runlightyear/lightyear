import { BaseBlock } from "./BaseBlock";

export interface TableBlock extends BaseBlock {
  type: "table";
  table: Table;
}

export interface Table {
  tableWidth: number;
  hasColumnHeader: boolean;
  hasRowHeader: boolean;
}

// TODO: Handle input
