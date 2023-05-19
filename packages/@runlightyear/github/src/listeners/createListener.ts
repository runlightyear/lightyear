import WebhookEvent from "../types/WebhookEvent";
import {
  AppName,
  defineAction,
  RunFuncProps,
  SKIPPED,
  WebhookDeliveryData,
} from "@runlightyear/lightyear";
import { GitHub } from "../GitHub";

export interface GitHubListenerRunFuncProps<Payload> extends RunFuncProps {
  data: Payload;
}

export type GitHubListenerRunFunc<Payload> = (
  props: GitHubListenerRunFuncProps<Payload>
) => void;

export interface GitHubListenerProps<Payload> {
  name: string;
  title: string;
  customAppName?: string;
  authName?: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: GitHubListenerRunFunc<Payload>;
  owner: string;
  repo: string;
}

export interface CreateListenerProps<Payload> {
  event: WebhookEvent;
  payloadCaster: (data: WebhookDeliveryData) => Payload | null;
}

export function createListener<Payload>(props: CreateListenerProps<Payload>) {
  const { event, payloadCaster } = props;

  return (props: GitHubListenerProps<Payload>) => {
    const {
      name,
      title,
      customAppName,
      authName,
      apps = [],
      customApps = [],
      variables = [],
      secrets = [],
      run,
      owner,
      repo,
    } = props;

    const combinedApps: AppName[] = customAppName ? apps : ["github", ...apps];
    const combinedCustomApps = customAppName
      ? [customAppName, ...customApps]
      : customApps;

    const webhook = GitHub.defineWebhook({
      name,
      title,
      variables,
      secrets,
      subscribeProps: () => {
        return {
          owner,
          repo,
          events: [event],
        };
      },
    });

    const action = defineAction({
      name,
      title,
      apps: combinedApps,
      customApps: combinedCustomApps,
      variables,
      secrets,
      trigger: {
        webhook,
      },
      run: async (runProps) => {
        const payload = payloadCaster(runProps.data);

        if (!payload) {
          throw SKIPPED;
        }

        await run({ ...runProps, data: payload });
      },
    });

    return { webhook, action };
  };
}
