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
) => Promise<void>;

export interface GitHubListenerProps<Payload> {
  /**
   * The name of this listener.
   */
  name: string;
  /**
   * The title of this listener.
   */
  title: string;
  customAppName?: string;
  authName?: string;
  /**
   * An array of the system apps used by this listener.
   */
  apps?: Array<AppName>;
  /**
   * An array of the custom apps used by this listener.
   */
  customApps?: Array<string>;
  /**
   * An array of the variables on this listener.
   *
   * Variables are required to have a value by default. If you append a "?" to the end of the name, the variable will be optional. For example:
   *
   * ["requiredVar", "optionalVar?"]
   */
  variables?: Array<string>;
  /**
   * An array of the secrets on this listener.
   *
   * Secrets are like variables, but they are stored more securely in the database and they are redacted in the console logs.
   *
   * Secrets are required to have a value by default. If you append a "?" to the end of the name, the secret will be optional. For example:
   *
   * ["requiredSecret", "optionalSecret?"]
   */
  secrets?: Array<string>;
  /**
   * The function to run when this listener is triggered.
   */
  run: GitHubListenerRunFunc<Payload>;
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner?: string;
  /**
   * The name of the repository without the .git extension. The name is not case sensitive.
   */
  repo?: string;
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
      variables: [
        ...variables,
        ...(owner
          ? []
          : [
              {
                name: "owner",
                description:
                  "The account owner of the repository. The name is not case sensitive.",
              },
            ]),
        ...(repo
          ? []
          : [
              {
                name: "repo",
                description:
                  "The name of the repository without the .git extension. The name is not case sensitive.",
              },
            ]),
      ],
      secrets,
      subscribeProps: ({ variables }) => {
        return {
          owner: owner || variables.owner!,
          repo: repo || variables.repo!,
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
