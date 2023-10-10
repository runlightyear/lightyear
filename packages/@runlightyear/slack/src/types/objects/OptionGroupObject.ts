import { PlainTextObject } from "./PlainTextObject";
import { OptionObject } from "./OptionObject";

export interface OptionGroupObject {
  /**
   * A plain_text text object that defines the label shown above this group of options. Maximum length for the text in this field is 75 characters.
   */
  label: PlainTextObject;
  /**
   * An array of option objects that belong to this specific group. Maximum of 100 items.
   */
  options: Array<OptionObject>;
}
