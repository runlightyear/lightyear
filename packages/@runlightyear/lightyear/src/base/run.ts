import baseRequest from "./baseRequest";
import invariant from "tiny-invariant";
import { AuthData } from "./auth";
import { getEnvName } from "../util/getEnvName";
import { prefixedRedactedConsole } from "../logging";

export interface RunFuncProps {
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
  integration: {
    id: string;
    name: string;
    title: string;
  } | null;
  managedUser: {
    id: string;
    externalId: string;
    displayName: string | null;
  } | null;
}

export async function getRunFuncProps(runId: string): Promise<RunFuncProps> {
  const envName = getEnvName();
  invariant(envName, "Missing ENV_NAME");

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/runs/${runId}/run-func-props`,
  });

  const runFuncProps = <RunFuncProps>await response.json();

  const { auths, variables, secrets, integration, managedUser, webhook } =
    runFuncProps;

  for (const auth of Object.values(auths)) {
    const { accessToken, refreshToken, apiKey } = auth;

    accessToken && prefixedRedactedConsole.addSecrets([accessToken]);
    refreshToken && prefixedRedactedConsole.addSecrets([refreshToken]);
    apiKey && prefixedRedactedConsole.addSecrets([apiKey]);
  }

  prefixedRedactedConsole.addSecrets(Object.values(secrets));

  return {
    auths,
    variables,
    secrets,
    webhook,
    integration,
    managedUser,
  };
}
