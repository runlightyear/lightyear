import { TextObject } from "./TextObject";
import { ConfirmationDialogObject } from "./ConfirmationDialogObject";
import { ConversationFilterObject } from "./ConversationFilterObject";
import { DispatchActionConfigurationObject } from "./DispatchActionConfigurationObject";
import { MarkdownTextObject } from "./MarkdownTextObject";
import { OptionGroupObject } from "./OptionGroupObject";
import { PlainTextObject } from "./PlainTextObject";
import { TriggerObject } from "./TriggerObject";
import { WorkflowObject } from "./WorkflowObject";

export type SlackObject =
  | ConfirmationDialogObject
  | ConversationFilterObject
  | DispatchActionConfigurationObject
  | MarkdownTextObject
  | OptionGroupObject
  | PlainTextObject
  | TextObject
  | TriggerObject
  | WorkflowObject;
