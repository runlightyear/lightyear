import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { appendValues, AppendValuesProps } from "./values/appendValues";
import { updateValues, UpdateValuesProps } from "./values/updateValues";
import { clearValues, ClearValuesProps } from "./values/clearValues";
import {
  createSpreadsheet,
  CreateSpreadsheetProps,
} from "./spreadsheets/createSpreadsheet";
import { getValues, GetValuesProps } from "./values/getValues";

/**
 * @beta
 */
export interface GoogleSheetsProps extends AuthConnectorProps {}

/**
 * @beta
 */
export class GoogleSheets extends RestConnector {
  constructor(props: GoogleSheetsProps) {
    super({ ...props, baseUrl: "https://sheets.googleapis.com/v4" });
  }

  /**
   * Creates a spreadsheet, returning the newly created spreadsheet.
   *
   * @group Spreadsheet
   *
   * @param props
   */
  async createSpreadsheet(props: CreateSpreadsheetProps) {
    return createSpreadsheet(this)(props);
  }

  /**
   * Returns a range of values from a spreadsheet.
   *
   * @group Value
   *
   * @param props
   */
  async getValues(props: GetValuesProps) {
    return getValues(this)(props);
  }

  /**
   * Appends values to a spreadsheet. The input range is used to search for existing data and find a "table" within that range. Values will be appended to the next row of the table, starting with the first column of the table.
   *
   * @group Value
   *
   * @param props
   */
  async appendValues(props: AppendValuesProps) {
    return appendValues(this)(props);
  }

  /**
   * Sets values in a range of a spreadsheet.
   *
   * @group Value
   *
   * @param props
   */
  async updateValues(props: UpdateValuesProps) {
    return updateValues(this)(props);
  }

  /**
   * Clears values from a spreadsheet. The caller must specify the spreadsheet ID and range. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc.) are kept.
   *
   * @group Value
   *
   * @param props
   */
  async clearValues(props: ClearValuesProps) {
    return clearValues(this)(props);
  }
}
