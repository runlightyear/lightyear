import { program } from "commander";
import execa from "execa";
import * as path from "path";

export async function compileTypescript() {
  console.debug("Compiling typescript");

  try {
    await execa(
      "tsc",
      [path.join("node_modules", ".lightyear", "index.ts"), "--declaration"],
      {
        // cwd: path.join("node_modules", ".lightyear"),
      }
    );

    console.debug("Successfully compiled typescript");
  } catch (error) {
    console.log(error);
    program.error("Error compiling typescript");
  }
}
