import { ForegroundColor } from "../../types/Color";
import { NotionId } from "../../types/NotionId";
import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface StatusDatabaseProperty extends BaseDatabaseProperty {
  type: "status";
  status: {
    options: StatusDatabasePropertyOption[];
  };
}

export interface StatusDatabasePropertyOption {
  id: string;
  color: ForegroundColor;
  name: string;
  optionIds: NotionId[];
}

export interface StatusDatabasePropertyInput {
  status: {
    options: StatusDatabasePropertyOptionInput[];
  };
}

export interface StatusDatabasePropertyOptionInput
  extends BaseDatabasePropertyInput {
  name: string;
  color?: ForegroundColor;
  optionIds?: NotionId[];
}
