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

type ActionIndex = {
  [name: string]: RunFunc;
};

export const actionIndex: ActionIndex = {};

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
  console.debug("actionIndex", Object.keys(actionIndex));

  const fn = actionIndex[name];
  if (!fn) {
    console.error(
      `Unknown action: ${name}`,
      "Known actions:",
      Object.keys(actionIndex)
    );
    throw new Error(`Unknown action: ${name}`);
  }

  console.debug("Running the action function");
  await fn({ data, auths, variables, secrets, webhook, context });
}
