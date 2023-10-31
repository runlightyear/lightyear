import readPackage from "../readPackage";
import getCompiledCode from "../getCompiledCode";
import runInContext from "../runInContext";
import { logDisplayLevel } from "../setLogDisplayLevel";
import { prepareConsole } from "../../logging";
import { deliverLocalResponse } from "../deliverLocalResponse";
import createAuthorizerActivity from "../createAuthorizerActivity";

export interface ExecRefreshAccessTokenProps {
  customAppName: string;
  authName: string;
  code: string;
  localResponseId: string;
}

export async function execRefreshAccessToken(
  props: ExecRefreshAccessTokenProps
) {
  const { customAppName, authName, localResponseId } = props;

  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  let handler;
  try {
    handler = runInContext(compiledCode).handler;
  } catch (error) {
    prepareConsole();
    console.error(error);
    throw error;
  }

  const result = await handler({
    operation: "refreshAccessToken",
    customAppName,
    authName,
    logDisplayLevel,
  });

  prepareConsole();

  const { statusCode, body } = result;
  const responseData = JSON.parse(body);
  const { logs } = responseData;

  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  console.info(`Refreshed access token successfully for ${customAppName}`);

  await createAuthorizerActivity({
    customAppName,
    type: "REFRESH_ACCESS_TOKEN",
    status,
    logs: logs,
  });

  if (localResponseId) {
    await deliverLocalResponse({ localResponseId, response: "OK" });
  }

  return status;
}
