import { BaseBlock } from "./BaseBlock";

export interface LinkPreviewBlock extends BaseBlock {
  type: "link_preview";
  linkPreview: LinkPreview;
}

export interface LinkPreview {
  url: string;
}

// The link_preview block can only be returned as part of a response. The API does not support creating or appending link_preview blocks.
