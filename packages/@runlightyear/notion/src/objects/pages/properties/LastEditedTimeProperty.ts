import { NotionDate } from "../../types/NotionDate";

export interface LastEditedTimeProperty {
  id: string;
  type: "last_edited_time";
  lastEditedTime: NotionDate;
}

/** Can't be updated **/
