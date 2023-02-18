export interface DividerProps {
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface Divider extends DividerProps {
  type: "divider";
}

export default function divider(props: DividerProps | undefined) {
  const { blockId } = props || {};

  return {
    type: "divider",
    blockId,
  };
}
