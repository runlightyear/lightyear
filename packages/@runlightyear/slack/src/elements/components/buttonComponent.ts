import { PlainText } from "../objects/plainText";
import { SlackObject } from "../objects";

interface ButtonComponentProps {
  text: PlainText;
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

export default function buttonComponent(props: ButtonComponentProps) {
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
