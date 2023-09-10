import { NotionId } from "../../objects/types/NotionId";
import { PagePropertyInput } from "../../objects/pages/properties/PageProperty";
import { ExternalFile } from "../../objects/files/ExternalFile";
import { Emoji } from "../../objects/emojis/Emoji";
import { deCamelize, HttpProxyResponse } from "@runlightyear/lightyear";
import { Page } from "../../objects/pages/Page";
import { Notion } from "../../Notion";
import { deCamelizeNotionProperties } from "../../util/deCamelizeNotionProperties";
import { PagePropertiesInput } from "../../objects/pages/PageProperties";

export interface UpdatePagePropertiesProps {
  /**
   * The identifier for the Notion page to be updated.
   */
  pageId: NotionId;
  /**
   * The property values to update for the page. The keys are the names or IDs of the property and the values are property values. If a page property ID is not included, then it is not changed.
   */
  properties?: PagePropertiesInput;
  /**
   * Whether the page is archived (deleted). Set to true to archive a page. Set to false to un-archive (restore) a page.
   */
  archived?: boolean;
  /**
   * A page icon for the page. Supported types are external file object or emoji object.
   */
  icon?: ExternalFile | Emoji;
  /**
   * A cover image for the page. Only external file objects are supported.
   */
  cover?: ExternalFile;
}

export interface UpdatePagePropertiesResponse extends HttpProxyResponse {
  data: Page;
}

export const updatePageProperties =
  (self: Notion) =>
  async (
    props: UpdatePagePropertiesProps
  ): Promise<UpdatePagePropertiesResponse> => {
    const { pageId, properties, archived, icon, cover } = props;
    return self.patch({
      url: `/pages/${pageId}`,
      data: {
        properties: properties
          ? deCamelizeNotionProperties(properties)
          : undefined,
        archived,
        // @ts-ignore
        icon: icon ? deCamelize(icon) : undefined,
        // @ts-ignore
        cover: cover ? deCamelize(cover) : undefined,
      },
    });
  };
