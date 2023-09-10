import { ForegroundColor } from "../../types/Color";

export interface StatusProperty {
  id: string;
  type: "status";
  status: {
    id: string;
    name: string;
    color: ForegroundColor;
  };
}

export interface StatusPropertyInput {
  status: {
    name: string;
  };
}
