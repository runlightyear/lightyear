import { Command, Option, program } from "commander";
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
import handleRefreshAccessToken from "./handleRefreshAccessToken";
import { handleRefreshSubscription } from "./handleRefreshSubscription";
import { handleReceiveCustomAppWebhook } from "./handleReceiveCustomAppWebhook";

export const dev = new Command("dev");

dev
  .description(
    "Automatically deploy changes, run actions, and respond to webhooks in your dev environment"
  )
  .addOption(new Option("--dev").hideHelp())
  .action(async () => {
    terminal(largeLogo);
    terminal("\n\n");

    const options = program.opts();
    if (options.debug) {
      setLogDisplayLevel("DEBUG");
      prepareConsole();
      console.debug("Outputting debug information");
    }

    const credentials = await getPusherCredentials();
    const pusher = await getPusher(credentials);

    console.debug(
      `Attempting to subscribe to presence channel ${credentials.devEnvId}\n`
    );
    const presenceSubscription = pusher.subscribe(
      `presence-${credentials.devEnvId}`
    );
    presenceSubscription.bind("pusher:subscription_succeeded", () => {
      console.debug("Subscribed to presence channel\n");
    });

    console.debug(
      "Attempting to subscribe to regular channel",
      credentials.devEnvId
    );
    const subscription = pusher.subscribe(credentials.devEnvId);
    subscription.bind("pusher:subscription_succeeded", () => {
      console.debug("Subscribed to regular channel");
    });

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
    subscription.bind(
      "localRefreshAccessTokenTriggered",
      handleRefreshAccessToken
    );
    subscription.bind(
      "localRefreshSubscriptionTriggered",
      handleRefreshSubscription
    );
    subscription.bind(
      "localReceiveCustomAppWebhookTriggered",
      handleReceiveCustomAppWebhook
    );

    nodemon({
      ignoreRoot: [".git"],
      watch: ["src", "node_modules/@runlightyear/lightyear/dist"],
      ext: "js,ts",
      execMap: {
        js: "npx lightyear build",
      },
    });

    terminal.on("key", async (name: string, matches: any, data: any) => {
      if (data.code === "q" || data.code === "\u0003") {
        terminal.grabInput(false);
        setTimeout(function () {
          process.exit();
        }, 100);
      } else if (data.code === "d") {
        pushOperation({ operation: "deploy", params: undefined });
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
      pushOperation({ operation: "deploy", params: undefined });
      terminal.grabInput(true);
    });
  });
