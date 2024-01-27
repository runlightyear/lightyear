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
export type ActionIndex = {
  [name: string]: RunFunc;
};

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
  console.debug("actionIndex", Object.keys(globalThis.actionIndex));

  const fn = globalThis.actionIndex[name];
  if (!fn) {
    console.error(
      `Unknown action: ${name}`,
      "Known actions:",
      Object.keys(globalThis.actionIndex)
    );
    throw new Error(`Unknown action: ${name}`);
  }

  console.debug("Running the action function");
  await fn({ data, auths, variables, secrets, webhook, context });
}
