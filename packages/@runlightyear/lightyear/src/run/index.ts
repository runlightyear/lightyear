import { AuthData } from "../base/auth";

export interface Auths {
  [name: string]: AuthData;
}

export interface Variables {
  [name: string]: string | null;
}

export interface Secrets {
  [name: string]: string | null;
}

export interface RunFuncProps {
  data?: any;
  context?: any;
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  webhook: string | null;
}

export type RunFunc = (props: RunFuncProps) => void;

type TaskIndex = {
  [name: string]: RunFunc;
};

export const taskIndex: TaskIndex = {};

interface Props {
  name: string;
  data?: any;
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  webhook: string | null;
  context?: any;
}

export async function run(props: Props) {
  const { name, data, auths, variables, secrets, webhook, context } = props;
  console.log("taskIndex", Object.keys(taskIndex));

  const fn = taskIndex[name];
  if (!fn) {
    console.error(`Unknown task: ${name}`);
    console.debug("Known tasks:", Object.keys(taskIndex));
    throw new Error(`Unknown task: ${name}`);
  }

  console.log("about to make the fn call");
  await fn({ data, auths, variables, secrets, webhook, context });
}
