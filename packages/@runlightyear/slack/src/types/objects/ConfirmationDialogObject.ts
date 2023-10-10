/**
 * title
 * Object
 * A plain_text text object that defines the dialog's title. Maximum length for this field is 100 characters.
 * Yes
 * text
 * Object
 * A plain_text text object that defines the explanatory text that appears in the confirm dialog. Maximum length for the text in this field is 300 characters.
 * Yes
 * confirm
 * Object
 * A plain_text text object to define the text of the button that confirms the action. Maximum length for the text in this field is 30 characters.
 * Yes
 * deny
 * Object
 * A plain_text text object to define the text of the button that cancels the action. Maximum length for the text in this field is 30 characters.
 * Yes
 * style
 * String
 * Defines the color scheme applied to the confirm button. A value of danger will display the button with a red background on desktop, or red text on mobile. A value of primary will display the button with a green background on desktop, or blue text on mobile. If this field is not provided, the default value will be primary.
 */
import { PlainTextObject } from "./PlainTextObject";

export interface ConfirmationDialogObject {
  /**
   * A plain_text text object that defines the dialog's title. Maximum length for this field is 100 characters.
   */
  title: PlainTextObject;
  /**
   * A plain_text text object that defines the explanatory text that appears in the confirm dialog. Maximum length for the text in this field is 300 characters.
   */
  text: PlainTextObject;
  /**
   * A plain_text text object to define the text of the button that confirms the action. Maximum length for the text in this field is 30 characters.
   */
  confirm: PlainTextObject;
  /**
   * A plain_text text object to define the text of the button that cancels the action. Maximum length for the text in this field is 30 characters.
   */
  deny: PlainTextObject;
  /**
   * Defines the color scheme applied to the confirm button. A value of danger will display the button with a red background on desktop, or red text on mobile. A value of primary will display the button with a green background on desktop, or blue text on mobile. If this field is not provided, the default value will be primary.
   */
  style?: "primary" | "danger";
}
