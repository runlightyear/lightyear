import { PlainTextObject } from "../objects/PlainTextObject";
import { CheckboxesElement } from "../elements/CheckboxesElement";
import { DatePickerElement } from "../elements/DatePickerElement";
import { DatetimePickerElement } from "../elements/DatetimePickerElement";
import { EmailInputElement } from "../elements/EmailInputElement";
import { MultiSelectMenuElement } from "../elements/MultiSelectMenuElement";
import { NumberInputElement } from "../elements/NumberInputElement";
import { PlainTextInputElement } from "../elements/PlainTextInputElement";
import { RadioButtonGroupElement } from "../elements/RadioButtonGroupElement";
import { SelectMenuElement } from "../elements/SelectMenuElement";
import { TimePickerElement } from "../elements/TimePickerElement";
import { UrlInputElement } from "../elements/UrlInputElement";

export interface InputBlock {
  type: "input";
  /**
   * A label that appears above an input element in the form of a text object that must have type of plain_text. Maximum length for the text in this field is 2000 characters.
   */
  label: PlainTextObject;
  /**
   * A compatible block element.
   */
  element: InputCompatibleElement;
  /**
   * A boolean that indicates whether or not the use of elements in this block should dispatch a block_actions payload. Defaults to false.
   */
  dispatchAction?: boolean;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message or view and each iteration of a message or view. If a message or view is updated, use a new block_id.
   */
  blockId?: string;
  /**
   * An optional hint that appears below an input element in a lighter grey. It must be a text object with a type of plain_text. Maximum length for the text in this field is 2000 characters.
   */
  hint?: PlainTextObject;
  /**
   * A boolean that indicates whether the input element may be empty when a user submits the modal. Defaults to false.
   */
  optional?: boolean;
}

export type InputCompatibleElement =
  | CheckboxesElement
  | DatePickerElement
  | DatetimePickerElement
  | EmailInputElement
  | MultiSelectMenuElement
  | NumberInputElement
  | PlainTextInputElement
  | RadioButtonGroupElement
  | SelectMenuElement
  | TimePickerElement
  | UrlInputElement;
