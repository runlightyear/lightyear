#!/usr/bin/env node
import { program } from "commander";
import * as dotenv from "dotenv";
import packageJson from "../package.json";
import { create } from "./commands/create";
import { login } from "./commands/login";
import { dev } from "./commands/dev";
import { deploy } from "./commands/deploy";
import { run } from "./commands/run";
import { test } from "./commands/test";
import { prepareConsole } from "./logging";
import { setLogDisplayLevel } from "./shared/setLogDisplayLevel";
import { terminal } from "terminal-kit";

dotenv.config();

prepareConsole();

program
  .name("lightyear")
  .description("Lightyear CLI")
  .version(packageJson.version)
  .addCommand(create)
  .addCommand(test)
  .addCommand(login)
  .addCommand(dev)
  .addCommand(deploy)
  .addCommand(run)
  .option("-d, --debug", "output extra debugging");

async function main() {
  await program.parseAsync();

  const options = program.opts();
  if (options.debug) {
    terminal("we are in debug mode");
    setLogDisplayLevel("DEBUG");
  }
}
main();
