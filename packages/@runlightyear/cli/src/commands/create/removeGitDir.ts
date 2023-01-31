import { program } from "commander";
import fs from "fs";
import * as path from "path";

export default async function removeGitDir(projectName: string) {
  console.debug("Removing .git dir");

  try {
    fs.rmdirSync(path.join(projectName, ".git"), { recursive: true });
    console.debug("Successfully removed .git dir");
  } catch (error) {
    console.log(error);
    program.error("Error removing .git dir");
  }
}
