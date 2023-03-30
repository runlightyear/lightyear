import { CheckboxFilterCondition } from "./CheckboxFilterCondition";
import { DateFilterCondition } from "./DateFilterCondition";
import { FilesFilterCondition } from "./FilesFilterCondition";
import { FormulaFilterCondition } from "./FormulaFilterCondition";
import { MultiSelectFilterCondition } from "./MultiSelectFilterCondition";
import { NumberFilterCondition } from "./NumberFilterCondition";
import { PeopleFilterCondition } from "./PeopleFilterCondition";
import { RelationFilterCondition } from "./RelationFilterCondition";
import { RichTextFilterCondition } from "./RichTextFilterCondition";
import { RollupFilterCondition } from "./RollupFilterCondition";

export interface TypeFilter {
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
}
