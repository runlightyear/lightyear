import { Color } from "../types/Color";
import { BaseBlock } from "./BaseBlock";

export interface TableOfContentsBlock extends BaseBlock {
  type: "table_of_contents";
  tableOfContents: TableOfContents;
}

export interface TableOfContents {
  color: Color;
}

// TODO: Handle input
