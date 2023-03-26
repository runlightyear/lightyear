import { SlackObject, TextObject } from "../objects";
import { markdownTextObject } from "../objects/markdownTextObject";

export interface SectionProps {
  /**
   * The text for the block, in the form of a text object. Maximum length for the text in this field is 3000 characters. This field is not required if a valid array of fields objects is provided instead.
   */
  text?: TextObject | string;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. You can use this block_id when you receive an interaction payload to identify the source of the action. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
  /**
   * Required if no text is provided. An array of text objects. Any text objects included with fields will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10. Maximum length for the text in each item is 2000 characters.
   */
  fields?: TextObject[];
  accessory?: SlackObject;
}

export interface SectionBlock extends SectionProps {
  type: "section";
}

export function sectionBlock(propsOrText: SectionProps | string): SectionBlock {
  if (typeof propsOrText === "string") {
    return {
      type: "section",
      text: markdownTextObject(propsOrText),
    };
  }

  const { text, fields } = propsOrText;

  return {
    type: "section",
    text: typeof text === "string" ? markdownTextObject(text) : text,
    fields,
  };
}
