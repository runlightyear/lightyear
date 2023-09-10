import {
  RichTextBlock,
  RichTextBlockInput,
} from "../../blocks/richText/RichTextBlock";

export interface RichTextProperty {
  id: string;
  type: "rich_text";
  richText: Array<RichTextBlock>;
}

export interface RichTextPropertyInput {
  richText: Array<RichTextBlockInput>;
}
