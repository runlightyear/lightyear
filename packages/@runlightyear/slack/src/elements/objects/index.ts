import { PlainTextObject } from "./plainTextObject";
import { MarkdownTextObject } from "./markdownTextObject";
import { ConfirmationDialogObject } from "./confirmationDialogObject";

export type TextObject = PlainTextObject | MarkdownTextObject;
export type SlackObject = TextObject | ConfirmationDialogObject;
