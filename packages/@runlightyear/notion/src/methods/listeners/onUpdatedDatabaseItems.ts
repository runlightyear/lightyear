import { Page } from "../../objects/pages/Page";
import { defineAction, setVariable, SKIPPED } from "@runlightyear/lightyear";
import { Notion } from "../../Notion";

export interface OnUpdatedDatabaseItemsRunFuncProps {
  data: Array<Page>;
}

export interface OnUpdatedDatabaseItemsProps {
  name: string;
  title: string;
  pollingFrequency: number;
  databaseId?: string;
  apps?: Array<string>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: (props: OnUpdatedDatabaseItemsRunFuncProps) => Promise<void>;
}

export const onUpdatedDatabaseItems = (props: OnUpdatedDatabaseItemsProps) => {
  const {
    name,
    title,
    pollingFrequency,
    databaseId,
    apps = [],
    variables = [],
    secrets = [],
    run,
  } = props;

  const combinedApps = ["notion", ...apps];

  return defineAction({
    name,
    title,
    apps: ["notion"],
    variables: [...variables, "databaseId?", "lastEditedTime?"],
    secrets,
    trigger: {
      pollingFrequency,
    },
    run: async ({ auths, variables }) => {
      if (databaseId && variables.databaseId) {
        throw new Error(
          "You cannot specify both databaseId and variables.databaseId"
        );
      }

      if (!databaseId && !variables.databaseId) {
        throw new Error(
          "You must specify either databaseId or variables.databaseId"
        );
      }

      const theDatabaseId = databaseId || variables.databaseId;

      const notion = new Notion({ auth: auths.notion });
      const response = await notion.queryDatabase({
        databaseId: theDatabaseId!,
        sorts: [
          {
            timestamp: "last_edited_time",
            direction: "ascending",
          },
        ],
        filter: {
          timestamp: "last_edited_time",
          lastEditedTime: {
            after: variables.lastEditedTime || "1970-01-01T00:00:00.000Z",
          },
        },
      });
      console.log("Database items:", response.data);

      if (response.data.results.length > 0) {
        const lastEditedTime =
          response.data.results[response.data.results.length - 1]
            .lastEditedTime;
        await run({ data: response.data.results });

        await setVariable("lastEditedTime", lastEditedTime);
      } else {
        console.info("No updated database items");
        throw SKIPPED;
      }
    },
  });
};
