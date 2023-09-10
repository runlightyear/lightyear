import { ForegroundColor } from "../../types/Color";

export interface SelectProperty {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: ForegroundColor;
  };
}

export interface SelectPropertyInput {
  select: {
    name: string;
  };
}
