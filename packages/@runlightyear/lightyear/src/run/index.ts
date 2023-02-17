import { AuthData } from "../base/auth";

/**
 * @public
 */
export interface Auths {
  [name: string]: AuthData;
}

/**
 * @public
 */
export interface Variables {
  [name: string]: string | null;
}

/**
 * @public
 */
export interface Secrets {
  [name: string]: string | null;
}

/**
 * @public
 */
export interface RunFuncProps {
  data?: any;
  context?: any;
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  webhook: string | null;
}

/**
 * @public
 */
export type RunFunc = (props: RunFuncProps) => void;

/**
 * @internal
 */
type ActionIndex = {
  [name: string]: RunFunc;
};

/**
 * @internal
 */
export const actionIndex: ActionIndex = {};

/**
 * @internal
 */
export interface RunProps {
  name: string;
  data?: any;
  auths: Auths;
  variables: Variables;
  secrets: Secrets;
  webhook: string | null;
  context?: any;
}

/**
 * @internal
 *
 * @param props
 */
export async function run(props: RunProps) {
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
