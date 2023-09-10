import { NotionId } from "../types/NotionId";

export interface DatabaseParent {
  type: "database_id";
  databaseId: NotionId;
}

export interface DatabaseParentInput {
  databaseId: NotionId;
}
