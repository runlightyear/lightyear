import { ImageBlock } from "./ImageBlock";
import { TextObject } from "../objects/TextObject";

export interface ContextBlock {
  type: "context";
  /**
   * An array of image elements and text objects. Maximum number of items is 10.
   */
  elements: Array<ImageBlock | TextObject>;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}
