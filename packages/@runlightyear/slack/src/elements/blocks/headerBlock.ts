import { PlainTextObject } from "../objects/plainTextObject";

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

export function headerBlock(props: HeaderProps) {
  const { text, blockId } = props;

  return {
    type: "header",
    text,
    blockId,
  };
}
