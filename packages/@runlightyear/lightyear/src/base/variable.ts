import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { deployList } from "./deploy";

export interface VariableProps {
  name: string;
}

function validateVariableProps({ name }: VariableProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");
}

export function defineVariable(props: VariableProps) {
  validateVariableProps(props);
  deployList.push({ type: "variable", data: props });

  return props.name;
}

export async function deployVariable(envName: string, props: VariableProps) {
  validateVariableProps(props);
  const { name }: VariableProps = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/variables`,
    data: {
      name,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deployVariable failed: ${name}`);
  }

  console.info(`Deployed variable: ${name}`);
}

export type VariableData = {
  value: string | null;
};

export async function getVariableData(name: string): Promise<VariableData> {
  const envName = process.env.ENV_NAME;
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/variables/${name}/data`,
  });

  const data = (await response.json()) as VariableData;

  const { value } = data;

  return {
    value,
  };
}
