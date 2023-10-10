/**
 * type
 * String
 * The type of element. In this case type is always multi_external_select.
 * Yes
 * action_id
 * String
 * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
 * No
 * min_query_length
 * Integer
 * When the typeahead field is used, a request will be sent on every character change. If you prefer fewer requests or more fully ideated queries, use the min_query_length attribute to tell Slack the fewest number of typed characters required before dispatch. The default value is 3.
 * No
 * initial_options
 * Object[]
 * An array of option objects that exactly match one or more of the options within options or option_groups. These options will be selected when the menu initially loads.
 * No
 * confirm
 * Object
 * A confirm object that defines an optional confirmation dialog that appears before the multi-select choices are submitted.
 * No
 * max_selected_items
 * Integer
 * Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.
 * No
 * focus_on_load
 * Boolean
 * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
 * No
 * placeholder
 * Object
 * A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.
 */
import { OptionObject } from "../objects/OptionObject";
import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";
import { PlainTextObject } from "../objects/PlainTextObject";

export interface ExternalDataSourceElement {
  type: "multi_external_select";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * When the typeahead field is used, a request will be sent on every character change. If you prefer fewer requests or more fully ideated queries, use the min_query_length attribute to tell Slack the fewest number of typed characters required before dispatch. The default value is 3.
   */
  minQueryLength?: number;
  /**
   * An array of option objects that exactly match one or more of the options within options or option_groups. These options will be selected when the menu initially loads.
   */
  initialOptions?: Array<OptionObject>;
  /**
   * A confirm object that defines an optional confirmation dialog that appears before the multi-select choices are submitted.
   */
  confirm?: ConfirmationDialogObject;
  /**
   * Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.
   */
  maxSelectedItems?: number;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: PlainTextObject;
}
