import { BaseBlock } from "./BaseBlock";
import { RichTextBlock } from "./richText/RichTextBlock";
import { InternalFile } from "../files/InternalFile";
import { ExternalFile } from "../files/ExternalFile";

export interface FileBlock extends BaseBlock {
  type: "file";
  file: CaptionedInternalFile | CaptionedExternalFile;
}

export interface CaptionedInternalFile extends InternalFile {
  caption: Array<RichTextBlock>;
}

export interface CaptionedExternalFile extends ExternalFile {
  caption: Array<RichTextBlock>;
}

// TODO: Handle input
