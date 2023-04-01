import { CheckboxFilterCondition } from "./CheckboxFilterCondition";
import { DateFilterCondition } from "./DateFilterCondition";
import { RichTextFilterCondition } from "./RichTextFilterCondition";
import { NumberFilterCondition } from "./NumberFilterCondition";

export interface FormulaFilterCondition {
  /**
   * A checkbox filter condition to compare the formula result against.
   *
   * Returns database entries where the formula result matches the provided condition.
   */
  checkbox?: CheckboxFilterCondition;

  /**
   * A date filter condition to compare the formula result against.
   *
   * Returns database entries where the formula result matches the provided condition.
   */
  date?: DateFilterCondition;

  /**
   * A number filter condition to compare the formula result against.
   *
   * Returns database entries where the formula result matches the provided condition.
   */
  number?: NumberFilterCondition;

  /**
   * A rich text filter condition to compare the formula result against.
   *
   * Returns database entries where the formula result matches the provided condition.
   */
  string?: RichTextFilterCondition;
}
