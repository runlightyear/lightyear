#!/usr/bin/env node
import { program } from "commander";
import * as dotenv from "dotenv";
import packageJson from "../package.json";
import { setLogDisplayLevel } from "./shared/setLogDisplayLevel";
import { create } from "./commands/create";
// TODO: Migrate these commands to ink
// import { login, signup } from "./commands/login";
// import { dev } from "./commands/dev";
// import { deploy } from "./commands/deploy";
import { prepareConsole } from "./logging";
import { largeLogo } from "./largeLogo";
import { build } from "./commands/build-command";
import { test } from "./commands/test";

dotenv.config();

prepareConsole();

program
  .name("lightyear")
  .description("Lightyear CLI")
  .version(packageJson.version)
  .addCommand(create)
  // TODO: Re-enable after migrating to ink
  // .addCommand(signup)
  // .addCommand(login)
  .addCommand(build)
  // .addCommand(dev)
  // .addCommand(deploy)
  .addCommand(test)
  .option("-d, --debug", "output extra debugging")
  .addHelpText("beforeAll", largeLogo);

async function main() {
  const options = program.opts();
  if (options.debug) {
    setLogDisplayLevel("DEBUG");
    prepareConsole();
  }
  await program.parseAsync();
}
main();
