import { BaseBlock, BaseBlockInput } from "./BaseBlock";
import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { Color } from "../types/Color";
import { Block, BlockInput } from "./Block";

export interface NumberedListItemBlock extends BaseBlock {
  type: "numbered_list_item";
  numberedListItem: NumberedListItem;
}

export interface NumberedListItem {
  richText: Array<RichTextBlock>;
  color: Color;
  children: Array<Block>;
}

export interface NumberedListItemBlockInput extends BaseBlockInput {
  numberedListItem: NumberedListItemInput;
}

export interface NumberedListItemInput {
  richText: Array<RichTextBlockInput>;
  color?: Color;
  children?: Array<BlockInput>;
}
