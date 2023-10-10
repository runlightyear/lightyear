import { PlainTextObject } from "../objects/PlainTextObject";
import { SlackObject } from "../objects/SlackObject";

export interface DatePickerElement {
  type: "datepicker";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The initial date that is selected when the element is loaded. This should be in the format YYYY-MM-DD.
   */
  initialDate?: string;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after a date is selected.
   */
  confirm?: SlackObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plain_text only text object that defines the placeholder text shown on the datepicker. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: PlainTextObject;
}
