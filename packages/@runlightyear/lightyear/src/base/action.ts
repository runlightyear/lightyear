import invariant from "tiny-invariant";
import isFunction from "../util/isFunction";
import baseRequest from "./baseRequest";
import { RunFunc, actionIndex } from "../run";
import { pushToDeployList } from "./deploy";
import { prefixedRedactedConsole } from "../logging";
import { AuthData } from "./auth";
import { getEnvName } from "../util/getEnvName";

export type AppName =
  | "airtable"
  | "gcal"
  | "github"
  | "gmail"
  | "gsheets"
  | "linear"
  | "notion"
  | "openai"
  | "postmark"
  | "salesforce"
  | "slack"
  | "smtp"
  | "zoom";

export type ActionTrigger = {
  webhook?: string;
  schedule?: string;
  pollingFrequency?: number;
};

/**
 * @public
 */
export interface DefineActionProps {
  /**
   * The name of this action.
   */
  name: string;
  /**
   * The title of this action.
   */
  title: string;
  description?: string;
  trigger?: ActionTrigger;
  /**
   * An array of the system apps used by this action.
   */
  apps?: Array<AppName>;
  /**
   * An array of the custom apps used by this action.
   */
  customApps?: Array<string>;
  /**
   * An array of the variables on this action.
   *
   * Variables are required to have a value by default. If you append a "?" to the end of the name, the variable will be optional. For example:
   *
   * ["requiredVar", "optionalVar?"]
   */
  variables?: Array<string>;
  /**
   * An array of the secrets on this action.
   *
   * Secrets are like variables, but they are stored more securely in the database and they are redacted in the console logs.
   *
   * Secrets are required to have a value by default. If you append a "?" to the end of the name, the secret will be optional. For example:
   *
   * ["requiredSecret", "optionalSecret?"]
   */
  secrets?: Array<string>;
  /**
   * The function to run when this action is triggered.
   */
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
 *   name: "helloWorld",
 *   title: "Hello World",
 *   run: async () => {
 *     console.log('Hello world');
 *   }
 * })
 * ```
 *
 * @example Variables
 * ```typescript
 * defineAction({
 *   name: "variables",
 *   title: "Variables",
 *   variables: ["var1", "var2?"],
 *   run: async ({ variables }) => {
 *     console.log("required variable", variables.var1);
 *     console.log("optional variable", variables.var2);
 *   }
 * }
 * ```
 *
 * @param props
 */
export function defineAction(props: DefineActionProps) {
  console.debug("in defineAction", props);

  const { run, ...rest } = props;
  validateActionProps(rest);
  invariant(run, "Run function missing");
  invariant(isFunction(run), "Run must be a function");

  pushToDeployList({ type: "action", actionProps: rest });
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
