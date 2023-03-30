import { HttpProxyResponse } from "@runlightyear/lightyear";
import { GoogleSheets } from "../GoogleSheets";

export interface ClearValuesProps {
  /**
   * The ID of the spreadsheet to update.
   */
  spreadsheetId: string;

  /**
   * The A1 notation or R1C1 notation of the values to clear.
   */
  range: string;
}

export interface ClearValuesResponseData {
  spreadsheetId: string;
  clearedRange: string;
}

export interface ClearValuesResponse extends HttpProxyResponse {
  data: ClearValuesResponseData;
}

export const clearValues =
  (self: GoogleSheets) =>
  async (props: ClearValuesProps): Promise<ClearValuesResponse> => {
    const { spreadsheetId, range } = props;

    return await self.post({
      url: `/spreadsheets/${spreadsheetId}/values/${range}:clear`,
    });
  };
