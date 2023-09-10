import { PropertyFilter } from "./PropertyFilter";
import { CompoundFilter } from "./CompoundFilter";
import { TimestampFilter } from "./TimestampFilter";

export type Filter = PropertyFilter | TimestampFilter | CompoundFilter;
