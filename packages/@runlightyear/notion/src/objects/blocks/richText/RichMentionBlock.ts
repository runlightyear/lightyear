import { BaseRichBlock } from "./BaseRichBlock";
import {
  MentionDatabaseBlock,
  MentionDateBlock,
  MentionLinkPreviewBlock,
  MentionPageBlock,
} from "../MentionBlocks";

export interface RichMentionBlock extends BaseRichBlock {
  type: "mention";
  mention:
    | MentionDatabaseBlock
    | MentionDateBlock
    | MentionLinkPreviewBlock
    | MentionPageBlock;
}

// TODO: Handle input
