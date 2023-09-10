import { PartialUser } from "../../users/PartialUser";

export interface LastEditedByProperty {
  id: string;
  type: "last_edited_by";
  lastEditedBy: PartialUser;
}

/** Can't be updated **/
