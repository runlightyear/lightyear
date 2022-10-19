import { SlackObject, TextObject } from "../objects";
import markdownText from "../objects/markdownText";

export interface SectionOptions {
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

export interface Section extends SectionOptions {
  type: "section";
}

export default function section(
  optionsOrText: SectionOptions | string
): Section {
  if (typeof optionsOrText === "string") {
    return {
      type: "section",
      text: markdownText(optionsOrText),
    };
  }

  const { text, fields } = optionsOrText;

  return {
    type: "section",
    text: typeof text === "string" ? markdownText(text) : text,
    fields,
  };
}
