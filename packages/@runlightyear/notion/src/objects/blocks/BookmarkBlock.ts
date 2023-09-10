import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { BaseBlock } from "./BaseBlock";

export interface BookmarkBlock extends BaseBlock {
  type: "bookmark";
  bookmark: Bookmark;
}

export interface Bookmark {
  caption: Array<RichTextBlock>;
  url: string;
}

export interface BookmarkBlockInput {
  bookmark: {
    caption: Array<RichTextBlockInput>;
    url: string;
  };
}

export interface BookmarkInput {
  caption: Array<RichTextBlockInput>;
  url: string;
}
