import { BookmarkBlock, BookmarkBlockInput } from "./BookmarkBlock";
import { BreadcrumbBlock, BreadcrumbBlockInput } from "./BreadcrumbBlock";
import {
  BulletedListItemBlock,
  BulletedListItemBlockInput,
} from "./BulletedListItemBlock";
import { CalloutBlock, CalloutBlockInput } from "./CalloutBlock";
import { ChildDatabaseBlock } from "./ChildDatabaseBlock";
import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { ChildPageBlock } from "./ChildPageBlock";
import { CodeBlock, CodeBlockInput } from "./CodeBlock";
import { ColumnBlock, ColumnBlockInput } from "./ColumnBlock";
import { ColumnListBlock, ColumnListBlockInput } from "./ColumnListBlock";
import { DividerBlock, DividerBlockInput } from "./DividerBlock";
import { EmbedBlock, EmbedBlockInput } from "./EmbedBlock";
import { EquationBlock, EquationBlockInput } from "./EquationBlock";
import { FileBlock } from "./FileBlock";
import {
  Heading1Block,
  Heading1BlockInput,
  Heading2Block,
  Heading2BlockInput,
  Heading3Block,
  Heading3BlockInput,
} from "./HeadingBlocks";
import { ImageBlock } from "./ImageBlock";
import { LinkPreviewBlock } from "./LinkPreviewBlock";
import {
  MentionDatabaseBlock,
  MentionDateBlock,
  MentionLinkPreviewBlock,
  MentionPageBlock,
  MentionUserBlock,
} from "./MentionBlocks";
import {
  NumberedListItemBlock,
  NumberedListItemBlockInput,
} from "./NumberedListItemBlock";
import { ParagraphBlock, ParagraphBlockInput } from "./ParagraphBlock";
import { PdfBlock } from "./PdfBlock";
import { QuoteBlock, QuoteBlockInput } from "./QuoteBlock";
import { VideoBlock } from "./VideoBlock";
import { ToggleBlock, ToggleBlockInput } from "./ToggleBlock";
import { ToDoBlock, ToDoBlockInput } from "./ToDoBlock";
import { TableRowBlock } from "./TableRowBlock";
import { TableOfContentsBlock } from "./TableOfContentsBlock";
import { TableBlock } from "./TableBlock";
import { SyncedBlock } from "./SyncedBlock";
import { RichEquationBlockInput } from "./richText/RichEquationBlock";

export type Block =
  | BookmarkBlock
  | BreadcrumbBlock
  | BulletedListItemBlock
  | CalloutBlock
  | ChildDatabaseBlock
  | ChildPageBlock
  | CodeBlock
  | ColumnBlock
  | ColumnListBlock
  | DividerBlock
  | EmbedBlock
  | EquationBlock
  | FileBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | LinkPreviewBlock
  | MentionDatabaseBlock
  | MentionDateBlock
  | MentionLinkPreviewBlock
  | MentionPageBlock
  | MentionUserBlock
  | NumberedListItemBlock
  | ParagraphBlock
  | PdfBlock
  | QuoteBlock
  | RichTextBlock
  | SyncedBlock
  | TableBlock
  | TableOfContentsBlock
  | TableRowBlock
  | ToDoBlock
  | ToggleBlock
  | VideoBlock;

export type BlockInput =
  | BookmarkBlockInput
  | BreadcrumbBlockInput
  | BulletedListItemBlockInput
  | CalloutBlockInput
  | CodeBlockInput
  | ColumnBlockInput
  | ColumnListBlockInput
  | DividerBlockInput
  | EmbedBlockInput
  | EquationBlockInput
  | Heading1BlockInput
  | Heading2BlockInput
  | Heading3BlockInput
  | NumberedListItemBlockInput
  | QuoteBlockInput
  | ParagraphBlockInput
  | ToDoBlockInput
  | ToggleBlockInput;
