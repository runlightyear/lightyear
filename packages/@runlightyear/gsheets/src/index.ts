import { GoogleSheets } from "./GoogleSheets";
import type { GoogleSheetsProps } from "./GoogleSheets";

import { GoogleSheetsOAuth } from "./GoogleSheetsOAuth";
import type { GoogleSheetsOAuthProps } from "./GoogleSheetsOAuth";

/** Spreadsheets **/

import type {
  CreateSpreadsheetProps,
  CreateSpreadsheetResponse,
  CreateSpreadsheetResponseData,
} from "./spreadsheets/createSpreadsheet";

/** Types **/

import type { DateTimeRenderOption } from "./types/DateTimeRenderOption";
import type { Dimension } from "./types/Dimension";
import type { InsertDataOption } from "./types/InsertDataOption";
import type { UpdateValuesResponseData } from "./types/UpdateValuesResponseData";
import type { ValueInputOption } from "./types/ValueInputOption";
import type { ValueRange } from "./types/ValueRange";
import type { ValueRenderOption } from "./types/ValueRenderOption";

/** Values **/

import type {
  AppendValuesProps,
  AppendValuesResponse,
} from "./values/appendValues";
import type {
  ClearValuesProps,
  ClearValuesResponse,
  ClearValuesResponseData,
} from "./values/clearValues";
import type { GetValuesProps, GetValuesResponse } from "./values/getValues";
import type {
  UpdateValuesProps,
  UpdateValuesResponse,
} from "./values/updateValues";

export { GoogleSheets, GoogleSheetsOAuth };
export type {
  GoogleSheetsOAuthProps,
  GoogleSheetsProps,
  CreateSpreadsheetProps,
  CreateSpreadsheetResponse,
  CreateSpreadsheetResponseData,
  DateTimeRenderOption,
  Dimension,
  InsertDataOption,
  UpdateValuesResponseData,
  ValueInputOption,
  ValueRange,
  ValueRenderOption,
  AppendValuesProps,
  AppendValuesResponse,
  ClearValuesProps,
  ClearValuesResponse,
  ClearValuesResponseData,
  GetValuesProps,
  GetValuesResponse,
  UpdateValuesProps,
  UpdateValuesResponse,
};
