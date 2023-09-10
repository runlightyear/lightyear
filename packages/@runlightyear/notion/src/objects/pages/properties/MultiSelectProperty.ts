import { ForegroundColor } from "../../types/Color";

export interface MultiSelectProperty {
  id: string;
  type: "multi_select";
  multi_select: Array<MultiSelectPropertyOption>;
}

export interface MultiSelectPropertyOption {
  id: string;
  name: string;
  color: ForegroundColor;
}

export interface MultiSelectPropertyInput {
  multi_select: Array<MultiSelectPropertyOptionInput>;
}

export interface MultiSelectPropertyOptionInput {
  name: string;
}
