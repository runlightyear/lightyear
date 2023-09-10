import { NotionId } from "../types/NotionId";

export interface PageParent {
  type: "page_id";
  pageId: NotionId;
}

export interface PageParentInput {
  pageId: NotionId;
}
