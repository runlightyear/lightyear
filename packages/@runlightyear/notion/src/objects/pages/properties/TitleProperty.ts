import {
  RichTextBlock,
  RichTextBlockInput,
} from "../../blocks/richText/RichTextBlock";

export interface TitleProperty {
  id: string;
  type: "title";
  title: Array<RichTextBlock>;
}

export interface TitlePropertyInput {
  title: Array<RichTextBlockInput>;
}
