import { DispatchActionConfigurationObject } from "../objects/DispatchActionConfigurationObject";

export interface UrlInputElement {
  type: "url_text_input";
  /**
   * An identifier for the input value when the parent modal is submitted. You can use this when you receive a view_submission payload to identify the value of the input element. Should be unique among all other action_ids in the containing block. Maximum length is 255 characters.
   */
  actionId?: string;
  /**
   * The initial value in the URL input when it is loaded.
   */
  initialValue?: string;
  /**
   * A dispatch configuration object that determines when during text input the element returns a block_actions payload.
   */
  dispatchActionConfig?: DispatchActionConfigurationObject;
  /**
   * Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.
   */
  focusOnLoad?: boolean;
  /**
   * A plain_text only text object that defines the placeholder text shown in the URL input. Maximum length for the text in this field is 150 characters.
   */
  placeholder?: string;
}
