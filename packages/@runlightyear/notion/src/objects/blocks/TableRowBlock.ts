import { RichTextBlock } from "./richText/RichTextBlock";
import { BaseBlock } from "./BaseBlock";

export interface TableRowBlock extends BaseBlock {
  type: "table_row";
  tableRow: TableRow;
}

export interface TableRow {
  cells: Array<Array<RichTextBlock>>;
}

// TODO: Handle input
