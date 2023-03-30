import { Dimension } from "../types/Dimension";
import { ValueRenderOption } from "../types/ValueRenderOption";
import { DateTimeRenderOption } from "../types/DateTimeRenderOption";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { ValueRange } from "../types/ValueRange";
import { GoogleSheets } from "../GoogleSheets";

export interface GetValuesProps {
  /**
   * The ID of the spreadsheet to retrieve data from.
   */
  spreadsheetId: string;

  /**
   * The A1 notation or R1C1 notation of the range to retrieve values from.
   */
  range: string;

  /**
   * The major dimension that results should use.
   *
   * For example, if the spreadsheet data in Sheet1 is: A1=1,B1=2,A2=3,B2=4, then requesting range=Sheet1!A1:B2?majorDimension=ROWS returns [[1,2],[3,4]], whereas requesting range=Sheet1!A1:B2?majorDimension=COLUMNS returns [[1,3],[2,4]].
   */
  majorDimension?: Dimension;

  /**
   *   How values should be represented in the output. The default render option is FORMATTED_VALUE.
   */
  valueRenderOption?: ValueRenderOption;

  /**
   * How dates, times, and durations should be represented in the output. This is ignored if valueRenderOption is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
   */
  dateTimeRenderOption?: DateTimeRenderOption;
}

export interface GetValuesResponse extends HttpProxyResponse {
  data: ValueRange;
}

export const getValues =
  (self: GoogleSheets) =>
  async (props: GetValuesProps): Promise<GetValuesResponse> => {
    const {
      spreadsheetId,
      range,
      majorDimension,
      valueRenderOption,
      dateTimeRenderOption,
    } = props;

    return await self.get({
      url: `/spreadsheets/${spreadsheetId}/values/${range}`,
      params: {
        majorDimension,
        valueRenderOption,
        dateTimeRenderOption,
      },
    });
  };
