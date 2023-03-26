import { SlackObject } from "../objects";

export interface ActionsProps {
  /**
   * An array of interactive element objects - buttons, select menus, overflow menus, or date pickers. There is a maximum of 25 elements in each action block.
   */
  elements: SlackObject[];
  /**
   * A string acting as a unique identifier for a block. If not specified, a block_id will be generated. You can use this block_id when you receive an interaction payload to identify the source of the action. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface ActionsBlock extends ActionsProps {
  type: "actions";
}

export function actionsBlock(props: ActionsProps): ActionsBlock {
  const { elements, blockId } = props;

  return {
    type: "actions",
    elements,
    blockId,
  };
}
