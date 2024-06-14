import { program } from "commander";
import fs from "fs";
import * as path from "path";

export async function initializeDirectory() {
  console.debug("Initializing directory");

  const directory = path.join("node_modules", ".lightyear");

  try {
    fs.mkdirSync(directory, { recursive: true });
    console.debug(`Successfully initialized directory: ${directory}`);
  } catch (error) {
    console.log(error);
    program.error(`Error initializing directory: ${directory}`);
  }
}
