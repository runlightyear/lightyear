import { OptionObject } from "../objects/OptionObject";
import { SlackObject } from "../objects/SlackObject";

export interface CheckboxesElement {
  type: "checkboxes";
  actionId?: string;
  options: Array<OptionObject>;
  initialOptions?: Array<OptionObject>;
  confirm?: SlackObject;
  focusOnLoad?: boolean;
}
