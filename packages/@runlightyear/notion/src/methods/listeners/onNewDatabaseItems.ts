import { Page } from "../../objects/pages/Page";
import { defineAction, setVariable, SKIPPED } from "@runlightyear/lightyear";
import { Notion } from "../../Notion";

export interface OnNewDatabaseItemsRunFuncProps {
  data: Array<Page>;
}

export interface OnNewDatabaseItemsProps {
  name: string;
  title: string;
  pollingFrequency: number;
  databaseId?: string;
  apps?: Array<string>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: (props: OnNewDatabaseItemsRunFuncProps) => Promise<void>;
}

export const onNewDatabaseItems = (props: OnNewDatabaseItemsProps) => {
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
    variables: [...variables, "databaseId?", "lastCreatedTime?"],
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
            timestamp: "created_time",
            direction: "ascending",
          },
        ],
        filter: {
          timestamp: "created_time",
          createdTime: {
            after: variables.lastCreatedTime || "1970-01-01T00:00:00.000Z",
          },
        },
      });
      console.log("Database items:", response.data);

      if (response.data.results.length > 0) {
        const lastCreatedTime =
          response.data.results[response.data.results.length - 1].createdTime;
        await run({ data: response.data.results });

        await setVariable("lastCreatedTime", lastCreatedTime);
      } else {
        console.info("No new database items");
        throw SKIPPED;
      }
    },
  });
};
