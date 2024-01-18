import {
  AppName,
  defineAction,
  RunFuncProps,
  SecretDef,
  VariableDef,
} from "@runlightyear/lightyear";
import { Slack } from "../Slack";

export interface OnChannelCreatedProps {
  name: string;
  title: string;
  slackCustomAppName?: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<VariableDef>;
  secrets?: Array<SecretDef>;
  run: OnChannelCreatedRunFunc;
}

export type OnChannelCreatedRunFunc = (
  props: OnChannelCreatedRunFuncProps
) => Promise<void>;

export interface OnChannelCreatedRunFuncProps extends RunFuncProps {
  data: OnChannelCreatedChannelProps;
}

export interface OnChannelCreatedChannelProps {
  id: string;
  name: string;
  created: number;
  creator: string;
}

export const onChannelCreated = (props: OnChannelCreatedProps) => {
  const {
    name,
    title,
    slackCustomAppName,
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
    subscribeProps: () => {
      return {
        event: "channel_created",
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
        data: data.body.channel,
      });
    },
  });

  return { webhook, action };
};
