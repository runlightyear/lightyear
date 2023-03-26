import { PlainTextObject } from "./plainTextObject";
import { MarkdownTextObject } from "./markdownTextObject";

export type TextObject = PlainTextObject | MarkdownTextObject;
export type SlackObject = TextObject;
