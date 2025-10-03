import fs from "fs";
import path from "path";
import os from "os";

/**
 * Read the base URL from the config file
 * Returns undefined if not found
 */
function getBaseUrlFromConfig(): string | undefined {
  try {
    const homeDir = os.homedir();
    const configPath = path.join(homeDir, ".lightyear", ".lightyear.yaml");

    if (!fs.existsSync(configPath)) {
      return undefined;
    }

    const fileContents = fs.readFileSync(configPath, "utf8");

    // Simple YAML parsing for baseUrl field
    const baseUrlMatch = fileContents.match(/^baseUrl:\s*(.+)$/m);
    if (baseUrlMatch && baseUrlMatch[1]) {
      return baseUrlMatch[1].trim();
    }

    return undefined;
  } catch (error) {
    // If there's any error reading the config, fall back to env vars
    return undefined;
  }
}

/**
 * @internal
 */
export function getBaseUrl() {
  // First try to get from config file
  const configBaseUrl = getBaseUrlFromConfig();
  if (configBaseUrl) {
    return configBaseUrl;
  }

  // Fall back to environment variables for backward compatibility
  return process.env.BASE_URL || "https://app.runlightyear.com";
}
