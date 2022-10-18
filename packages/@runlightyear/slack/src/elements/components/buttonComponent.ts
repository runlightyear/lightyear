import { PlainText } from "../objects/plainText";
import { SlackObject } from "../objects";

interface ButtonComponentOptions {
  text: PlainText;
  actionId: string;
  url?: string;
  value?: string;
  style?: string;
  confirm?: SlackObject;
  accessibilityLabel?: string;
}

export interface ButtonComponent extends ButtonComponentOptions {
  type: "button";
}

export default function buttonComponent(options: ButtonComponentOptions) {
  const { text, actionId, url, value, style, confirm, accessibilityLabel } =
    options;

  return {
    type: "button",
    text,
    actionId,
    url,
    value,
    style,
    confirm,
    accessibilityLabel,
  };
}
