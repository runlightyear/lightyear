import { program } from "commander";
import fs from "fs";
import { ServerResponse } from "http";

export default async function writeEnvFile(
  {
    ENV_NAME,
    BASE_URL,
    API_KEY,
  }: { ENV_NAME: string; BASE_URL: string; API_KEY: string },
  res: ServerResponse
) {
  try {
    fs.writeFileSync(
      ".env",
      `ENV_NAME=${ENV_NAME}
BASE_URL=${BASE_URL}
API_KEY=${API_KEY}
`
    );
    res.setHeader("location", `${BASE_URL}/cli-login/succeeded`);
    res.end();
    console.log("Login successful, wrote .env file");
  } catch (error) {
    res.setHeader("location", `${BASE_URL}/cli-login/failed`);
    res.end();
    program.error("Failed to write .env file" + error);
  }
}
