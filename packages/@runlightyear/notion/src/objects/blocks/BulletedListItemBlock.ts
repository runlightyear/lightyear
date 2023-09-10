import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { Color } from "../types/Color";
import { BaseBlock, BaseBlockInput } from "./BaseBlock";
import { Block, BlockInput } from "./Block";

export interface BulletedListItemBlock extends BaseBlock {
  type: "bulleted_list_item";
  bulletedListItem: BulletedListItem;
}

export interface BulletedListItem {
  richText: Array<RichTextBlock>;
  color: Color;
  children: Array<Block>;
}

export interface BulletedListItemBlockInput extends BaseBlockInput {
  bulletedListItem: BulletedListItemInput;
}

export interface BulletedListItemInput {
  richText: Array<RichTextBlockInput>;
  color?: Color;
  children?: Array<BlockInput>;
}
