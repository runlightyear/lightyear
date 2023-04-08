import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Salesforce } from "../Salesforce";
import { SRecord } from "../types/SRecord";

/**
 * You must specify either q or nextRecordsUrl.
 */
export interface QueryProps {
  /**
   * The SOQL query
   */
  q?: string;

  /**
   * The nextRecordsUrl from a previous query
   */
  nextRecordsUrl?: string;
}

export interface QueryResponseData {
  done: boolean;
  totalSize: number;
  records: Array<SRecord>;
  nextRecordsUrl?: string;
}

export interface QueryResponse extends HttpProxyResponse {
  data: QueryResponseData;
}

export const query =
  (self: Salesforce) =>
  async (props: QueryProps): Promise<QueryResponse> => {
    const { q, nextRecordsUrl } = props;

    if (q && nextRecordsUrl) {
      throw new Error("You cannot specify both q and nextRecordsUrl");
    }

    if (q) {
      return await self.get({
        url: `/query/`,
        params: {
          q,
        },
      });
    } else if (nextRecordsUrl) {
      const [_, cursor] = nextRecordsUrl.split("/query/");

      return await self.get({ url: `/query/${cursor}` });
    } else {
      throw new Error("You must specify either q or nextRecordsUrl");
    }
  };
