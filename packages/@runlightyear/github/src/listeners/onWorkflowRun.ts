import {
  defineAction,
  defineWebhook,
  RunFuncProps,
  SKIPPED,
} from "@runlightyear/lightyear";
import { WorkflowRunPayload } from "../webhooks/payloads/asWorkflowRunPayload";
import { AppName } from "@runlightyear/lightyear/src/base/action";
import { GitHub } from "../GitHub";

export interface OnWorkflowRunFuncProps extends RunFuncProps {
  data: WorkflowRunPayload;
}

export type OnWorkflowRunFunc = (props: OnWorkflowRunFuncProps) => void;

export interface OnWorkflowRunProps {
  name: string;
  title: string;
  customAppName?: string;
  authName?: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: OnWorkflowRunFunc;
  owner: string;
  repo: string;
}

export const onWorkflowRun = (props: OnWorkflowRunProps) => {
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
        events: ["workflow_run"],
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
      const workflowRunPayload = GitHub.asWorkflowRunPayload(runProps.data);

      if (!workflowRunPayload) {
        throw SKIPPED;
      }

      await run({ ...runProps, data: workflowRunPayload });
    },
  });

  return { webhook, action };
};
