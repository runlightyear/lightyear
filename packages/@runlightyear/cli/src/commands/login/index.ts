import { Command, Option } from "commander";
import { prompt } from "enquirer";
import startServer from "./startServer";
import getRequestHandler from "./getRequestHandler";
import openBrowser from "./openBrowser";
import getAccountType from "./getAccountType";
import { terminal } from "terminal-kit";

export const login = new Command("login");

login
  .description(
    "Login to get credentials, which are stored in .env in project root"
  )
  .addOption(new Option("--dev").hideHelp())
  .action(async (options) => {
    let authUrl = "https://app.runlightyear.com";
    let baseUrl = "https://app.runlightyear.com";
    if (options.dev) {
      terminal.red("In dev mode, using http://localhost:3000\n");
      authUrl = "http://localhost:3000";
      baseUrl = "http://localhost:3000";
    }

    const accountType = await getAccountType();

    const localPort = await startServer(getRequestHandler(baseUrl));

    await openBrowser(authUrl, baseUrl, accountType, localPort);
  });
