import { ActionsBlock } from "./actionsBlock";
import { ContextBlock } from "./contextBlock";
import { SectionBlock } from "./sectionBlock";
import { DividerBlock } from "./dividerBlock";
import { FileBlock } from "./fileBlock";
import { HeaderBlock } from "./headerBlock";
import { ImageBlock } from "./imageBlock";
import { VideoBlock } from "./videoBlock";

export type Block =
  | ActionsBlock
  | ContextBlock
  | DividerBlock
  | FileBlock
  | HeaderBlock
  | ImageBlock
  | SectionBlock
  | VideoBlock;
