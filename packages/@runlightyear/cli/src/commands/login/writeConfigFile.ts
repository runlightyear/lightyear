import { program } from "commander";
import { ServerResponse } from "http";
import { terminal } from "terminal-kit";
import { writeConfig, getConfigFilePath } from "../../shared/configManager";

export default async function writeConfigFile(
  {
    LIGHTYEAR_API_KEY,
    baseUrl,
  }: { LIGHTYEAR_API_KEY: string; baseUrl: string },
  res: ServerResponse
) {
  try {
    const config: { apiKey: string; baseUrl?: string } = {
      apiKey: LIGHTYEAR_API_KEY,
    };

    // Only store baseUrl if it's not the default production URL
    if (baseUrl !== "https://app.runlightyear.com") {
      config.baseUrl = baseUrl;
    }

    writeConfig(config);

    res.setHeader("location", `${baseUrl}/cli-login/succeeded`);
    res.end();
    terminal(`Login successful, wrote credentials to ${getConfigFilePath()}\n`);
  } catch (error) {
    res.setHeader("location", `${baseUrl}/cli-login/failed`);
    res.end();
    program.error("Failed to write config file: " + error);
  }
}
