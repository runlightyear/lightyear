import { BaseBlock, BaseBlockInput } from "./BaseBlock";

export interface ColumnBlock extends BaseBlock {
  type: "column";
  column: {};
}

export interface ColumnBlockInput extends BaseBlockInput {
  column: {};
}
