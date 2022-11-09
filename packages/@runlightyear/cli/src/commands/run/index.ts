import { Command } from "commander";
import runAction from "../../shared/runAction";

export const run = new Command("run");

run
  .description("Run a action")
  .argument("<name>", "Name of action to run")
  .action(async (actionName) => {
    console.log("ready to run");
    await runAction({ actionName });
  });
