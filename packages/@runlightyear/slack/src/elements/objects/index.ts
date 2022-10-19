import { PlainText } from "./plainText";
import { MarkdownText } from "./markdownText";
import { ConfirmationDialog } from "./confirmationDialog";

export type TextObject = PlainText | MarkdownText;
export type SlackObject = TextObject | ConfirmationDialog;
