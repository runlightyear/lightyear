import readPackage from "../readPackage";
import getCompiledCode from "../getCompiledCode";
import runInContext from "../runInContext";
import { logDisplayLevel } from "../setLogDisplayLevel";
import { prepareConsole } from "../../logging";
import { deliverLocalResponse } from "../deliverLocalResponse";

export interface ExecRequestAccessTokenProps {
  customAppName: string;
  authName: string;
  code: string;
  localResponseId: string;
}

export async function execRequestAccessToken(
  props: ExecRequestAccessTokenProps
) {
  const { customAppName, authName, code, localResponseId } = props;

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
    operation: "requestAccessToken",
    customAppName,
    authName,
    code,
    logDisplayLevel,
  });

  prepareConsole();

  const { statusCode, body } = result;

  console.info(`Requested access token successfully for ${customAppName}`);

  await deliverLocalResponse({ localResponseId, response: "OK" });
}
