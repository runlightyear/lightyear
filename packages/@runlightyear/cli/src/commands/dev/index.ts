import { Command, Option } from "commander";
import getPusher from "../../shared/getPusher";
import getPusherCredentials from "../../shared/getPusherCredentials";
import handleRunLocal from "./handleRunLocal";
import nodemon from "nodemon";
import { terminal } from "terminal-kit";
import { setLogDisplayLevel } from "../../shared/setLogDisplayLevel";
import { prepareConsole } from "../../logging";
import handleResubscribe from "./handleResubscribe";
import { largeLogo } from "../../largeLogo";
import { pushOperation } from "../../shared/operationQueue";
import handleGetAuthRequestUrl from "./handleGetAuthRequestUrl";
import handleRequestAccessToken from "./handleRequestAccessToken";

export const dev = new Command("dev");

let firstDeploy = true;

dev
  .description(
    "Automatically deploy changes, run actions, and respond to webhooks in your dev environment"
  )
  .addOption(new Option("--dev").hideHelp())
  .action(async () => {
    terminal(largeLogo);

    const credentials = await getPusherCredentials();
    const pusher = await getPusher(credentials);

    const subscription = pusher.subscribe(credentials.userId);
    subscription.bind("localRunTriggered", handleRunLocal);
    subscription.bind("localResubscribeTriggered", handleResubscribe);
    subscription.bind(
      "localGetAuthRequestUrlTriggered",
      handleGetAuthRequestUrl
    );
    subscription.bind(
      "localRequestAccessTokenTriggered",
      handleRequestAccessToken
    );

    nodemon({
      ignoreRoot: [".git"],
      watch: ["src", "node_modules/@runlightyear/lightyear/dist"],
      ext: "js,ts",
      execMap: {
        js: "npm run build",
      },
    });

    terminal.on("key", async (name: string, matches: any, data: any) => {
      if (data.code === "q" || data.code === "\u0003") {
        terminal.grabInput(false);
        setTimeout(function () {
          process.exit();
        }, 100);
      } else if (data.code === "d") {
        await pushOperation({ operation: "deploy", params: undefined });

        terminal("\n\nWaiting for file changes...\n");
        terminal("press h for help, press q to quit\n");
      } else if (data.code === "l") {
        console.info("DEBUG logging on");
        setLogDisplayLevel("DEBUG");
        prepareConsole();
      } else if (data.code === "m") {
        console.info("DEBUG logging off");
        setLogDisplayLevel("INFO");
        prepareConsole();
      } else if (data.code === "h") {
        terminal("\n");
        terminal("  press d to deploy\n");
        terminal("  press l to turn DEBUG logs on\n");
        terminal("  press m to turn DEBUG logs off\n");
        terminal("  press q to quit\n");
        terminal("\n");
      } else {
        // terminal(`got key: '${name}'\n`);
        // terminal(`got matches: '${matches}'\n`);
        // terminal(`got data: '${JSON.stringify(data)}'\n`);
      }
    });

    nodemon.on("exit", async () => {
      await pushOperation({ operation: "deploy", params: undefined });

      if (firstDeploy) {
        terminal(
          "\n\nDashboard is available at: https://app.runlightyear.com\n"
        );
        firstDeploy = false;
      }

      terminal("\n\nWaiting for file changes...\n");
      terminal("press h for help, press q to quit\n");

      terminal.grabInput(true);
    });
  });
