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
  .addCommand(run);

async function main() {
  await program.parseAsync();
}
main();
