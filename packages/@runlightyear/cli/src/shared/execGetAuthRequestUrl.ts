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
  try {
    handler = runInContext(compiledCode).handler;
  } catch (error) {
    prepareConsole();
    console.error(error);
    return;
  }

  const handlerResult = await handler({
    operation: "getAuthRequestUrl",
    customAppName,
    authName,
    logDisplayLevel,
  });

  prepareConsole();

  const { statusCode, body } = handlerResult;
  const responseData = JSON.parse(body);
  const { authRequestUrl, logs } = responseData;

  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  console.debug(`about to upload authRequestUrl: ${authRequestUrl}`);

  await deliverLocalResponse({
    localResponseId,
    response: JSON.stringify({ authRequestUrl }),
  });

  console.info(`Returned auth request url for ${customAppName}`);

  await createAuthorizerActivity({
    customAppName,
    type: "GET_AUTH_REQUEST_URL",
    status,
    logs,
  });

  return status;
}
