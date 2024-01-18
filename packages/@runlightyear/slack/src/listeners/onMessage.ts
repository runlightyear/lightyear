import {
  AppName,
  defineAction,
  RunFuncProps,
  SecretDef,
  VariableDef,
} from "@runlightyear/lightyear";
import { Slack } from "../Slack";

export interface OnMessageProps {
  name: string;
  title: string;
  slackCustomAppName?: string;
  apps?: AppName[];
  customApps?: Array<string>;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  run: OnMessageRunFunc;
  channelId?: string;
}

export type OnMessageRunFunc = (props: OnMessageRunFuncProps) => Promise<void>;

export interface OnMessageRunFuncProps extends RunFuncProps {
  data: OnMessageMessageProps;
}

export interface OnMessageMessageProps {
  type: string;
  user: string;
  text: string;
  ts: string;
  channel: string;
  eventTs: string;
}

export const onMessage = (props: OnMessageProps) => {
  const {
    name,
    title,
    slackCustomAppName,
    channelId,
    apps = [],
    customApps = [],
    variables = [],
    secrets = [],
    run,
  } = props;

  const webhook = Slack.defineWebhook({
    name,
    title,
    slackCustomAppName,
    variables: [
      ...(channelId
        ? []
        : [
            {
              name: "channelId",
              description: "ID of channel to join (example: C1234567890)",
            },
          ]),
    ],
    subscribeProps: ({ variables }) => {
      return {
        event: "message",
        channelId: channelId || variables.channelId!,
      };
    },
  });

  const action = defineAction({
    name,
    title,
    apps,
    customApps,
    variables,
    secrets,
    trigger: {
      webhook,
    },
    run: async (runProps) => {
      const { data } = runProps;

      await run({
        ...runProps,
        data: data.body,
      });
    },
  });

  return { webhook, action };
};
