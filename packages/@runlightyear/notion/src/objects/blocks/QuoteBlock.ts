import { BaseBlock, BaseBlockInput } from "./BaseBlock";
import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { Color } from "../types/Color";
import { Block, BlockInput } from "./Block";

export interface QuoteBlock extends BaseBlock {
  type: "quote";
  quote: Quote;
}

export interface Quote {
  richText: RichTextBlock[];
  color: Color;
  children: Block[];
}

export interface QuoteBlockInput extends BaseBlockInput {
  quote: QuoteInput;
}

export interface QuoteInput {
  richText: RichTextBlockInput[];
  color?: Color;
  children?: BlockInput[];
}
