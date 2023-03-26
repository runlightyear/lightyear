export interface DividerProps {
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface DividerBlock extends DividerProps {
  type: "divider";
}

export function dividerBlock(props: DividerProps | undefined): DividerBlock {
  const { blockId } = props || {};

  return {
    type: "divider",
    blockId,
  };
}
