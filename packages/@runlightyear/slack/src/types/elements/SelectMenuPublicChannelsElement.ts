import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";
import { PlainTextObject } from "../objects/PlainTextObject";

export interface SelectMenuPublicChannelsElement {
  type: "channels_select";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The ID of any valid public channel to be pre-selected when the menu loads.
   */
  initialChannel?: string;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after a menu item is selected.
   */
  confirm?: ConfirmationDialogObject;
  /**
   * This field only works with menus in input blocks in modals.
   */
  responseUrlEnabled?: boolean;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: PlainTextObject;
}
