/**
 * type
 * String
 * The type of element. In this case type is always timepicker.
 * Yes
 * action_id
 * String
 * An identifier for the action triggered when a time is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
 * No
 * initial_time
 * String
 * The initial time that is selected when the element is loaded. This should be in the format HH:mm, where HH is the 24-hour format of an hour (00 to 23) and mm is minutes with leading zeros (00 to 59), for example 22:25 for 10:25pm.
 * No
 * confirm
 * Object
 * A confirm object that defines an optional confirmation dialog that appears after a time is selected.
 * No
 * focus_on_load
 * Boolean
 * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
 * No
 * placeholder
 * Object
 * A plain_text only text object that defines the placeholder text shown on the time picker. Maximum length for the text in this field is 150 characters.
 * No
 * timezone
 * String
 * A string in the IANA format, e.g. "America/Chicago". The timezone is displayed to end users as hint text underneath the time picker. It is also passed to the app upon certain interactions, such as view_submission.
 * No
 */
import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";

export interface TimePickerElement {
  type: "timepicker";
  /**
   * An identifier for the action triggered when a time is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The initial time that is selected when the element is loaded. This should be in the format HH:mm, where HH is the 24-hour format of an hour (00 to 23) and mm is minutes with leading zeros (00 to 59), for example 22:25 for 10:25pm.
   */
  initialTime?: string;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after a time is selected.
   */
  confirm?: ConfirmationDialogObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plain_text only text object that defines the placeholder text shown on the time picker. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: string;
  /**
   * A string in the IANA format, e.g. "America/Chicago". The timezone is displayed to end users as hint text underneath the time picker. It is also passed to the app upon certain interactions, such as view_submission.
   */
  timezone?: string;
}
