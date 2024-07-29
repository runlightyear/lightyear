import { program } from "commander";
import fs from "fs";
import * as path from "path";

export async function removeDirectory() {
  console.debug("Removing directory");

  const directory = path.join("node_modules", ".lightyear");

  try {
    fs.rmSync(directory, { recursive: true, force: true });
    console.debug(`Successfully removed directory: ${directory}`);
  } catch (error) {
    console.log(error);
    program.error(`Error removing directory: ${directory}`);
  }
}
