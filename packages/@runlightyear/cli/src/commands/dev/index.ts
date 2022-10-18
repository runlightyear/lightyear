import { Command } from "commander";
import getPusher from "../../shared/getPusher";
import getPusherCredentials from "../../shared/getPusherCredentials";
import handleRunLocal from "./handleRunLocal";
import nodemon from "nodemon";
import execDeploy from "../../shared/execDeploy";
import unsubscribe from "../../shared/unsubscribe";
import subscribe from "../../shared/subscribe";

export const dev = new Command("dev");

dev
  .description("Automatically compile and deploy on changes to source")
  .action(async () => {
    console.log("ready to dev");

    const credentials = await getPusherCredentials();
    const pusher = await getPusher(credentials);

    const subscription = pusher.subscribe(`user=${credentials.userId}`);
    subscription.bind("runLocal", handleRunLocal);

    nodemon({
      ignoreRoot: [".git"],
      watch: ["src", "node_modules/@bigidea/integration-connectors/dist"],
      ext: "js,ts",
      execMap: {
        js: "npm run build",
      },
    });

    nodemon.on("exit", async () => {
      await execDeploy();
      await unsubscribe();
      await subscribe();
    });
  });
