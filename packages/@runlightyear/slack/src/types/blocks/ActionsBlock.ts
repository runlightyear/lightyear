/**
 *
 * Object[]
 * An array of interactive element objects - buttons, select menus, overflow menus, or date pickers. There is a maximum of 25 elements in each action block.
 * Yes
 * block_id
 * String
 * A string acting as a unique identifier for a block. If not specified, a block_id will be generated. You can use this block_id when you receive an interaction payload to identify the source of the action. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
 */
import { ButtonElement } from "../elements/ButtonElement";
import { CheckboxesElement } from "../elements/CheckboxesElement";
import { DatePickerElement } from "../elements/DatePickerElement";
import { MultiSelectMenuElement } from "../elements/MultiSelectMenuElement";
import { OverflowMenuElement } from "../elements/OverflowMenuElement";
import { RadioButtonGroupElement } from "../elements/RadioButtonGroupElement";
import { SelectMenuElement } from "../elements/SelectMenuElement";
import { TimePickerElement } from "../elements/TimePickerElement";
import { WorkflowButtonElement } from "../elements/WorkflowButtonElement";

export interface ActionsBlock {
  type: "actions";
  elements: Array<ActionsCompatibleElement>;
}

export type ActionsCompatibleElement =
  | ButtonElement
  | CheckboxesElement
  | DatePickerElement
  | MultiSelectMenuElement
  | OverflowMenuElement
  | RadioButtonGroupElement
  | SelectMenuElement
  | TimePickerElement
  | WorkflowButtonElement;
