import { program } from "commander";
import fs from "fs";
import { ServerResponse } from "http";
import chalk from "chalk";

export default async function writeEnvFile(
  {
    LIGHTYEAR_API_KEY,
    baseUrl,
  }: { LIGHTYEAR_API_KEY: string; baseUrl: string },
  res: ServerResponse
) {
  try {
    fs.writeFileSync(
      ".env",
      `LIGHTYEAR_API_KEY=${LIGHTYEAR_API_KEY}\n` +
        (baseUrl !== "https://app.runlightyear.com"
          ? `BASE_URL=${baseUrl}\n`
          : "")
    );
    res.setHeader("location", `${baseUrl}/cli-login/succeeded`);
    res.end();
    console.log(
      chalk.green("Login successful, wrote credentials to .env file")
    );
  } catch (error) {
    res.setHeader("location", `${baseUrl}/cli-login/failed`);
    res.end();
    program.error("Failed to write .env file" + error);
  }
}
