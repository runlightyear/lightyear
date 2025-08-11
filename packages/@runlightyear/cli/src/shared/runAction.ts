import getCompiledCode from "./getCompiledCode";
import readPackage from "./readPackage";
import runInContext from "./runInContext";
import { prepareConsole } from "../logging";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";
import {
  clearRunCanceled,
  isRunCanceled,
  waitForRunCanceled,
} from "./cancellation";

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

  if (isRunCanceled(runId)) {
    console.info("Run was canceled before start", runId);
    return;
  }

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
    const handlerPromise = handler({
      operation: "run",
      actionName,
      runId,
      data,
      logDisplayLevel,
    });

    // Race the handler with a cancellation signal. If canceled first, skip uploading a result.
    const result = await Promise.race([
      handlerPromise,
      (async () => {
        await waitForRunCanceled(runId);
        return { statusCode: 499, body: JSON.stringify({ logs: [] }) };
      })(),
    ] as const);

    prepareConsole();

    const { statusCode, body } = result;

    const responseData = JSON.parse(body);

    const { logs: logsFromVm } = responseData;

    if (statusCode === 499) {
      console.info("Run canceled while executing", runId);
      clearRunCanceled(runId);
      return;
    }

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
        // logs,
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
