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
