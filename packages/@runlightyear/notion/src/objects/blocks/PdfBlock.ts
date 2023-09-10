import { BaseBlock } from "./BaseBlock";
import { FileObject } from "../files/FileObject";

export interface PdfBlock extends BaseBlock {
  type: "pdf";
  pdf: FileObject;
}

// TODO: Handle input
