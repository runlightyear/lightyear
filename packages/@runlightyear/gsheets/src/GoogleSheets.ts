import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { appendValues, AppendValuesProps } from "./values/appendValues";
import { updateValues, UpdateValuesProps } from "./values/updateValues";
import { clearValues, ClearValuesProps } from "./values/clearValues";
import {
  createSpreadsheet,
  CreateSpreadsheetProps,
} from "./spreadsheets/createSpreadsheet";
import { getValues, GetValuesProps } from "./values/getValues";
import { onNewRows, OnNewRowsProps } from "./listeners/onNewRows";

/**
 * @beta
 */
export interface GoogleSheetsProps extends AuthConnectorProps {}

/**
 * @beta
 *
 * Google Sheets Connector
 *
 * @example Create a spreadsheet
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "createSpreadsheet",
 *   title: "Create Spreadsheet",
 *   apps: ["gsheets"],
 *   variables: ["title"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.createSpreadsheet({
 *       title: variables.title!,
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Get a row
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "getRow",
 *   title: "Get Row",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.getValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "1:1",
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Get a column
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "getColumn",
 *   title: "Get Column",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.getValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "A:A",
 *       majorDimension: "COLUMNS",
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Get all rows and columns
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "getAllRowsAndColumns",
 *   title: "Get All Rows And Columns",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId", "worksheetName"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.getValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: `${variables.worksheetName!}`,
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Append a row
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "appendRow",
 *   title: "Append Row",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *     const response = await gsheets.appendValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "1:1",
 *       valueInputOption: "RAW",
 *       valueRange: {
 *         range: "1:1",
 *         values: [[1, 2, 3]],
 *       },
 *     });
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Append multiple rows
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "appendRow",
 *   title: "Append Row",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *     const response = await gsheets.appendValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "1:1",
 *       valueInputOption: "RAW",
 *       valueRange: {
 *         range: "1:1",
 *         values: [[1, 2, 3]],
 *       },
 *     });
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Update a row
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * function randomNumber() {
 *   return Math.floor(Math.random() * 10);
 * }
 *
 * defineAction({
 *   name: "updateRow",
 *   title: "Update Row",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.updateValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "1:1",
 *       valueInputOption: "RAW",
 *       valueRange: {
 *         range: "1:1",
 *         majorDimension: "ROWS",
 *         values: [[randomNumber(), randomNumber(), randomNumber()]],
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Update a column
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * function randomNumber() {
 *   return Math.floor(Math.random() * 10);
 * }
 *
 * defineAction({
 *   name: "updateColumn",
 *   title: "Update Column",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.updateValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "A:A",
 *       valueInputOption: "RAW",
 *       valueRange: {
 *         range: "A:A",
 *         majorDimension: "COLUMNS",
 *         values: [[randomNumber(), randomNumber(), randomNumber()]],
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Update rows and columns
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "updateRowsAndColumns",
 *   title: "Update Rows and Columns",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.updateValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "A1:C3",
 *       valueInputOption: "RAW",
 *       valueRange: {
 *         range: "A1:C3",
 *         majorDimension: "ROWS",
 *         values: [
 *           [1, 2, 3],
 *           [4, 5, 6],
 *           [7, 8, 9],
 *         ],
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Clear a row
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "clearRow",
 *   title: "Clear Row",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.clearValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "1:1",
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Clear a column
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * defineAction({
 *   name: "clearColumn",
 *   title: "Clear Column",
 *   apps: ["gsheets"],
 *   variables: ["spreadsheetId"],
 *   run: async ({ auths, variables }) => {
 *     const gsheets = new GoogleSheets({
 *       auth: auths.gsheets,
 *     });
 *
 *     const response = await gsheets.clearValues({
 *       spreadsheetId: variables.spreadsheetId!,
 *       range: "A:A",
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example On new rows
 * ```typescript
 * import { GoogleSheets } from "@runlightyear/gsheets";
 *
 * GoogleSheets.onNewRows({
 *   name: "onNewRows",
 *   title: "On New Rows",
 *   apps: ["gsheets"],
 *   pollingFrequency: 1,
 *   run: async ({ data }) => {
 *     console.log("Data: ", data);
 *   },
 * });
 * ```
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
   * @example Create a spreadsheet
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "createSpreadsheet",
   *   title: "Create Spreadsheet",
   *   apps: ["gsheets"],
   *   variables: ["title"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.createSpreadsheet({
   *       title: variables.title!,
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
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
   * @example Get a row
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "getRow",
   *   title: "Get Row",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.getValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "1:1",
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Get a column
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "getColumn",
   *   title: "Get Column",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.getValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "A:A",
   *       majorDimension: "COLUMNS",
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Get all rows and columns
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "getAllRowsAndColumns",
   *   title: "Get All Rows And Columns",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId", "worksheetName"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.getValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: `${variables.worksheetName!}`,
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async getValues(props: GetValuesProps) {
    return getValues(this)(props);
  }

  /**
   * Appends values to a spreadsheet.
   *
   * @group Value
   *
   * The input range is used to search for existing data and find a "table" within that range. Values will be appended to the next row of the table, starting with the first column of the table.
   *
   *
   * @example Append a row
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "appendRow",
   *   title: "Append Row",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *     const response = await gsheets.appendValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "1:1",
   *       valueInputOption: "RAW",
   *       valueRange: {
   *         range: "1:1",
   *         values: [[1, 2, 3]],
   *       },
   *     });
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Append multiple rows
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "appendRows",
   *   title: "Append Multiple Rows",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *     const response = await gsheets.appendValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "1:1",
   *       valueInputOption: "RAW",
   *       valueRange: {
   *         range: "1:1",
   *         values: [
   *           [1, 2, 3],
   *           [4, 5, 6],
   *           [7, 8, 9],
   *         ],
   *       },
   *     });
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
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
   * @example Update a row
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * function randomNumber() {
   *   return Math.floor(Math.random() * 10);
   * }
   *
   * defineAction({
   *   name: "updateRow",
   *   title: "Update Row",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.updateValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "1:1",
   *       valueInputOption: "RAW",
   *       valueRange: {
   *         range: "1:1",
   *         majorDimension: "ROWS",
   *         values: [[randomNumber(), randomNumber(), randomNumber()]],
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Update a column
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * function randomNumber() {
   *   return Math.floor(Math.random() * 10);
   * }
   *
   * defineAction({
   *   name: "updateColumn",
   *   title: "Update Column",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.updateValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "A:A",
   *       valueInputOption: "RAW",
   *       valueRange: {
   *         range: "A:A",
   *         majorDimension: "COLUMNS",
   *         values: [[randomNumber(), randomNumber(), randomNumber()]],
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Update rows and columns
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "updateRowsAndColumns",
   *   title: "Update Rows and Columns",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.updateValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "A1:C3",
   *       valueInputOption: "RAW",
   *       valueRange: {
   *         range: "A1:C3",
   *         majorDimension: "ROWS",
   *         values: [
   *           [1, 2, 3],
   *           [4, 5, 6],
   *           [7, 8, 9],
   *         ],
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async updateValues(props: UpdateValuesProps) {
    return updateValues(this)(props);
  }

  /**
   * Clear values from a spreadsheet.
   *
   * @group Value
   *
   * Clears values from a spreadsheet. The caller must specify the spreadsheet ID and range. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc.) are kept.
   *
   *
   * @example Clear a row
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "clearRow",
   *   title: "Clear Row",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.clearValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "1:1",
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Clear a column
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * defineAction({
   *   name: "clearColumn",
   *   title: "Clear Column",
   *   apps: ["gsheets"],
   *   variables: ["spreadsheetId"],
   *   run: async ({ auths, variables }) => {
   *     const gsheets = new GoogleSheets({
   *       auth: auths.gsheets,
   *     });
   *
   *     const response = await gsheets.clearValues({
   *       spreadsheetId: variables.spreadsheetId!,
   *       range: "A:A",
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async clearValues(props: ClearValuesProps) {
    return clearValues(this)(props);
  }

  /**
   * On new rows in a spreadsheet.
   *
   * @group Listener
   *
   * @example On new rows
   * ```typescript
   * import { GoogleSheets } from "@runlightyear/gsheets";
   *
   * GoogleSheets.onNewRows({
   *   name: "onNewRows",
   *   title: "On New Rows",
   *   apps: ["gsheets"],
   *   pollingFrequency: 1,
   *   run: async ({ data }) => {
   *     console.log("Data: ", data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  static onNewRows(props: OnNewRowsProps) {
    return onNewRows(props);
  }
}
