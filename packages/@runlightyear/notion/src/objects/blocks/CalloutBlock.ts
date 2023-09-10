import { RichTextBlock } from "./richText/RichTextBlock";
import { Emoji } from "../emojis/Emoji";
import { Color } from "../types/Color";
import { BaseBlock, BaseBlockInput } from "./BaseBlock";

export interface CalloutBlock extends BaseBlock {
  type: "callout";
  callout: Callout;
}

export interface Callout {
  richText: Array<RichTextBlock>;
  icon: Emoji | File;
  color: Color;
}

export interface CalloutBlockInput extends BaseBlockInput {
  callout: CalloutInput;
}

export interface CalloutInput {
  richText: Array<RichTextBlock>;
  icon?: Emoji | File;
  color?: Color;
}
