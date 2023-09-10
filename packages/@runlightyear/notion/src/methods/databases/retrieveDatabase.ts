import { HttpProxyResponse } from "@runlightyear/lightyear";
import { NotionId } from "../../objects/types/NotionId";
import { Notion } from "../../Notion";
import { Database } from "../../objects/databases/Database";

export interface RetrieveDatabaseProps {
  /**
   * An identifier for the Notion database.
   */
  databaseId: NotionId;
}

export interface RetrieveDatabaseResponse extends HttpProxyResponse {
  data: Database;
}

export const retrieveDatabase =
  (self: Notion) =>
  async (props: RetrieveDatabaseProps): Promise<RetrieveDatabaseResponse> => {
    const { databaseId } = props;
    return self.get({
      url: `/databases/${databaseId}`,
    });
  };
