import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { queryDatabase, QueryDatabaseProps } from "./databases/queryDatabase";

/**
 * @beta
 */
export interface NotionProps extends AuthConnectorProps {}

/**
 * @beta
 */
export class Notion extends RestConnector {
  constructor(props: NotionProps) {
    super({ ...props, baseUrl: "https://api.notion.com/v1" });
  }

  authorizationHeaders(): { [p: string]: string } {
    return { ...super.authorizationHeaders(), "Notion-Version": "2022-06-28" };
  }

  async queryDatabase(props: QueryDatabaseProps) {
    return queryDatabase(this)(props);
  }
}
