import { Field } from "./Field";
import { View } from "./View";

export interface TableModel {
  id: string;
  primaryFieldId: string;
  name: string;
  description?: string;
  fields: Array<Field>;
  views: Array<View>;
}
