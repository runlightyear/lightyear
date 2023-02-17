import invariant from "tiny-invariant";
import isFunction from "../util/isFunction";
import baseRequest from "./baseRequest";
import { RunFunc, actionIndex } from "../run";
import { InitializerSpec, deployList } from "./deploy";
import { prefixedRedactedConsole } from "../logging";
import { AuthData } from "./auth";
import { getEnvName } from "../util/getEnvName";

export type AppName = "airtable" | "github" | "openai" | "slack";

export type ActionTrigger = {
  webhook?: string;
  schedule?: string;
  pollingFrequency?: number;
};

/**
 * @public
 */
export interface DefineActionProps {
  name: string;
  title: string;
  description?: string;
  trigger?: ActionTrigger;
  apps?: Array<AppName>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: RunFunc;
}

export interface DeployActionProps {
  name: string;
  title: string;
  description?: string;
  trigger?: ActionTrigger;
}

export interface SetActionInitializedProps {
  name: string;
  title: string;
  status: boolean;
}

function validateActionProps({ name, title, trigger }: DeployActionProps) {
  if (!name) {
    throw new Error("Action missing name");
  }

  if (typeof name !== "string") {
    throw new Error(`Invalid action name: ${name}`);
  }

  if (!title) {
    throw new Error(`Action ${name} missing title`);
  }

  if (typeof title !== "string") {
    throw new Error(`Invalid title for action ${name}: ${title}`);
  }

  if (trigger) {
    const array = [
      trigger.webhook ? 1 : 0,
      trigger.schedule ? 1 : 0,
      trigger.pollingFrequency ? 1 : 0,
    ];
    const sum: number = array.reduce((sum, x) => sum + x);

    invariant(
      sum === 1,
      `Must specify one and only one of webhook, schedule, and pollingFrequency on trigger`
    );
  }
}

/**
 * @public
 *
 * Define an Action
 *
 * @example Hello World
 *
 * ```typescript
 * defineAction({
 *   name: "hello world",
 *   description: "Prints hello world to the console",
 *   run: async () => {
 *     console.log('Hello world');
 *   }
 * })
 * ```
 *
 * @param props
 */
export function defineAction(props: DefineActionProps) {
  const { run, ...rest } = props;
  validateActionProps(rest);
  invariant(run, "Run function missing");
  invariant(isFunction(run), "Run must be a function");

  deployList.push({ type: "action", actionProps: rest });
  actionIndex[rest.name] = run;

  return rest.name;
}

export async function deployAction(envName: string, props: DeployActionProps) {
  validateActionProps(props);

  const { name, description, trigger } = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/actions`,
    data: {
      name,
      description,
      trigger,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deployAction failed: ${name}`);
  }

  console.info(`Deployed action: ${name}`);
}

export async function setActionInitializedStatus(
  envName: string,
  props: SetActionInitializedProps
) {
  validateActionProps(props);

  const { name, status } = props;

  await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/actions/${name}/initialized`,
    data: {
      status,
    },
  });

  console.info(`Set action: ${name} to initialized: ${status}`);
}

export type ActionData = {
  auths: {
    [name: string]: AuthData;
  };
  variables: {
    [name: string]: string | null;
  };
  secrets: {
    [name: string]: string | null;
  };
  webhook: string | null;
};

export async function getActionData(name: string): Promise<ActionData> {
  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/actions/${name}/data`,
  });

  const data = <ActionData>await response.json();

  const { auths, variables, secrets, webhook } = data;

  if (auths) {
    for (const auth of Object.values(auths)) {
      const { accessToken, refreshToken, apiKey } = auth;

      accessToken && prefixedRedactedConsole.addSecrets([accessToken]);
      refreshToken && prefixedRedactedConsole.addSecrets([refreshToken]);
      apiKey && prefixedRedactedConsole.addSecrets([apiKey]);
    }
  }

  if (secrets) {
    prefixedRedactedConsole.addSecrets(Object.values(secrets));
  }

  return {
    auths,
    variables,
    secrets,
    webhook,
  };
}
