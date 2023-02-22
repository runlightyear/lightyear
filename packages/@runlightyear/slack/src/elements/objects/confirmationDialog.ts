import { PlainText } from "./plainText";
import { TextObject } from "./index";

export interface ConfirmationDialog {
  title: PlainText;
  text: TextObject;
  confirm: PlainText;
  deny: PlainText;
  style?: "primary" | "danger";
}

export default function confirmationDialog(props: ConfirmationDialog) {
  const { title, text, confirm, deny, style } = props;

  return { title, text, confirm, deny, style };
}
