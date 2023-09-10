import { PartialUser } from "../../users/PartialUser";

export interface CreatedByProperty {
  id: string;
  type: "created_by";
  createdBy: PartialUser;
}

/** Can't be updated **/
