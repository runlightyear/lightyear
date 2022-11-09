import fetch from "node-fetch";
import getCompiledCode from "./getCompiledCode";
import readPackage from "./readPackage";
import runInContext from "./runInContext";

export default async function runAction({
  actionName,
  data,
  deliveryId,
}: {
  actionName: string;
  data?: object;
  deliveryId?: string;
}) {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

  const pkg = readPackage();

  const compiledCode = getCompiledCode(pkg.main);
  const handler = runInContext(compiledCode);

  const handlerResult = await handler({
    action: "run",
    actionName,
    data,
  });

  const { statusCode, body } = handlerResult;

  const responseData = JSON.parse(body);

  const { logs } = responseData;

  const status = statusCode >= 300 ? "FAILED" : "SUCCEEDED";

  const response = await fetch(`${baseUrl}/api/v1/envs/${envName}/runs`, {
    method: "POST",
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      actionName,
      // logs,
      // deliveryId,
    }),
  });

  if (response.ok) {
    console.log("Uploaded run result");
  } else {
    console.error(
      "Failed to upload run result",
      response.status,
      response.statusText
    );
  }

  return handlerResult;
}
