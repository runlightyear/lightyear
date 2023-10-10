import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";
import { PlainTextObject } from "../objects/PlainTextObject";

export interface UserListElement {
  type: "multi_users_select";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * An array of user IDs of any valid users to be pre-selected when the menu loads.
   */
  initialUsers?: Array<string>;
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
