import { PlainTextObject } from "./PlainTextObject";
import { TextObject } from "./TextObject";

export interface OptionObject {
  /**
   * A text object that defines the text shown in the option on the menu. Overflow, select, and multi-select menus can only use plain_text objects, while radio buttons and checkboxes can use mrkdwn text objects. Maximum length for the text in this field is 75 characters.
   */
  text: TextObject;
  /**
   * A unique string value that will be passed to your app when this option is chosen. Maximum length for this field is 75 characters.
   */
  value: string;
  /**
   * A plain_text text object that defines a line of descriptive text shown below the text field beside a single selectable item in a select menu, multi-select menu, checkbox group, radio button group, or overflow menu. Maximum length for the text within this field is 75 characters.
   */
  description?: PlainTextObject;
  /**
   * A URL to load in the user's browser when the option is clicked. The url attribute is only available in overflow menus. Maximum length for this field is 3000 characters. If you're using url, you'll still receive an interaction payload and will need to send an acknowledgement response.
   */
  url?: string;
}
