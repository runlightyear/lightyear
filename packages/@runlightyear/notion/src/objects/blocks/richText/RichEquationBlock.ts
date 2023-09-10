import { BaseRichBlock, BaseRichBlockInput } from "./BaseRichBlock";

export interface RichEquationBlock extends BaseRichBlock {
  type: "equation";
  equation: {
    expression: string;
  };
}

export interface RichEquationBlockInput extends BaseRichBlockInput {
  equation: {
    expression: string;
  };
}
