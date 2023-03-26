export interface PlainTextProps {
  /**
   * The text for the block. This field accepts any of the standard text formatting markup when type is mrkdwn. The maximum length is 3000 characters.
   */
  text: string;
  /**
   * Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when type is plain_text.
   */
  emoji?: boolean;
  /**
   * When set to false (as is default) URLs will be auto-converted into links, conversation names will be link-ified, and certain mentions will be automatically parsed.
   * Using a value of true will skip any preprocessing of this nature, although you can still include manual parsing strings. This field is only usable when type is mrkdwn.
   */
  verbatim?: boolean;
}

export interface PlainTextObject extends PlainTextProps {
  type: "plain_text";
}

export function plainTextObject(
  textOrProps: PlainTextProps | string
): PlainTextObject {
  if (typeof textOrProps === "string") {
    return {
      type: "plain_text",
      text: textOrProps,
    };
  }

  const { text, emoji, verbatim } = textOrProps;

  return {
    type: "plain_text",
    text,
    emoji,
    verbatim,
  };
}
