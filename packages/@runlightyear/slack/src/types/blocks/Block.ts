import { ContextBlock } from "./ContextBlock";
import { SectionBlock } from "./SectionBlock";
import { DividerBlock } from "./DividerBlock";
import { HeaderBlock } from "./HeaderBlock";
import { ImageBlock } from "./ImageBlock";
import { ActionsBlock } from "./ActionsBlock";
import { FileBlock } from "./FileBlock";

export type Block =
  | ActionsBlock
  | ContextBlock
  | DividerBlock
  | FileBlock
  | HeaderBlock
  | ImageBlock
  | SectionBlock;

export type BlockInput =
  | ActionsBlock
  | ContextBlock
  | DividerBlock
  | HeaderBlock
  | ImageBlock
  | SectionBlock;
