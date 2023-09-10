import {
  DatabaseProperty,
  DatabasePropertyInput,
} from "./properties/DatabaseProperty";

export type DatabaseProperties = {
  [key: string]: DatabaseProperty;
};

export type DatabasePropertiesInput = {
  [key: string]: DatabasePropertyInput;
};
