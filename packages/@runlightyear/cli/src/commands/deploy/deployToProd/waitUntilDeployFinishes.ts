import getPusher from "../../../shared/getPusher";
import getPusherCredentials from "../../../shared/getPusherCredentials";
import fetchDeploy from "./fetchDeploy";
import { terminal } from "terminal-kit";
import { logDisplayLevel } from "../../../shared/setLogDisplayLevel";
import throttle from "lodash/throttle";

export type Log = {
  id: string;
  createdAt: Date;
  deployId: string | null;
  runId: string | null;
  deliveryId: string | null;
  level: "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";
  message: string;
};

export type GetDeployDetailResponseBody = {
  id: string;
  status: "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED";
  reason: string | null;
  createdAt: string;
  logs: Log[];
};

export default async function waitUntilDeployFinishes(deployId: string) {
  const credentials = await getPusherCredentials();
  const pusher = await getPusher(credentials);

  let lineOutputCounter = 0;

  const handleUpdate = async () => {
    const deploy = (await fetchDeploy(
      "prod",
      deployId
    )) as GetDeployDetailResponseBody;

    const { status, logs } = deploy;

    const newLogs = logs.slice(lineOutputCounter);

    const logOutput =
      newLogs
        .filter((log) =>
          logDisplayLevel === "DEBUG" ? true : log.level !== "DEBUG"
        )
        .map(
          (log) =>
            "\x1b[35m" +
            "Server: " +
            "\x1b[0m" +
            `[${log.level}]: ${log.message}`
        )
        .join("\n") + "\n";
    terminal(logOutput);

    lineOutputCounter = newLogs.length;

    if (status === "SUCCEEDED") {
      terminal.green("Deploy succeeded! 🚀\n");
      process.exit(0);
    } else if (status === "FAILED") {
      terminal.red("Deploy failed 💥\n");
      process.exit(1);
    }
  };

  const throttledHandleUpdate = throttle(handleUpdate, 1000);

  const channel = credentials.prodEnvId;
  console.debug("Subscribing to channel (credentials.prodEnvId)", channel);
  const subscription = pusher.subscribe(channel);
  subscription.bind("deployUpdated", throttledHandleUpdate);

  await throttledHandleUpdate();
}
