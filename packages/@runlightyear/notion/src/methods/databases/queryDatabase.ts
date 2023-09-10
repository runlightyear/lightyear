import { NotionId } from "../../objects/types/NotionId";
import { Filter } from "../../objects/filters/Filter";
import { SortCriteria } from "../../objects/sorting/SortCriteria";
import { Notion } from "../../Notion";
import { deCamelize, HttpProxyResponse } from "@runlightyear/lightyear";
import { PageOrDatabaseList } from "../../objects/lists/PageOrDatabaseList";

export interface QueryDatabaseProps {
  /**
   * Identifier for a Notion database.
   */
  databaseId: NotionId;

  /**
   * (DOES NOT WORK YET)
   *
   * A list of page property value IDs associated with the database. Use this param to limit the response to a specific page property value or values for pages that meet the filter criteria.
   */
  filterProperties?: string;

  /**
   * When supplied, limits which pages are returned based on the filter conditions.
   */
  filter?: Filter;

  /**
   * When supplied, orders the results based on the provided sort criteria.
   */
  sorts?: Array<SortCriteria>;

  /**
   * When supplied, returns a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results.
   */
  startCursor?: string;

  /**
   * The number of items from the full list desired in the response. Maximum: 100
   */
  pageSize?: number;
}

export interface QueryDatabaseResponse extends HttpProxyResponse {
  data: PageOrDatabaseList;
}

export const queryDatabase =
  (self: Notion) =>
  async (props: QueryDatabaseProps): Promise<QueryDatabaseResponse> => {
    const {
      databaseId,
      filterProperties,
      filter,
      sorts,
      startCursor,
      pageSize,
    } = props;

    return await self.post({
      url: `/databases/${databaseId}/query`,
      params: {
        filterProperties,
      },
      data: {
        // @ts-ignore For now
        filter: filter && deCamelize(filter),
        sorts,
        start_cursor: startCursor,
        page_size: pageSize,
      },
    });
  };
