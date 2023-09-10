import { BaseBlock, BaseBlockInput } from "./BaseBlock";

export interface ColumnListBlock extends BaseBlock {
  type: "column_list";
  columnList: {};
}

export interface ColumnListBlockInput extends BaseBlockInput {
  columnList: {};
}
