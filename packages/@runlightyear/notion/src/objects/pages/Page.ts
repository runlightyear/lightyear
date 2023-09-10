import { NotionId } from "../types/NotionId";
import { NotionDate } from "../types/NotionDate";
import { PartialUser } from "../users/PartialUser";
import { Emoji } from "../emojis/Emoji";
import { PageParent } from "../parents/PageParent";
import { DatabaseParent } from "../parents/DatabaseParent";
import { BlockParent } from "../parents/BlockParent";
import { WorkspaceParent } from "../parents/WorkspaceParent";
import { ExternalFile } from "../files/ExternalFile";
import { PageProperties } from "./PageProperties";

export interface Page {
  object: "page";
  id: NotionId;
  createdTime: NotionDate;
  createdBy: PartialUser;
  lastEditedTime: NotionDate;
  lastEditedBy: PartialUser;
  archived: boolean;
  icon: ExternalFile | Emoji;
  cover: ExternalFile | null;
  properties: PageProperties;
  parent: PageParent | DatabaseParent | BlockParent | WorkspaceParent;
  url: string;
  publicUrl: string;
}
