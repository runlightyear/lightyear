import { Command } from "commander";
import checkLocalDirectoryAvailable from "./checkLocalDirectoryAvailable";
import checkGitInstalled from "./checkGitInstalled";
import cloneFromTemplate from "./cloneFromTemplate";
import removeGitDir from "./removeGitDir";
import initGit from "./initGit";
import addAllFilesToGit from "./addAllFilesToGit";

export const create = new Command("create");

create
  .description("Create a new integration repo from template and clone it")
  .argument("<name>", "Name of project")
  .action(async (name) => {
    await checkGitInstalled();
    await checkLocalDirectoryAvailable(name);
    await cloneFromTemplate(name);
    await removeGitDir(name);
    await initGit(name);
    await addAllFilesToGit(name);
  });
