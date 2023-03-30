import { ValueInputOption } from "../types/ValueInputOption";
import { ValueRenderOption } from "../types/ValueRenderOption";
import { DateTimeRenderOption } from "../types/DateTimeRenderOption";
import { ValueRange } from "../types/ValueRange";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { UpdateValuesResponseData } from "../types/UpdateValuesResponseData";
import { GoogleSheets } from "../GoogleSheets";

export interface UpdateValuesProps {
  /**
   * The ID of the spreadsheet to update.
   */
  spreadsheetId: string;

  /**
   * The A1 notation of the values to update.
   */
  range: string;

  /**
   * How the input data should be interpreted.
   */
  valueInputOption: ValueInputOption;

  /**
   * Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).
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
   * The values to update
   */
  valueRange: ValueRange;
}

export interface UpdateValuesResponse extends HttpProxyResponse {
  data: UpdateValuesResponseData;
}

export const updateValues =
  (self: GoogleSheets) =>
  async (props: UpdateValuesProps): Promise<UpdateValuesResponse> => {
    const {
      spreadsheetId,
      range,
      valueInputOption,
      includeValuesInResponse,
      responseValueRenderOption,
      responseDateTimeRenderOption,
      valueRange,
    } = props;

    return await self.put({
      url: `/spreadsheets/${spreadsheetId}/values/${range}`,
      params: {
        valueInputOption,
        includeValuesInResponse,
        responseValueRenderOption,
        responseDateTimeRenderOption,
      },
      data: valueRange,
    });
  };
