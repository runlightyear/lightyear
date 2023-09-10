import { BaseBlock } from "./BaseBlock";
import { Block } from "./Block";
import { NotionId } from "../types/NotionId";

export interface SyncedBlock extends BaseBlock {
  type: "synced_block";
  syncedBlock: OriginalSyncedBlock | DuplicateSyncedBlock;
}

export interface OriginalSyncedBlock {
  syncedFrom: null;
  children: Block[];
}

export interface DuplicateSyncedBlock {
  syncedFrom: {
    blockId: NotionId;
  };
}

// TODO: Handle input
