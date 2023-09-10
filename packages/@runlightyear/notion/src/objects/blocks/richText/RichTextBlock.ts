import { BaseRichBlock, BaseRichBlockInput } from "./BaseRichBlock";

export interface RichTextBlock extends BaseRichBlock {
  type: "text";
  text: RichTextBlockText;
}

export interface RichTextBlockText {
  content: string;
  link: RichTextBlockTextLink | null;
}

export interface RichTextBlockInput extends BaseRichBlockInput {
  text: RichTextBlockTextInput;
}

export interface RichTextBlockTextInput {
  content: string;
  link?: RichTextBlockTextLink | null;
}

export interface RichTextBlockTextLink {
  url: string;
}
