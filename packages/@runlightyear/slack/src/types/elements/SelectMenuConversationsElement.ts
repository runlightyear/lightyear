import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";
import { ConversationFilterObject } from "../objects/ConversationFilterObject";
import { PlainTextObject } from "../objects/PlainTextObject";

export interface SelectMenuConversationsElement {
  type: "conversations_select";
  /**
   * An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The ID of any valid conversation to be pre-selected when the menu loads. If default_to_current_conversation is also supplied, initial_conversation will take precedence.
   */
  initialConversation?: string;
  /**
   * Pre-populates the select menu with the conversation that the user was viewing when they opened the modal, if available. Default is false.
   */
  defaultToCurrentConversation?: boolean;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after a menu item is selected.
   */
  confirm?: ConfirmationDialogObject;
  /**
   * This field only works with menus in input blocks in modals.
   */
  responseUrlEnabled?: boolean;
  /**
   * A filter object that reduces the list of available conversations using the specified criteria.
   */
  filter?: ConversationFilterObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plain_text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: PlainTextObject;
}
