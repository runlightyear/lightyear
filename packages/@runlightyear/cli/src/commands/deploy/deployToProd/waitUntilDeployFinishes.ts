import getPusher from "../../../shared/getPusher";
import getPusherCredentials from "../../../shared/getPusherCredentials";
import fetchDeploy from "./fetchDeploy";
import { program } from "commander";
import countLines from "./countLines";
import { terminal } from "terminal-kit";
import { logDisplayLevel } from "../../../shared/setLogDisplayLevel";

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

  terminal("Waiting for logs...\n");
  let prevLogLineCount: number = 1;

  const handleUpdate = async () => {
    const deploy = (await fetchDeploy(
      "prod",
      deployId
    )) as GetDeployDetailResponseBody;

    terminal.up(prevLogLineCount);

    const { status, logs } = deploy;

    const logOutput =
      logs
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

    prevLogLineCount = countLines(logOutput);

    if (status === "SUCCEEDED") {
      terminal.green("Deploy succeeded! 🚀\n");
      process.exit(0);
    } else if (status === "FAILED") {
      terminal.red("Deploy failed 💥\n");
      process.exit(1);
    }
  };

  const subscription = pusher.subscribe(credentials.userId);
  subscription.bind("deployUpdated", handleUpdate);

  await handleUpdate();
}
