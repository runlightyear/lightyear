import getPusher from "../../../shared/getPusher";
import getPusherCredentials from "../../../shared/getPusherCredentials";
import fetchDeploy from "./fetchDeploy";
import { program } from "commander";
import countLines from "./countLines";
import { terminal } from "terminal-kit";

export default async function waitUntilDeployFinishes(deployId: string) {
  const credentials = await getPusherCredentials();
  const pusher = await getPusher(credentials);

  let prevLogLineCount: number = 1;

  const handleUpdate = async () => {
    const deploy = await fetchDeploy("prod", deployId);

    terminal.up(prevLogLineCount - 1);

    const { status, logs } = deploy;

    const logOutput = logs.join("\n") + "\n";
    terminal(logOutput);

    prevLogLineCount = countLines(logOutput);

    if (status === "SUCCESS") {
      terminal.green("Deploy succeeded! 🚀\n");
      process.exit(0);
    } else if (status === "FAILURE") {
      terminal.red("Deploy failed\n");
      process.exit(1);
    }
  };

  const subscription = pusher.subscribe(`deploy=${deployId}`);
  subscription.bind("updated", handleUpdate);

  await handleUpdate();
}
