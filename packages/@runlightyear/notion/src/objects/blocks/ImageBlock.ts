import { BaseBlock } from "./BaseBlock";
import { FileObject } from "../files/FileObject";

export interface ImageBlock extends BaseBlock {
  type: "image";
  image: FileObject;
}

// TODO: Handle input
