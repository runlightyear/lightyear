import { ContextBlock } from "./contextBlock";
import { SectionBlock } from "./sectionBlock";
import { DividerBlock } from "./dividerBlock";
import { HeaderBlock } from "./headerBlock";
import { ImageBlock } from "./imageBlock";

export type Block =
  | ContextBlock
  | DividerBlock
  | HeaderBlock
  | ImageBlock
  | SectionBlock;
