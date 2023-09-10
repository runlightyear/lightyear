import { CheckboxFilterCondition } from "./conditions/CheckboxFilterCondition";
import { DateFilterCondition } from "./conditions/DateFilterCondition";
import { FilesFilterCondition } from "./conditions/FilesFilterCondition";
import { FormulaFilterCondition } from "./conditions/FormulaFilterCondition";
import { MultiSelectFilterCondition } from "./conditions/MultiSelectFilterCondition";
import { NumberFilterCondition } from "./conditions/NumberFilterCondition";
import { PeopleFilterCondition } from "./conditions/PeopleFilterCondition";
import { RelationFilterCondition } from "./conditions/RelationFilterCondition";
import { RichTextFilterCondition } from "./conditions/RichTextFilterCondition";
import { RollupFilterCondition } from "./conditions/RollupFilterCondition";
import { SelectFilterCondition } from "./conditions/SelectFilterCondition";

export interface PropertyFilter {
  property?: string;
  checkbox?: CheckboxFilterCondition;
  date?: DateFilterCondition;
  files?: FilesFilterCondition;
  formula?: FormulaFilterCondition;
  multiSelect?: MultiSelectFilterCondition;
  number?: NumberFilterCondition;
  people?: PeopleFilterCondition;
  relation?: RelationFilterCondition;
  richText?: RichTextFilterCondition;
  rollup?: RollupFilterCondition;
  select?: SelectFilterCondition;
}
