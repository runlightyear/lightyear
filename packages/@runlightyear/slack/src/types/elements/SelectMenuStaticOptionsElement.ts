import { OptionObject } from "../objects/OptionObject";
import { OptionGroupObject } from "../objects/OptionGroupObject";
import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";
import { PlainTextObject } from "../objects/PlainTextObject";

export interface SelectMenuStaticOptionsElement {
  type: "static_select";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * An array of option objects. Maximum number of options is 100. If option_groups is specified, this field should not be.
   */
  options: Array<OptionObject>;
  /**
   * An array of option group objects. Maximum number of option groups is 100. If options is specified, this field should not be.
   */
  optionGroups?: Array<OptionGroupObject>;
  /**
   * A single option that exactly matches one of the options within options or option_groups. This option will be selected when the menu initially loads.
   */
  initialOption?: OptionObject;
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
