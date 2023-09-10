import { BaseBlock, BaseBlockInput } from "./BaseBlock";

export interface DividerBlock extends BaseBlock {
  type: "divider";
  divider: {};
}

export interface DividerBlockInput extends BaseBlockInput {
  divider: {};
}
