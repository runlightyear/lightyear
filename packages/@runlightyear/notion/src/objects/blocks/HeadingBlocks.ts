import { BaseBlock } from "./BaseBlock";
import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { Color } from "../types/Color";

export interface Heading1Block extends BaseBlock {
  type: "heading_1";
  heading1: Heading;
}

export interface Heading1BlockInput {
  heading1: HeadingInput;
}

export interface Heading2Block extends BaseBlock {
  type: "heading_2";
  heading2: Heading;
}

export interface Heading2BlockInput {
  heading2: HeadingInput;
}

export interface Heading3Block extends BaseBlock {
  type: "heading_3";
  heading3: Heading;
}

export interface Heading3BlockInput {
  heading3: HeadingInput;
}

export interface Heading {
  richText: Array<RichTextBlock>;
  color: Color;
  isToggleable: boolean;
}

export interface HeadingInput {
  richText: Array<RichTextBlockInput>;
  color?: Color;
  isToggleable?: boolean;
}
