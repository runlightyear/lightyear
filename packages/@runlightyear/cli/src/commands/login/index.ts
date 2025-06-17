import { Command, Option } from "commander";
import { prompt } from "enquirer";
import startServer from "./startServer";
import getRequestHandler from "./getRequestHandler";
import openBrowser from "./openBrowser";
import getAccountType from "./getAccountType";
import chalk from "chalk";

export const login = new Command("login");
export const signup = new Command("signup");

const obj: { [name: string]: Command } = { login: login, signup: signup };

for (const name in obj) {
  obj[name]
    .description(
      `${name === "login" ? "Log in" : "Sign up"} to get credentials`
    )
    .addOption(new Option("--dev").hideHelp())
    .action(async (options) => {
      let authUrl = "https://app.runlightyear.com";
      let baseUrl = "https://app.runlightyear.com";
      if (options.dev) {
        console.log(chalk.red("In dev mode, using http://localhost:3000"));
        authUrl = "http://localhost:3000";
        baseUrl = "http://localhost:3000";
      }

      const accountType = name === "login" ? "existing" : "new";

      // Create a promise that resolves when login is complete
      const loginComplete = new Promise<void>(async (resolve) => {
        const { port: localPort, server } = await startServer(
          getRequestHandler(baseUrl, () => {
            // Gracefully shut down server and resolve
            server.close(() => {
              resolve();
            });
          })
        );

        await openBrowser(authUrl, baseUrl, accountType, localPort);
      });

      // Wait for login to complete, then return naturally
      await loginComplete;
    });
}
