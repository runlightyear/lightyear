import { Filter } from "./Filter";

export interface CompoundFilter {
  or?: Array<Filter>;
  and?: Array<Filter>;
}
