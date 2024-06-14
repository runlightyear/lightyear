import fetch from "node-fetch";
import getCompiledCode from "./getCompiledCode";
import readPackage from "./readPackage";
import runInContext from "./runInContext";
import { prepareConsole } from "../logging";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export interface RunActionProps {
  actionName: string;
  runId: string;
  data?: object;
  deliveryId?: string;
}

export default async function runAction({
  actionName,
  runId,
  data,
  deliveryId,
}: RunActionProps) {
  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();

  const startResponse = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/runs/${runId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "RUNNING",
        startedAt: "now",
        // deliveryId,
      }),
    }
  );

  const pkg = readPackage();

  const compiledCode = getCompiledCode(pkg.main);

  let handler;
  let status;
  let logs;

  try {
    handler = runInContext(compiledCode).handler;
  } catch (error) {
    console.error(String(error));
    status = "FAILED";
    logs = [`[ERROR]: ${String(error)}`];
  }

  if (handler) {
    const handlerResult = await handler({
      operation: "run",
      actionName,
      runId,
      data,
      logDisplayLevel,
    });

    prepareConsole();

    const { statusCode, body } = handlerResult;

    const responseData = JSON.parse(body);

    const { logs: logsFromVm } = responseData;

    status =
      statusCode === 202
        ? "SKIPPED"
        : statusCode >= 300
        ? "FAILED"
        : "SUCCEEDED";

    logs = logsFromVm;
  }

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/runs/${runId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        logs,
        endedAt: "now",
        // deliveryId,
      }),
    }
  );

  if (response.ok) {
    console.info("Uploaded run result");
  } else {
    console.error(
      "Failed to upload run result",
      response.status,
      response.statusText
    );
    console.error(await response.text());
  }
}
