import { Command } from "commander";
import checkLocalDirectoryAvailable from "./checkLocalDirectoryAvailable";
import checkGitInstalled from "./checkGitInstalled";
import cloneFromTemplate from "./cloneFromTemplate";

export const create = new Command("create");

create
  .description("Create a new integration repo from template and clone it")
  .argument("<name>", "Name of project")
  .action(async (name) => {
    await checkGitInstalled();
    await checkLocalDirectoryAvailable(name);
    await cloneFromTemplate(name);
  });
