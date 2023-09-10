import { NotionId } from "../../types/NotionId";
import { NotionDate } from "../../types/NotionDate";

export interface CreatedTimeProperty {
  id: string;
  type: "created_time";
  createdTime: NotionDate;
}

/** Can't be updated **/
