import { Command, program } from "commander";
import deployToProd from "./deployToProd";

export const deploy = new Command("deploy");

deploy
  .description("Deploy the integrations to an env (only prod for now)")
  .argument("<env>", "Environment (only 'prod' for now)")
  .action(async (env) => {
    // if (env === "dev") {
    //   await deployToDev();
    // } else if (env === "prod") {
    if (env === "prod") {
      await deployToProd();
    } else {
      program.error(`Unknown env: ${env}. Should be 'prod'.`);
    }
  });
