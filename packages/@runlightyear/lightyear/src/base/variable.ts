import invariant from "tiny-invariant";
import baseRequest from "./baseRequest";
import { getEnvName } from "../util/getEnvName";

/**
 * @internal
 */
export type VariableData = {
  value: string | null;
};

/**
 * @internal
 *
 * @param name
 */
export async function getVariableData(name: string): Promise<VariableData> {
  const envName = getEnvName();
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
