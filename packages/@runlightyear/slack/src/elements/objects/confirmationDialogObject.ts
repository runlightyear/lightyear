import { PlainTextObject } from "./plainTextObject";
import { TextObject } from "./index";

export interface ConfirmationDialogObject {
  title: PlainTextObject;
  text: TextObject;
  confirm: PlainTextObject;
  deny: PlainTextObject;
  style?: "primary" | "danger";
}

export function confirmationDialogObject(props: ConfirmationDialogObject) {
  const { title, text, confirm, deny, style } = props;

  return { title, text, confirm, deny, style };
}
