import { Command, Option, program } from "commander";
import getPusher from "../../shared/getPusher";
import getPusherCredentials from "../../shared/getPusherCredentials";
import handleRunLocal from "./handleRunLocal";
import nodemon from "nodemon";
import { terminal } from "terminal-kit";
import {
  setLogDisplayLevel,
  logDisplayLevel,
} from "../../shared/setLogDisplayLevel";
import { prepareConsole } from "../../logging";
import handleResubscribe from "./handleResubscribe";
import { largeLogo } from "../../largeLogo";
import { pushOperation } from "../../shared/operationQueue";
import {
  pauseOperationQueue,
  resumeOperationQueue,
} from "../../shared/operationQueue";
import handleGetAuthRequestUrl from "./handleGetAuthRequestUrl";
import handleRequestAccessToken from "./handleRequestAccessToken";
import handleRefreshAccessToken from "./handleRefreshAccessToken";
import { handleRefreshSubscription } from "./handleRefreshSubscription";
import { handleReceiveCustomAppWebhook } from "./handleReceiveCustomAppWebhook";
import { trigger as triggerCommand } from "../trigger";
import getQueuedRuns from "../../shared/getQueuedRuns";
import execDeployAndSubscribe from "../../shared/execDeployAndSubscribe";
import { requireAuth } from "../../shared/requireAuth";

export const dev = new Command("dev");

dev
  .description(
    "Automatically deploy changes, run actions, and respond to webhooks in your dev environment"
  )
  .addOption(new Option("--dev").hideHelp())
  .action(async () => {
    requireAuth();
    
    terminal(largeLogo);
    terminal("\n\n");

    const options = program.opts();
    if (options.debug) {
      setLogDisplayLevel("DEBUG");
      prepareConsole();
      console.debug("Outputting debug information");
    }

    const devEnvironment = "dev";

    terminal("Deploying latest build to dev...\n");
    try {
      await execDeployAndSubscribe(devEnvironment);
    } catch (error) {
      terminal.red("Initial dev deploy failed.\n");
      console.error(error);
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

    // On startup, fetch any queued runs and enqueue them oldest-first
    try {
      terminal("\nChecking for queued runs...\n");
      const queued = await getQueuedRuns(devEnvironment);
      if (queued.length > 0) {
        terminal(`Found ${queued.length} queued run(s). Adding to queue...\n`);
        for (const item of queued) {
          pushOperation({
            operation: "run",
            params: {
              actionName: item.actionName,
              runId: item.id,
              data: item.data,
              deliveryId: item.deliveryId,
              environment: devEnvironment,
            },
          });
        }
      } else {
        terminal("No queued runs found.\n");
      }
    } catch (e) {
      terminal.red("Failed to enqueue queued runs on startup\n");
      console.debug(e);
    }

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
        pushOperation({
          operation: "deploy",
          params: { environment: devEnvironment },
        });
      } else if (data.code === "t") {
        // Execute the trigger command interactively
        terminal.grabInput(false);
        pauseOperationQueue(); // Pause the queue while trigger is active
        try {
          await triggerCommand.parseAsync([
            "node",
            "lightyear",
            "trigger",
            "--interactive",
            "--env",
            devEnvironment,
          ]);
        } finally {
          resumeOperationQueue(); // Always resume the queue
          terminal.grabInput(true);
        }
      } else if (data.code === "l") {
        if (logDisplayLevel === "DEBUG") {
          console.info("DEBUG logging off");
          setLogDisplayLevel("INFO");
        } else {
          console.info("DEBUG logging on");
          setLogDisplayLevel("DEBUG");
        }
        prepareConsole();
      } else if (data.code === "h") {
        terminal("\n");
        terminal("  press d to deploy\n");
        terminal("  press t to trigger an action\n");
        terminal(
          `  press l to turn DEBUG logs ${
            logDisplayLevel === "DEBUG" ? "off" : "on"
          }\n`
        );
        terminal("  press q to quit\n");
        terminal("\n");
      } else {
        // terminal(`got key: '${name}'\n`);
        // terminal(`got matches: '${matches}'\n`);
        // terminal(`got data: '${JSON.stringify(data)}'\n`);
      }
    });

    nodemon.on("exit", async () => {
      pushOperation({
        operation: "deploy",
        params: { environment: devEnvironment },
      });
      terminal.grabInput(true);
    });
  });
