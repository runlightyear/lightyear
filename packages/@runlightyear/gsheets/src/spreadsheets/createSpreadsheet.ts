import { GoogleSheets } from "../GoogleSheets";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface CreateSpreadsheetProps {
  /**
   * The title of the new spreadsheet
   */
  title: string;
}

export interface CreateSpreadsheetResponseData {
  spreadsheetId: string;
  spreadsheetUrl: string;
}

export interface CreateSpreadsheetResponse extends HttpProxyResponse {
  data: CreateSpreadsheetResponseData;
}

export const createSpreadsheet =
  (self: GoogleSheets) =>
  async (props: CreateSpreadsheetProps): Promise<CreateSpreadsheetResponse> => {
    const { title } = props;

    const response = await self.post({
      url: `/spreadsheets`,
      data: {
        properties: {
          title,
        },
      },
    });

    return {
      ...response,
      data: {
        spreadsheetId: response.data.spreadsheetId,
        spreadsheetUrl: response.data.spreadsheetUrl,
      },
    };
  };
