import { Command, Option, program } from "commander";
import getPusher from "../../shared/getPusher";
import getPusherCredentials from "../../shared/getPusherCredentials";
import handleRunLocal from "./handleRunLocal";
import nodemon from "nodemon";
// Removed terminal-kit import - migrated to ink
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
import { useState, useEffect } from "react";
import { render, Text, Box, useInput } from "ink";

export const dev = new Command("dev");

const CommandPrompt = () => {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  useInput((input, key) => {
    if (key.return) {
      // Handle command execution
      handleCommand(input);
      setInput("");
    } else if (key.delete || key.backspace) {
      setInput((prev) => prev.slice(0, -1));
    } else if (input) {
      setInput((prev) => prev + input);
    }
  });

  const handleCommand = (command: string) => {
    const trimmed = command.trim().toLowerCase();

    switch (trimmed) {
      case "d":
      case "deploy":
        pushOperation({ operation: "deploy", params: undefined });
        addLog("Deploying...");
        break;
      case "l":
      case "debug on":
        setLogDisplayLevel("DEBUG");
        prepareConsole();
        addLog("DEBUG logging enabled");
        break;
      case "m":
      case "debug off":
        setLogDisplayLevel("INFO");
        prepareConsole();
        addLog("DEBUG logging disabled");
        break;
      case "h":
      case "help":
        addLog("Available commands:");
        addLog("  d, deploy     - Deploy changes");
        addLog("  l, debug on   - Enable DEBUG logging");
        addLog("  m, debug off  - Disable DEBUG logging");
        addLog("  h, help       - Show this help");
        addLog("  q, quit       - Exit the CLI");
        break;
      case "q":
      case "quit":
      case "exit":
        process.exit();
        break;
      case "":
        // Empty command, do nothing
        break;
      default:
        addLog(
          `Unknown command: ${command}. Type 'h' or 'help' for available commands.`
        );
    }
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-20), `[${timestamp}] ${message}`]);
  };

  // Override console methods to capture logs
  useEffect(() => {
    const originalConsole = { ...console };

    console.log = (...args) => {
      originalConsole.log(...args);
      addLog(args.join(" "));
    };

    console.info = (...args) => {
      originalConsole.info(...args);
      addLog(`INFO: ${args.join(" ")}`);
    };

    console.error = (...args) => {
      originalConsole.error(...args);
      addLog(`ERROR: ${args.join(" ")}`);
    };

    console.debug = (...args) => {
      originalConsole.debug(...args);
      addLog(`DEBUG: ${args.join(" ")}`);
    };

    return () => {
      Object.assign(console, originalConsole);
    };
  }, []);

  return (
    <Box flexDirection="column" height="100%">
      {/* Logs Section */}
      <Box flexDirection="column" flexGrow={1} paddingBottom={1}>
        {logs.map((log, index) => (
          <Text key={index}>{log}</Text>
        ))}
      </Box>

      {/* Command Prompt */}
      <Box>
        <Text color="green">lightyear</Text>
        <Text color="gray"> › </Text>
        <Text>{input}</Text>
        <Text color="gray">█</Text>
      </Box>
    </Box>
  );
};

dev
  .description(
    "Automatically deploy changes, run actions, and respond to webhooks in your dev environment"
  )
  .addOption(new Option("--dev").hideHelp())
  .action(async () => {
    // Display logo before starting ink UI
    console.log(largeLogo);
    console.log("\n");

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

    // Render the Ink command prompt
    render(<CommandPrompt />);

    nodemon.on("exit", async () => {
      pushOperation({ operation: "deploy", params: undefined });
    });
  });
