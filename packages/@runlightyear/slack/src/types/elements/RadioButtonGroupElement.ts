import { OptionObject } from "../objects/OptionObject";
import { ConfirmationDialogObject } from "../objects/ConfirmationDialogObject";

export interface RadioButtonGroupElement {
  type: "radio_buttons";
  /**
   * An identifier for the action triggered when the radio button group is changed. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * An array of option objects. A maximum of 10 options are allowed.
   */
  options: Array<OptionObject>;
  /**
   * An option object that exactly matches one of the options within options. This option will be selected when the radio button group initially loads.
   */
  initialOption?: OptionObject;
  /**
   * A confirm object that defines an optional confirmation dialog that appears after clicking one of the radio buttons in this element.
   */
  confirm?: ConfirmationDialogObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
}
