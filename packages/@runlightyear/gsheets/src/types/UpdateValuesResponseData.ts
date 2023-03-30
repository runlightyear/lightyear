import { ValueRange } from "./ValueRange";

export interface UpdateValuesResponseData {
  spreadsheetId: string;
  updatedRange: string;
  updatedRows: number;
  updatedColumns: number;
  updatedCells: number;
  updatedData: ValueRange;
}
