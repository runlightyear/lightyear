/**
 * type
 * String
 * The type of element. In this case type is always number_input.
 * Yes
 * is_decimal_allowed
 * Boolean
 * Decimal numbers are allowed if is_decimal_allowed= true, set the value to false otherwise.
 * Yes
 * action_id
 * String
 * An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
 * No
 * initial_value
 * String
 * The initial value in the plain-text input when it is loaded.
 * No
 * min_value
 * String
 * The minimum value, cannot be greater than max_value.
 * No
 * max_value
 * String
 * The maximum value, cannot be less than min_value.
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
 * A plain_text only text object that defines the placeholder text shown in the number input. Maximum length for the text in this field is 150 characters.
 */

export interface NumberInputElement {
  type: "number_input";
  /**
   * Decimal numbers are allowed if isDecimalAllowed === true, set the value to false otherwise.
   */
  isDecimalAllowed: boolean;
  /**
   * An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other actionIds in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The initial value in the plain-text input when it is loaded.
   */
  initialValue?: string;
  /**
   * The minimum value, cannot be greater than maxValue.
   */
  minValue?: string;
  /**
   * The maximum value, cannot be less than minValue.
   */
  maxValue?: string;
  /**
   * A dispatch configuration object that determines when during text input the element returns a blockActions payload.
   */
  dispatchActionConfig?: any;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plainText only text object that defines the placeholder text shown in the number input. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: any;
}
