import { NotionId } from "../types/NotionId";
import { NotionDate } from "../types/NotionDate";
import { PartialUser } from "../users/PartialUser";
import { RichTextBlock } from "../blocks/richText/RichTextBlock";
import { FileObject } from "../files/FileObject";
import { Emoji } from "../emojis/Emoji";
import { ExternalFile } from "../files/ExternalFile";
import { PageParent } from "../parents/PageParent";
import { BlockParent } from "../parents/BlockParent";
import { DatabaseProperties } from "./DatabaseProperties";

export interface Database {
  object: "database";
  id: NotionId;
  createdTime: NotionDate;
  createdBy: PartialUser;
  lastEditedTime: NotionDate;
  lastEditedBy: PartialUser;
  title: Array<RichTextBlock>;
  description: Array<RichTextBlock>;
  icon: FileObject | Emoji;
  cover: ExternalFile | null;
  properties: DatabaseProperties;
  parent: PageParent | BlockParent;
  url: string;
  archived: boolean;
  isInline: boolean;
  publicUrl: string | null;
}
