import { BaseBlock, BaseBlockInput } from "./BaseBlock";

export interface EquationBlock extends BaseBlock {
  type: "equation";
  equation: Equation;
}

export interface Equation {
  expression: string;
}

export interface EquationBlockInput extends BaseBlockInput {
  equation: EquationInput;
}

export interface EquationInput {
  expression: string;
}
