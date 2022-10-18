import { PlainText } from "./plainText";
import { TextObject } from "./index";

export interface ConfirmationDialog {
  title: PlainText;
  text: TextObject;
  confirm: PlainText;
  deny: PlainText;
  style?: "primary" | "danger";
}

export default function confirmationDialog(options: ConfirmationDialog) {
  const { title, text, confirm, deny, style } = options;

  return { title, text, confirm, deny, style };
}
