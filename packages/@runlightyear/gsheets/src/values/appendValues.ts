import { ValueInputOption } from "../types/ValueInputOption";
import { InsertDataOption } from "../types/InsertDataOption";
import { ValueRenderOption } from "../types/ValueRenderOption";
import { DateTimeRenderOption } from "../types/DateTimeRenderOption";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { UpdateValuesResponseData } from "../types/UpdateValuesResponseData";
import { GoogleSheets } from "../GoogleSheets";
import { ValueRange } from "../types/ValueRange";

export interface AppendValuesProps {
  /**
   * The ID of the spreadsheet to update.
   */
  spreadsheetId: string;

  /**
   * The A1 notation of a range to search for a logical table of data. Values are appended after the last row of the table.
   */
  range: string;

  /**
   * How the input data should be interpreted.
   */
  valueInputOption: ValueInputOption;

  /**
   * How the input data should be inserted.
   */
  insertDataOption?: InsertDataOption;

  /**
   * Determines if the update response should include the values of the cells that were appended. By default, responses do not include the updated values.
   */
  includeValuesInResponse?: boolean;

  /**
   * Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
   */
  responseValueRenderOption?: ValueRenderOption;

  /**
   * Determines how dates, times, and durations in the response should be rendered. This is ignored if responseValueRenderOption is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
   */
  responseDateTimeRenderOption?: DateTimeRenderOption;

  /**
   * The values to append.
   */
  valueRange: ValueRange;
}

export interface AppendValuesResponse extends HttpProxyResponse {
  data: {
    spreadsheetId: string;
    tableRange: string;
    updates: UpdateValuesResponseData;
  };
}

export const appendValues =
  (self: GoogleSheets) =>
  async (props: AppendValuesProps): Promise<AppendValuesResponse> => {
    const {
      spreadsheetId,
      range,
      valueInputOption,
      insertDataOption,
      includeValuesInResponse,
      responseValueRenderOption,
      responseDateTimeRenderOption,
      valueRange,
    } = props;

    return await self.post({
      url: `/spreadsheets/${spreadsheetId}/values/${range}:append`,
      params: {
        valueInputOption,
        insertDataOption,
        includeValuesInResponse,
        responseValueRenderOption,
        responseDateTimeRenderOption,
      },
      data: valueRange,
    });
  };
