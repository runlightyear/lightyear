import {
  AppName,
  defineAction,
  RunFuncProps,
  SecretDef,
  setVariable,
  VariableDef,
} from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";
import { WebhookSpecification } from "../types/WebhookSpecification";
import { WebhookPayload } from "../types/WebhookPayload";

export interface OnChangeProps {
  name: string;
  title: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  run: OnChangeRunFunc;
  baseId?: string;
  specification: WebhookSpecification;
}

export type OnChangeRunFunc = (props: OnChangeRunFuncProps) => Promise<void>;

export interface OnChangeRunFuncProps extends RunFuncProps {
  data: { baseId: string; webhookId: string; payloads: Array<WebhookPayload> };
}

export const onChange = (props: OnChangeProps) => {
  const {
    name,
    title,
    apps = [],
    customApps = [],
    variables = [],
    secrets = [],
    run,
    baseId,
  } = props;

  const webhookVariables = [...variables, ...(!baseId ? ["baseId"] : [])];

  const webhook = Airtable.defineWebhook({
    name,
    title,
    variables: webhookVariables,
    secrets,
    subscribeProps: ({ variables }) => {
      return {
        baseId: baseId || variables.baseId!,
        specification: props.specification,
      };
    },
  });

  const action = defineAction({
    name,
    title,
    apps: [...apps, "airtable"],
    customApps,
    variables: [
      ...variables,
      "webhookId?",
      {
        name: "airtableCursor?",
        description:
          "Cursor used to make sure only the most recent payloads are retrieved.",
      },
    ],
    secrets,
    trigger: {
      webhook,
    },
    run: async (runProps) => {
      const { auths, variables, data } = runProps;
      const airtable = new Airtable({ auth: auths.airtable });

      const baseId = data.body.base.id;
      const webhookId = data.body.webhook.id;
      let cursor = variables.airtableCursor;

      if (webhookId !== variables.webhookId) {
        // webhook was reset, so clear the cursor
        cursor = null;
        await setVariable("airtableCursor", null);
        await setVariable("webhookId", webhookId);
      }

      const payloadsResponse = await airtable.listWebhookPayloads({
        baseId,
        webhookId,
        cursor: cursor ? parseInt(cursor) : undefined,
      });

      const newCursor = payloadsResponse.data.cursor;

      await run({
        ...runProps,
        data: { baseId, webhookId, payloads: payloadsResponse.data.payloads },
      });

      await setVariable("airtableCursor", String(newCursor));
    },
  });

  return { webhook, action };
};
