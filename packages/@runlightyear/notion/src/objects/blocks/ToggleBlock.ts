import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { BaseBlock, BaseBlockInput } from "./BaseBlock";
import { Color } from "../types/Color";
import { Block, BlockInput } from "./Block";

export interface ToggleBlock extends BaseBlock {
  type: "toggle";
  toggle: Toggle;
}

export interface Toggle {
  richText: Array<RichTextBlock>;
  color: Color;
  children: Array<Block>;
}

export interface ToggleBlockInput extends BaseBlockInput {
  toggle: ToggleInput;
}

export interface ToggleInput {
  richText: Array<RichTextBlockInput>;
  color?: Color;
  children?: Array<BlockInput>;
}
