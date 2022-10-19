interface PlainTextOptions {
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

export interface PlainText extends PlainTextOptions {
  type: "plain_text";
}

export default function plainText(
  textOrOptions: PlainTextOptions | string
): PlainText {
  if (typeof textOrOptions === "string") {
    return {
      type: "plain_text",
      text: textOrOptions,
    };
  }

  const { text, emoji, verbatim } = textOrOptions;

  return {
    type: "plain_text",
    text,
    emoji,
    verbatim,
  };
}
