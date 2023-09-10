import { NotionId } from "../../objects/types/NotionId";
import { Page } from "../../objects/pages/Page";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Notion } from "../../Notion";

export interface RetrievePageProps {
  /**
   * Identifier for a Notion page
   */
  pageId: NotionId;
  /**
   * (DOES NOT WORK YET)
   *
   * A list of page property value IDs associated with the page. Use this param to limit the response to a specific page property value or values.
   */
  filterProperties?: string | Array<string>;
}

export interface RetrievePageResponse extends HttpProxyResponse {
  data: Page;
}

export const retrievePage =
  (self: Notion) =>
  async (props: RetrievePageProps): Promise<RetrievePageResponse> => {
    const { pageId, filterProperties } = props;

    return await self.get({
      url: `/pages/${pageId}`,
      params: {
        filter_properties: Array.isArray(filterProperties)
          ? filterProperties.join(",")
          : filterProperties,
      },
    });
  };
