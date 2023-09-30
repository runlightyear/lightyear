import {
  AppName,
  RunFuncProps,
  SecretDef,
  VariableDef,
} from "@runlightyear/lightyear";
import { onChange } from "./onChange";
import { WebhookSpecification } from "../types/WebhookSpecification";
import { WebhookPayload } from "../types/WebhookPayload";

export interface OnNewRecordsProps {
  name: string;
  title: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  run: OnNewRecordsRunFunc;
  baseId: string;
  specification?: WebhookSpecification;
}

export type OnNewRecordsRunFunc = (
  props: OnNewRecordsRunFuncProps
) => Promise<void>;

export interface OnNewRecordsRunFuncProps extends RunFuncProps {
  data: {
    newRecords: Array<{ tableId: string; recordId: string }>;
    payloads: Array<WebhookPayload>;
  };
}

export const onNewRecords = (props: OnNewRecordsProps) => {
  const { specification, run, ...rest } = props;
  return onChange({
    ...rest,
    specification: {
      options: {
        filters: {
          ...(specification ? specification.options.filters : {}),
          dataTypes: ["tableData"],
          changeTypes: ["add"],
        },
        includes: specification?.options.includes,
      },
    },
    run: async (runProps) => {
      const { data, auths } = runProps;
      console.debug("Data: ", data);

      const recordIdsByPayload = data.map((payload) => {
        if (payload.changedTablesById) {
          const tableIds = Object.keys(payload.changedTablesById);
          return tableIds.map((tableId) => {
            if ("createdRecordsById" in payload.changedTablesById![tableId]) {
              const createdRecordsById =
                payload.changedTablesById![tableId].createdRecordsById;
              if (createdRecordsById) {
                const recordIds = Object.keys(createdRecordsById);
                console.debug("Record IDs for this payload: ", recordIds);
                return recordIds.map((recordId) => ({
                  tableId,
                  recordId,
                }));
              }
            }
            return [];
          });
        }
        return [];
      });
      console.debug("Record IDs by payload: ", recordIdsByPayload);
      const recordIds = recordIdsByPayload.flat(2);

      console.debug("New table and record ids: ", recordIds);

      await run({
        ...runProps,
        data: { newRecords: recordIds, payloads: data },
      });
    },
  });
};
