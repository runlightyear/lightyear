import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { BaseBlock, BaseBlockInput } from "./BaseBlock";
import { Color } from "../types/Color";
import { Block } from "./Block";

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  paragraph: Paragraph;
}

export interface Paragraph {
  richText: RichTextBlock[];
  color: Color;
  children: Block[];
}

export interface ParagraphBlockInput extends BaseBlockInput {
  paragraph: ParagraphInput;
}

export interface ParagraphInput {
  richText: RichTextBlockInput[];
  color?: Color;
  children?: Block[];
}
