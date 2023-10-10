/**
 * type
 * String
 * The type of element. In this case type is always datetimepicker.
 * Yes
 * action_id
 * String
 * An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
 * No
 * initial_date_time
 * Integer
 * The initial date and time that is selected when the element is loaded, represented as a UNIX timestamp in seconds. This should be in the format of 10 digits, for example 1628633820 represents the date and time August 10th, 2021 at 03:17pm PST.
 * No
 * confirm
 * Object
 * A confirm object that defines an optional confirmation dialog that appears after a time is selected.
 * No
 * focus_on_load
 * Boolean
 * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false
 */
import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";

export interface DatetimePickerElement {
  type: "datetimepicker";
  /**
   * An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The initial date and time that is selected when the element is loaded, represented as a UNIX timestamp in seconds. This should be in the format of 10 digits, for example 1628633820 represents the date and time August 10th, 2021 at 03:17pm PST.
   */
  initialDateTime?: number;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after a time is selected.
   */
  confirm?: ConfirmationDialogObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false
   */
  focusOnLoad?: boolean;
}
