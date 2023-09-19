import { ValueRange } from "../types/ValueRange";
import { defineAction, setVariable, SKIPPED } from "@runlightyear/lightyear";
import invariant from "tiny-invariant";
import { GoogleSheets } from "../GoogleSheets";

export interface OnNewRowsRunFuncProps {
  data: ValueRange;
}

export interface OnNewRowsProps {
  name: string;
  title: string;
  pollingFrequency: number;
  spreadsheetId?: string;
  worksheetName?: string;
  apps?: Array<string>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: (props: OnNewRowsRunFuncProps) => Promise<void>;
}

export const onNewRows = (props: OnNewRowsProps) => {
  const {
    name,
    title,
    pollingFrequency,
    spreadsheetId,
    worksheetName,
    apps = [],
    variables = [],
    secrets = [],
    run,
  } = props;

  const combinedApps = ["gsheets", ...apps];

  return defineAction({
    name,
    title,
    apps: ["gsheets"],
    variables: [
      ...variables,
      ...(spreadsheetId ? [] : ["spreadsheetId"]),
      ...(worksheetName ? [] : ["worksheetName?"]),
      "lastRow?",
    ],
    secrets,
    trigger: {
      pollingFrequency,
    },
    run: async ({ auths, variables }) => {
      const gsheets = new GoogleSheets({ auth: auths.gsheets });

      const theSpreadsheetId = spreadsheetId || variables.spreadsheetId;
      invariant(theSpreadsheetId, "spreadsheetId is required");

      const theWorksheetName = worksheetName || variables.worksheetName;
      const theWorksheetTerm = theWorksheetName ? `${theWorksheetName}!` : "";

      const theLastRow = variables.lastRow ? parseInt(variables.lastRow) : 0;

      const range = `${theWorksheetTerm}A${theLastRow + 1}:ZZZ`;
      console.debug(`Checking range: '${range}'`);

      const response = await gsheets.getValues({
        spreadsheetId: theSpreadsheetId!,
        range,
      });

      if (response.data.values && response.data.values.length > 0) {
        await run({ data: response.data });

        await setVariable(
          "lastRow",
          `${theLastRow + response.data.values.length}`
        );
      } else {
        console.log("No new rows");
        throw SKIPPED;
      }
    },
  });
};
