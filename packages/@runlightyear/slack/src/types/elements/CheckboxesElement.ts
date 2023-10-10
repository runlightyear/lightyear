/**
 * Field	Type	Description	Required?
 * type
 * String
 * The type of element. In this case type is always checkboxes.
 * Yes
 * action_id
 * String
 * An identifier for the action triggered when the checkbox group is changed. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
 * No
 * options
 * Object[]
 * An array of option objects. A maximum of 10 options are allowed.
 * Yes
 * initial_options
 * Object[]
 * An array of option objects that exactly matches one or more of the options within options. These options will be selected when the checkbox group initially loads.
 * No
 * confirm
 * Object
 * A confirm object that defines an optional confirmation dialog that appears after clicking one of the checkboxes in this element.
 * No
 * focus_on_load
 * Boolean
 * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
 * No
 */
import { OptionObject } from "../objects/OptionObject";
import { SlackObject } from "../objects/SlackObject";

export interface CheckboxesElement {
  type: "checkboxes";
  actionId?: string;
  options: Array<OptionObject>;
  initialOptions?: Array<OptionObject>;
  confirm?: SlackObject;
  focusOnLoad?: boolean;
}
