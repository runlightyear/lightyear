import readPackage from "../readPackage";
import getCompiledCode from "../getCompiledCode";
import runInContext from "../runInContext";
import { logDisplayLevel } from "../setLogDisplayLevel";
import { prepareConsole } from "../../logging";
import { deliverLocalResponse } from "../deliverLocalResponse";

export interface ExecRefreshAccessTokenProps {
  customAppName: string;
  authName: string;
  code: string;
  localResponseId: string;
}

export async function execRefreshAccessToken(
  props: ExecRefreshAccessTokenProps
) {
  const { customAppName, authName } = props;

  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  let handler;
  try {
    handler = runInContext(compiledCode);
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

  console.info(`Refreshed access token successfully for ${customAppName}`);

  // await deliverLocalResponse({ localResponseId, response: "OK" });
}
