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
