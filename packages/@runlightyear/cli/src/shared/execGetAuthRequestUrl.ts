import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { prepareConsole } from "../logging";
import { deliverLocalResponse } from "./deliverLocalResponse";
import createAuthorizerActivity from "./createAuthorizerActivity";

export interface ExecGetAuthRequestUrlProps {
  customAppName: string;
  authName: string;
  localResponseId: string;
}

export async function execGetAuthRequestUrl(props: ExecGetAuthRequestUrlProps) {
  const { customAppName, authName, localResponseId } = props;

  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  let handler;
  let status: "SUCCEEDED" | "FAILED";
  let logs;

  try {
    handler = runInContext(compiledCode).handler;
  } catch (error) {
    prepareConsole();
    console.error(error);
    status = "FAILED";
    logs = [`[ERROR] ${String(error)}`];
  }

  if (handler) {
    const handlerResult = await handler({
      operation: "getAuthRequestUrl",
      customAppName,
      authName,
      logDisplayLevel,
    });

    prepareConsole();

    const { statusCode, body } = handlerResult;
    const responseData = JSON.parse(body);
    const { authRequestUrl, message, logs: logsFromVm } = responseData;

    status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

    let localResponse;

    if (status === "FAILED") {
      localResponse = {
        error: message,
      };
    } else {
      console.debug(`about to upload authRequestUrl: ${authRequestUrl}`);
      localResponse = {
        authRequestUrl,
      };
    }

    await deliverLocalResponse({
      localResponseId,
      response: JSON.stringify(localResponse),
    });

    console.info(`Returned auth request url for ${customAppName}`);

    logs = logsFromVm;
  } else {
    status = "FAILED";
  }

  await createAuthorizerActivity({
    customAppName,
    type: "GET_AUTH_REQUEST_URL",
    status,
    logs,
  });
}
