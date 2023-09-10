import { FileObject } from "../files/FileObject";
import { BaseBlock } from "./BaseBlock";

export interface VideoBlock extends BaseBlock {
  type: "video";
  video: FileObject;
}

// TODO: Handle input
