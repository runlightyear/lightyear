import { BaseBlock } from "./BaseBlock";

export interface ChildDatabaseBlock extends BaseBlock {
  type: "child_database";
  childDatabase: ChildDatabase;
}

export interface ChildDatabase {
  title: string;
}

// TODO: can this be input?
