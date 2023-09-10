import { HttpProxyResponse } from "@runlightyear/lightyear";
import { NotionId } from "../../objects/types/NotionId";
import { BlockList } from "../../objects/lists/BlockList";
import { Notion } from "../../Notion";

export interface RetrieveBlockChildrenProps {
  blockId: NotionId;
  /**
   * If supplied, this endpoint will return a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results.
   */
  startCursor?: string;
  /**
   * The number of items from the full list desired in the response. Maximum: 100
   */
  pageSize?: number;
}

export interface RetrieveBlockChildrenResponse extends HttpProxyResponse {
  data: BlockList;
}

export const retrieveBlockChildren =
  (self: Notion) =>
  async (
    params: RetrieveBlockChildrenProps
  ): Promise<RetrieveBlockChildrenResponse> => {
    const { blockId, startCursor, pageSize } = params;

    return self.get({
      url: `/blocks/${blockId}/children`,
      params: { start_cursor: startCursor, page_size: pageSize },
    });
  };
