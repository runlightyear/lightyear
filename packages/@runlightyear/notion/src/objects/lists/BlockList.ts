import { Block } from "../blocks/Block";

export interface BlockList {
  object: "list";
  results: Array<Block>;
  nextCursor: string | null;
  hasMore: boolean;
  type: "block";
  block: {};
}
