import { OptionObject } from "../objects/OptionObject";
import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";

export interface OverflowMenuElement {
  type: "overflow";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * An array of up to five option objects to display in the menu.
   */
  options: Array<OptionObject>;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after a menu item is selected.
   */
  confirm?: ConfirmationDialogObject;
}
