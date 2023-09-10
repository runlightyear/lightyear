import { RichTextBlock, RichTextBlockInput } from "./richText/RichTextBlock";
import { BaseBlock, BaseBlockInput } from "./BaseBlock";
import { Color } from "../types/Color";
import { Block, BlockInput } from "./Block";

export interface ToDoBlock extends BaseBlock {
  type: "to_do";
  toDo: ToDo;
}

export interface ToDo {
  richText: Array<RichTextBlock>;
  checked: boolean;
  color: Color;
  children: Array<Block>;
}

export interface ToDoBlockInput extends BaseBlockInput {
  toDo: ToDoInput;
}

export interface ToDoInput {
  richText: Array<RichTextBlockInput>;
  checked?: boolean;
  color?: Color;
  children?: Array<BlockInput>;
}
