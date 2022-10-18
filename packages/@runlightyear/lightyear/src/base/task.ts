import invariant from "tiny-invariant";
import isFunction from "../util/isFunction";
import baseRequest from "./baseRequest";
import { RunFunc, taskIndex } from "../run";
import { InitializerSpec, deployList } from "./deploy";
import { secrets as secretsList } from "../logging";
import { AuthData } from "./auth";

export type TaskTrigger = {
  webhook?: string;
  schedule?: string;
  pollingFrequency?: number;
};

export interface DefineTaskOptions {
  name: string;
  description?: string;
  trigger?: TaskTrigger;
  auths: {
    [name: string]: string;
  };
  variables: {
    [name: string]: string;
  };
  secrets: {
    [name: string]: string;
  };
  deploy: InitializerSpec;
  run: RunFunc;
}

export interface DeployTaskProps {
  name: string;
  description?: string;
  trigger?: TaskTrigger;
}

export interface SetTaskInitializedProps {
  name: string;
  status: boolean;
}

function validateTaskProps({ name, trigger }: DeployTaskProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");

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
 * Info on how you define a task
 *
 * @example Hello World
 *
 * ```typescript
 * defineTask({
 *   name: "hello world",
 *   description: "Prints hello world to the console",
 *   run: async () => {
 *     console.log('Hello world');
 *   }
 * })
 * ```
 *
 * @param options
 */
export function defineTask(options: DefineTaskOptions) {
  const { run, ...rest } = options;
  validateTaskProps(rest);
  invariant(run, "Run function missing");
  invariant(isFunction(run), "Run must be a function");

  deployList.push({ type: "task", data: rest });
  taskIndex[rest.name] = run;

  return rest.name;
}

export async function deployTask(envName: string, props: DeployTaskProps) {
  validateTaskProps(props);

  const { name, description, trigger } = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/tasks`,
    data: {
      name,
      description,
      trigger,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deployTask failed: ${name}`);
  }

  console.info(`Deployed task: ${name}`);
}

export async function setTaskInitializedStatus(
  envName: string,
  props: SetTaskInitializedProps
) {
  validateTaskProps(props);

  const { name, status } = props;

  await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/tasks/${name}/initialized`,
    data: {
      status,
    },
  });

  console.info(`Set task: ${name} to initialized: ${status}`);
}

export type TaskData = {
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

export async function getTaskData(name: string): Promise<TaskData> {
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/tasks/${name}/data`,
  });

  const data = (await response.json()) as TaskData;

  const { auths, variables, secrets, webhook } = data;

  if (auths) {
    for (const auth of Object.values(auths)) {
      const { accessToken, refreshToken, apiKey } = auth;
      accessToken && secretsList.push(accessToken);
      refreshToken && secretsList.push(refreshToken);
      apiKey && secretsList.push(apiKey);
    }
  }

  if (secrets) {
    for (const secretValue of Object.values(secrets)) {
      secretValue && secretsList.push(secretValue);
    }
  }

  return {
    auths,
    variables,
    secrets,
    webhook,
  };
}
