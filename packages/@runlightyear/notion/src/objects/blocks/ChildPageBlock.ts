import { BaseBlock } from "./BaseBlock";

export interface ChildPageBlock extends BaseBlock {
  type: "child_page";
  childPage: ChildPage;
}

export interface ChildPage {
  title: string;
}

// TODO: can this be input?
