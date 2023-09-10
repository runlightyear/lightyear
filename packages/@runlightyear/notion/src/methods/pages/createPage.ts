import { deCamelize, HttpProxyResponse } from "@runlightyear/lightyear";
import { Notion } from "../../Notion";
import { PageParentInput } from "../../objects/parents/PageParent";
import { DatabaseParentInput } from "../../objects/parents/DatabaseParent";
import { Page } from "../../objects/pages/Page";
import { BlockInput } from "../../objects/blocks/Block";
import { deCamelizeNotionProperties } from "../../util/deCamelizeNotionProperties";
import { PagePropertiesInput } from "../../objects/pages/PageProperties";

export interface CreatePageProps {
  /**
   * The parent page or database where the new page is inserted, represented as a JSON object with a page_id or database_id key, and the corresponding ID.
   */
  parent: PageParentInput | DatabaseParentInput;
  /**
   * The values of the page’s properties. If the parent is a database, then the schema must match the parent database’s properties. If the parent is a page, then the only valid object key is title.
   */
  properties: PagePropertiesInput;
  /**
   * The content to be rendered on the new page, represented as an array of block objects.
   */
  children?: Array<BlockInput>;
}

export interface CreatePageResponse extends HttpProxyResponse {
  data: Page;
}

export const createPage =
  (self: Notion) =>
  async (props: CreatePageProps): Promise<CreatePageResponse> => {
    const { parent, properties, children } = props;

    return await self.post({
      url: `/pages`,
      data: {
        // @ts-ignore
        parent: deCamelize(parent),
        properties: deCamelizeNotionProperties(properties),
        // @ts-ignore
        children: children ? deCamelize(children) : undefined,
      },
    });
  };
