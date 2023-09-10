import { NotionId } from "../types/NotionId";

export interface BlockParent {
  type: "block_id";
  blockId: NotionId;
}

export interface BlockParentInput {
  blockId: NotionId;
}
