import { TextObject } from "../objects/TextObject";
import { ButtonElement } from "../elements/ButtonElement";
import { CheckboxesElement } from "../elements/CheckboxesElement";
import { DatePickerElement } from "../elements/DatePickerElement";
import { ImageElement } from "../elements/ImageElement";
import { MultiSelectMenuElement } from "../elements/MultiSelectMenuElement";
import { OverflowMenuElement } from "../elements/OverflowMenuElement";
import { RadioButtonGroupElement } from "../elements/RadioButtonGroupElement";
import { SelectMenuElement } from "../elements/SelectMenuElement";
import { TimePickerElement } from "../elements/TimePickerElement";
import { WorkflowButtonElement } from "../elements/WorkflowButtonElement";

export interface SectionBlock {
  type: "section";
  /**
   * The text for the block, in the form of a text object. Maximum length for the text in this field is 3000 characters. This field is not required if a valid array of fields objects is provided instead.
   */
  text?: TextObject | string;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. You can use this block_id when you receive an interaction payload to identify the source of the action. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
  /**
   * Required if no text is provided. An array of text objects. Any text objects included with fields will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10. Maximum length for the text in each item is 2000 characters.
   */
  fields?: TextObject[];
  /**
   * One of the compatible element objects. Be sure to confirm the desired element works with section.
   */
  accessory?: SectionCompatibleElement;
}

export type SectionCompatibleElement =
  | ButtonElement
  | CheckboxesElement
  | DatePickerElement
  | ImageElement
  | MultiSelectMenuElement
  | OverflowMenuElement
  | RadioButtonGroupElement
  | SelectMenuElement
  | TimePickerElement
  | WorkflowButtonElement;
