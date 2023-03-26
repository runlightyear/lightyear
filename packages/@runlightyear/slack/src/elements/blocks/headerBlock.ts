import { plainTextObject, PlainTextObject } from "../objects/plainTextObject";
import { markdownTextObject } from "../objects/markdownTextObject";

export interface HeaderProps {
  /**
   * The text for the block, in the form of a plain_text text object. Maximum length for the text in this field is 150 characters.
   */
  text: PlainTextObject;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface HeaderBlock extends HeaderProps {
  type: "header";
}

export function headerBlock(propsOrText: HeaderProps | string): HeaderBlock {
  if (typeof propsOrText === "string") {
    return {
      type: "header",
      text: plainTextObject(propsOrText),
    };
  }

  const { text, blockId } = propsOrText;

  return {
    type: "header",
    text,
    blockId,
  };
}
