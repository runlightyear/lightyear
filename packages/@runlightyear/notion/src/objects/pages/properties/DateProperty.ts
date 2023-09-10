import { DateRange } from "../../types/DateRange";

export interface DateProperty {
  id: string;
  type: "date";
  date: DateRange;
}

export interface DatePropertyInput {
  date: DateRange;
}
