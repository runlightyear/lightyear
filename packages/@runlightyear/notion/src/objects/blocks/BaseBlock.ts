import { PageParent } from "../parents/PageParent";
import { DatabaseParent } from "../parents/DatabaseParent";
import { BlockParent } from "../parents/BlockParent";
import { NotionDate } from "../types/NotionDate";
import { PartialUser } from "../users/PartialUser";

export interface BaseBlock {
  object: "block";
  id: string;
  parent: PageParent | DatabaseParent | BlockParent;
  createdTime: NotionDate;
  createdBy: PartialUser;
  lastEditedTime: NotionDate;
  lastEditedBy: PartialUser;
  archived: boolean;
  hasChildren: boolean;
}

export interface BaseBlockInput {}
