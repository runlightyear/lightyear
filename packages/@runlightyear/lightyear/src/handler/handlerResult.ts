import { emptyLogs, emptySecrets } from "../logging";

export function handlerResult(statusCode: number, message: string) {
  // @ts-ignore
  const logList = [...global.logs];

  // Lambdas retain state in between 'warm' runs, so important to clear
  // anything global
  emptyLogs();
  emptySecrets();

  return {
    statusCode,
    body: JSON.stringify({ message, logs: logList }, null, 2),
  };
}
