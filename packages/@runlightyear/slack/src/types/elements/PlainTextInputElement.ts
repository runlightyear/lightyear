/**
 * type
 * String
 * The type of element. In this case type is always plain_text_input.
 * Yes
 * action_id
 * String
 * An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
 * No
 * initial_value
 * String
 * The initial value in the plain-text input when it is loaded.
 * No
 * multiline
 * Boolean
 * Indicates whether the input will be a single line (false) or a larger textarea (true). Defaults to false.
 * No
 * min_length
 * Integer
 * The minimum length of input that the user must provide. If the user provides less, they will receive an error. Maximum value is 3000.
 * No
 * max_length
 * Integer
 * The maximum length of input that the user can provide. If the user provides more, they will receive an error.
 * No
 * dispatch_action_config
 * Object
 * A dispatch configuration object that determines when during text input the element returns a block_actions payload.
 * No
 * focus_on_load
 * Boolean
 * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
 * No
 * placeholder
 * Object
 * A plain_text only text object that defines the placeholder text shown in the plain-text input. Maximum length for the text in this field is 150 characters.
 * No
 */
import { DispatchActionConfigurationObject } from "../objects/DispatchActionConfigurationObject";
import { PlainTextObject } from "../objects/PlainTextObject";

export interface PlainTextInputElement {
  type: "plain_text_input";
  /**
   * An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The initial value in the plain-text input when it is loaded.
   */
  initialValue?: string;
  /**
   * Indicates whether the input will be a single line (false) or a larger textarea (true). Defaults to false.
   */
  multiline?: boolean;
  /**
   * The minimum length of input that the user must provide. If the user provides less, they will receive an error. Maximum value is 3000.
   */
  minLength?: number;
  /**
   * The maximum length of input that the user can provide. If the user provides more, they will receive an error.
   */
  maxLength?: number;
  /**
   * A dispatch configuration object that determines when during text input the element returns a block_actions payload.
   */
  dispatchActionConfig?: DispatchActionConfigurationObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plainText only text object that defines the placeholder text shown in the plain-text input. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: PlainTextObject;
}
