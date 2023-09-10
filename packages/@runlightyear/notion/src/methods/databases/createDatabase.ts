import { deCamelize, HttpProxyResponse } from "@runlightyear/lightyear";
import { PageParentInput } from "../../objects/parents/PageParent";
import { BlockParentInput } from "../../objects/parents/BlockParent";
import { RichTextBlockInput } from "../../objects/blocks/richText/RichTextBlock";
import { DatabasePropertyInput } from "../../objects/databases/properties/DatabaseProperty";
import { Database } from "../../objects/databases/Database";
import { Notion } from "../../Notion";
import { deCamelizeNotionProperties } from "../../util/deCamelizeNotionProperties";
import { DatabasePropertiesInput } from "../../objects/databases/DatabaseProperties";

export interface CreateDatabaseProps {
  parent: PageParentInput | BlockParentInput;
  title: Array<RichTextBlockInput>;
  properties: DatabasePropertiesInput;
}

export interface CreateDatabaseResponse extends HttpProxyResponse {
  data: Database;
}

export const createDatabase =
  (self: Notion) =>
  async (props: CreateDatabaseProps): Promise<CreateDatabaseResponse> => {
    const { parent, title, properties } = props;

    return self.post({
      url: `/databases`,
      data: {
        // @ts-ignore
        parent: parent ? deCamelize(parent) : undefined,
        // @ts-ignore
        title: title ? deCamelize(title) : undefined,
        properties: properties
          ? deCamelizeNotionProperties(properties)
          : undefined,
      },
    });
  };
