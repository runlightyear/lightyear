export interface DividerOptions {
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface Divider extends DividerOptions {
  type: "divider";
}

export default function divider(options: DividerOptions | undefined) {
  const { blockId } = options || {};

  return {
    type: "divider",
    blockId,
  };
}
