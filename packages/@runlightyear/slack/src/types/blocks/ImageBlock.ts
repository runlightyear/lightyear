import { PlainTextObject } from "../objects/PlainTextObject";

export interface ImageBlock {
  type: "image";
  /**
   * The URL of the image to be displayed. Maximum length for this field is 3000 characters.
   */
  imageUrl: string;
  /**
   * A plain-text summary of the image. This should not contain any markup. Maximum length for this field is 2000 characters.
   */
  altText: string;
  /**
   * An optional title for the image in the form of a text object that can only be of type: plain_text. Maximum length for the text in this field is 2000 characters.
   */
  title?: PlainTextObject;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}
