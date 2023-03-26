import { PlainTextObject } from "../objects/plainTextObject";
import { SlackObject } from "../objects";

export interface ButtonComponentProps {
  text: PlainTextObject;
  actionId: string;
  url?: string;
  value?: string;
  style?: string;
  confirm?: SlackObject;
  accessibilityLabel?: string;
}

export interface ButtonComponent extends ButtonComponentProps {
  type: "button";
}

export function buttonComponent(props: ButtonComponentProps) {
  const { text, actionId, url, value, style, confirm, accessibilityLabel } =
    props;

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
