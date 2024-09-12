import { prefixedRedactedConsole } from "../logging";

export async function handlerResult(
  statusCode: number,
  message: string,
  additionalData?: { [key: string]: any }
) {
  // @ts-ignore
  const logList = [...prefixedRedactedConsole.history];

  // // Lambdas retain state in between 'warm' runs, so important to clear
  // // anything global
  // emptyLogs();
  // emptySecrets();

  await prefixedRedactedConsole.flushQueue();

  return {
    statusCode,
    body: JSON.stringify(
      { message, logs: logList, ...additionalData },
      null,
      2
    ),
  };
}
