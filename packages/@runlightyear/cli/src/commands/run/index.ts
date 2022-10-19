import { Command } from "commander";
import runTask from "../../shared/runTask";

export const run = new Command("run");

run
  .description("Run a task")
  .argument("<name>", "Name of task to run")
  .action(async (taskName) => {
    console.log("ready to run");
    await runTask({ taskName });
  });
