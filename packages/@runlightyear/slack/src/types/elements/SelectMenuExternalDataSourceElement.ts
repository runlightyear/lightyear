/**
 * type
 * String
 * The type of element. In this case type is always external_select.
 * Yes
 * action_id
 * String
 * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
 * No
 * initial_option
 * Object
 * A single option that exactly matches one of the options within the options or option_groups loaded from the external data source. This option will be selected when the menu initially loads.
 * No
 * min_query_length
 * Integer
 * When the typeahead field is used, a request will be sent on every character change. If you prefer fewer requests or more fully ideated queries, use the min_query_length attribute to tell Slack the fewest number of typed characters required before dispatch. The default value is 3.
 * No
 * confirm
 * Object
 * A confirm object that defines an optional confirmation dialog that appears after a menu item is selected.
 * No
 * focus_on_load
 * Boolean
 * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
 * No
 * placeholder
 * Object
 * A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.
 * No
 */
import { OptionObject } from "../objects/OptionObject";
import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";
import { PlainTextObject } from "../objects/PlainTextObject";

export interface SelectMenuExternalDataSourceElement {
  type: "external_select";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * A single option that exactly matches one of the options within the options or option_groups loaded from the external data source. This option will be selected when the menu initially loads.
   */
  initialOption?: OptionObject;
  /**
   * When the typeahead field is used, a request will be sent on every character change. If you prefer fewer requests or more fully ideated queries, use the min_query_length attribute to tell Slack the fewest number of typed characters required before dispatch. The default value is 3.
   */
  minQueryLength?: number;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after a menu item is selected.
   */
  confirm?: ConfirmationDialogObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: PlainTextObject;
}
