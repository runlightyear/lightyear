import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Salesforce } from "../Salesforce";
import { SRecord } from "../types/SRecord";

/**
 * You must specify either q or nextRecordsUrl.
 */
export interface QueryAllProps {
  /**
   * The SOQL query
   */
  q?: string;

  /**
   * The nextRecordsUrl from a previous query
   */
  nextRecordsUrl?: string;
}

export interface QueryAllResponseData {
  done: boolean;
  totalSize: number;
  records: Array<SRecord>;
  nextRecordsUrl?: string;
}

export interface QueryAllResponse extends HttpProxyResponse {
  data: QueryAllResponseData;
}

export const queryAll =
  (self: Salesforce) =>
  async (props: QueryAllProps): Promise<QueryAllResponse> => {
    const { q, nextRecordsUrl } = props;

    if (q && nextRecordsUrl) {
      throw new Error("You cannot specify both q and nextRecordsUrl");
    }

    if (q) {
      return await self.get({
        url: `/queryAll/`,
        params: {
          q,
        },
      });
    } else if (nextRecordsUrl) {
      const [_, cursor] = nextRecordsUrl.split("/queryAll/");

      return await self.get({ url: `/queryAll/${cursor}` });
    } else {
      throw new Error("You must specify either q or nextRecordsUrl");
    }
  };
