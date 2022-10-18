import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { deployList } from "./deploy";

export interface SecretProps {
  name: string;
}

function validateSecretProps({ name }: SecretProps) {
  invariant(name, "Missing required name");
  invariant(typeof name === "string", "Name must be a string");
}

export function defineSecret(props: SecretProps) {
  validateSecretProps(props);
  deployList.push({ type: "secret", data: props });

  return props.name;
}

export async function deploySecret(envName: string, props: SecretProps) {
  validateSecretProps(props);
  const { name }: SecretProps = props;

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/secrets`,
    data: {
      name,
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`deploySecret failed: ${name}`);
  }

  console.info(`Deployed secret: ${name}`);
}

export type SecretData = {
  value: string | null;
};
