import { PlainTextObject } from "../objects/PlainTextObject";
import { SlackObject } from "../objects/SlackObject";

export interface ButtonElement {
  type: "button";
  /**
   * A text object that defines the button's text. Can only be of type: plain_text. text may truncate with ~30 characters. Maximum length for the text in this field is 75 characters.
   */
  text: PlainTextObject;
  /**
   * An identifier for this action. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * A URL to load in the user's browser when the button is clicked. Maximum length is 3000 characters. If you're using url, you'll still receive an interaction payload and will need to send an acknowledgement response.
   */
  url?: string;
  /**
   * The value to send along with the interaction payload. Maximum length is 2000 characters.
   */
  value?: string;
  /**
   * Decorates buttons with alternative visual color schemes. Use this option with restraint.
   */
  style?: "primary" | "danger";
  /**
   * A confirm object that defines an optional confirmation dialog after the button is clicked.
   */
  confirm?: SlackObject;
  /**
   * A label for longer descriptive text about a button element. This label will be read out by screen readers instead of the button text object. Maximum length is 75 characters.
   */
  accessibilityLabel?: string;
}
