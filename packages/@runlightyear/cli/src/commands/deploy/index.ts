import { Command, program } from "commander";
import deployToDev from "./deployToDev";
import deployToProd from "./deployToProd";

export const deploy = new Command("deploy");

deploy
  .description("Deploy the integrations")
  .argument("<env>", "Environment (either 'dev' or 'prod')")
  .action(async (env) => {
    if (env === "dev") {
      await deployToDev();
    } else if (env === "prod") {
      await deployToProd();
    } else {
      program.error(`Unknown env: ${env}. Should be either 'dev' or 'prod'.`);
    }
  });
