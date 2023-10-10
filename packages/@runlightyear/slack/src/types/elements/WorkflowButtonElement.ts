/**
 * type
 * String
 * The type of element. In this case type is always workflow_button.
 * Yes
 * text
 * Object
 * A text object that defines the button's text. Can only be of type: plain_text. text may truncate with ~30 characters. Maximum length for the text in this field is 75 characters.
 * Yes
 * workflow
 * Object
 * A workflow object that contains details about the workflow that will run when the button is clicked.
 * Yes
 * action_id
 * String
 * An identifier for the action. Use this when you receive an interaction payload to identify the source of the action. Every action_id in a block should be unique. Maximum length is 255 characters.
 * Yes
 * style
 * String
 * Decorates buttons with alternative visual color schemes. Use this option with restraint.
 *
 * primary gives buttons a green outline and text, ideal for affirmation or confirmation actions. primary should only be used for one button within a set.
 *
 * danger gives buttons a red outline and text, and should be used when the action is destructive. Use danger even more sparingly than primary.
 *
 * If you don't include this field, the default button style will be used.
 * No
 * accessibility_label
 * String
 * A label for longer descriptive text about a button element. This label will be read out by screen readers instead of the button text object. Maximum length is 75 characters.
 * No
 */
import { PlainTextObject } from "../objects/PlainTextObject";
import { WorkflowObject } from "../objects/WorkflowObject";

export interface WorkflowButtonElement {
  type: "workflow_button";
  /**
   * A text object that defines the button's text. Can only be of type: plain_text. text may truncate with ~30 characters. Maximum length for the text in this field is 75 characters.
   */
  text: PlainTextObject;
  /**
   * A workflow object that contains details about the workflow that will run when the button is clicked.
   */
  workflow: WorkflowObject;
  /**
   * An identifier for the action. Use this when you receive an interaction payload to identify the source of the action. Every action_id in a block should be unique. Maximum length is 255 characters.
   */
  actionId: string;
  /**
   * Decorates buttons with alternative visual color schemes. Use this option with restraint.
   */
  style?: "primary" | "danger";
  /**
   * A label for longer descriptive text about a button element. This label will be read out by screen readers instead of the button text object. Maximum length is 75 characters.
   */
  accessibilityLabel?: string;
}
