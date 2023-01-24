import { program } from "commander";
import execa from "execa";

export default async function removeGitDir(projectName: string) {
  console.debug("Removing .git dir");

  try {
    await execa("rm", [`-rf`, `.git`], {
      cwd: projectName,
    });
    console.debug("Successfully removed .git dir");
  } catch (error) {
    console.log(error);
    program.error("Error removing .git dir");
  }
}
