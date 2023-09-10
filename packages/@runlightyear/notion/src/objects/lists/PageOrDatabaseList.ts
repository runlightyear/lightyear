import { Page } from "../pages/Page";

export interface PageOrDatabaseList {
  object: "list";
  results: Array<Page>;
  nextCursor: string | null;
  hasMore: boolean;
  type: "page_or_database";
  pageOrDatabase: {};
}
