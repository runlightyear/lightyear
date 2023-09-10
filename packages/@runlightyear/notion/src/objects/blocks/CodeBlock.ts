import { RichTextBlock } from "./richText/RichTextBlock";
import { BaseBlock, BaseBlockInput } from "./BaseBlock";

export interface CodeBlock extends BaseBlock {
  type: "code";
  code: Code;
}

export interface Code {
  caption: RichTextBlock[];
  richText: RichTextBlock[];
  language: string;
}

export interface CodeBlockInput extends BaseBlockInput {
  code: CodeInput;
}

export interface CodeInput {
  richText: RichTextBlock[];
  caption?: RichTextBlock[];
  language?: string;
}
