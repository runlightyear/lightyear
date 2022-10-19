import fetch from "node-fetch";
import getCompiledCode from "./getCompiledCode";
import readPackage from "./readPackage";
import runInContext from "./runInContext";

export default async function runTask({
  taskName,
  data,
  deliveryId,
}: {
  taskName: string;
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
    taskName,
    data,
  });

  const { statusCode, body } = handlerResult;

  const responseData = JSON.parse(body);

  const { logs } = responseData;

  const status = statusCode >= 300 ? "FAILURE" : "SUCCESS";

  const response = await fetch(`${baseUrl}/api/v1/envs/${envName}/runs`, {
    method: "POST",
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      taskName,
      logs,
      deliveryId,
    }),
  });

  if (response.ok) {
    console.log("Uploaded run result");
  } else {
    console.log("Failed to upload run result");
  }

  return handlerResult;
}
