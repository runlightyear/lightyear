import { PageProperty, PagePropertyInput } from "./properties/PageProperty";

export type PageProperties = {
  [key: string]: PageProperty;
};

export type PagePropertiesInput = {
  [key: string]: PagePropertyInput;
};
