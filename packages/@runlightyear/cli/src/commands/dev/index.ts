import { Command } from "commander";
import getPusher from "../../shared/getPusher";
import getPusherCredentials from "../../shared/getPusherCredentials";
import handleRunLocal from "./handleRunLocal";
import nodemon from "nodemon";
import execDeploy from "../../shared/execDeploy";
import execUnsubscribeAfterDeploy from "../../shared/execUnsubscribeAfterDeploy";
import execSubscribeAfterDeploy from "../../shared/execSubscribeAfterDeploy";
import { terminal } from "terminal-kit";
import { setLogDisplayLevel } from "../../shared/setLogDisplayLevel";
import { prepareConsole } from "../../logging";

export const dev = new Command("dev");

const largeLogo = `
  _ _       _     _                         
 | (_) __ _| |__ | |_ _   _  ___  __ _ _ __ 
 | | |/ _\` | '_ \\| __| | | |/ _ \\/ _\` | '__|
 | | | (_| | | | | |_| |_| |  __/ (_| | |   
 |_|_|\\__, |_| |_|\\__|\\__, |\\___|\\__,_|_|   
      |___/           |___/                 
`;

dev
  .description("Automatically compile and deploy on changes to source")
  .action(async () => {
    terminal(largeLogo);

    const credentials = await getPusherCredentials();
    const pusher = await getPusher(credentials);

    const subscription = pusher.subscribe(credentials.userId);
    subscription.bind("localRunTriggered", handleRunLocal);

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
        await execDeploy();
        await execUnsubscribeAfterDeploy();
        await execSubscribeAfterDeploy();

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
      await execDeploy();
      await execUnsubscribeAfterDeploy();
      await execSubscribeAfterDeploy();

      terminal("\n\nWaiting for file changes...\n");
      terminal("press h for help, press q to quit\n");
      // terminal("press q to quit\n");

      terminal.grabInput(true);
    });
  });
