import {
  AppName,
  RunFuncProps,
  SecretDef,
  VariableDef,
} from "@runlightyear/lightyear";
import { onChange } from "./onChange";
import { WebhookSpecification } from "../types/WebhookSpecification";
import { WebhookPayload } from "../types/WebhookPayload";

export interface OnNewOrUpdatedRecordsProps {
  name: string;
  title: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  run: OnNewOrUpdatedRecordsRunFunc;
  baseId?: string;
  specification?: WebhookSpecification;
}

export type OnNewOrUpdatedRecordsRunFunc = (
  props: OnNewOrUpdatedRecordsRunFuncProps
) => Promise<void>;

export interface OnNewOrUpdatedRecordsRunFuncProps extends RunFuncProps {
  data: {
    baseId: string;
    webhookId: string;
    newOrUpdatedRecords: Array<{ tableId: string; recordId: string }>;
    payloads: Array<WebhookPayload>;
  };
}

export const onNewOrUpdatedRecords = (props: OnNewOrUpdatedRecordsProps) => {
  const { specification, run, ...rest } = props;
  return onChange({
    ...rest,
    specification: {
      options: {
        filters: {
          ...(specification ? specification.options.filters : {}),
          dataTypes: ["tableData"],
          changeTypes: ["add", "update"],
        },
        includes: specification?.options.includes,
      },
    },
    run: async (runProps) => {
      const { data, auths } = runProps;
      console.debug("Data: ", data);

      const { baseId, webhookId, payloads } = data;

      const recordIdsByPayload = payloads.map((payload) => {
        if (payload.changedTablesById) {
          const tableIds = Object.keys(payload.changedTablesById);
          return tableIds.map((tableId) => {
            let results: Array<{ tableId: string; recordId: string }> = [];

            if ("createdRecordsById" in payload.changedTablesById![tableId]) {
              const createdRecordsById =
                payload.changedTablesById![tableId].createdRecordsById;
              if (createdRecordsById) {
                const recordIds = Object.keys(createdRecordsById);
                console.debug("Record IDs for this payload: ", recordIds);
                results = [
                  ...results,
                  ...recordIds.map((recordId) => ({
                    tableId,
                    recordId,
                  })),
                ];
              }
            }

            if ("changedRecordsById" in payload.changedTablesById![tableId]) {
              const changedRecordsById =
                payload.changedTablesById![tableId].changedRecordsById;
              if (changedRecordsById) {
                const recordIds = Object.keys(changedRecordsById);
                console.debug("Record IDs for this payload: ", recordIds);
                results = [
                  ...results,
                  ...recordIds.map((recordId) => ({
                    tableId,
                    recordId,
                  })),
                ];
              }
            }

            return results;
          });
        }
        return [];
      });
      console.debug("Record IDs by payload: ", recordIdsByPayload);
      const recordIds = recordIdsByPayload.flat(2);

      console.debug("New table and record ids: ", recordIds);

      await run({
        ...runProps,
        data: {
          baseId,
          webhookId,
          newOrUpdatedRecords: recordIds,
          payloads: payloads,
        },
      });
    },
  });
};
