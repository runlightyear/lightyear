import fs from "fs";
import path from "path";
import os from "os";

/**
 * Read the API key from the config file
 * Returns undefined if not found
 */
function getApiKeyFromConfig(): string | undefined {
  try {
    const homeDir = os.homedir();
    const configPath = path.join(homeDir, ".lightyear", ".lightyear.yaml");
    
    if (!fs.existsSync(configPath)) {
      return undefined;
    }

    const fileContents = fs.readFileSync(configPath, "utf8");
    
    // Simple YAML parsing for apiKey field
    // This avoids requiring js-yaml in the lightyear package
    const apiKeyMatch = fileContents.match(/^apiKey:\s*(.+)$/m);
    if (apiKeyMatch && apiKeyMatch[1]) {
      return apiKeyMatch[1].trim();
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
export function getApiKey() {
  // First try to get from config file
  const configApiKey = getApiKeyFromConfig();
  if (configApiKey) {
    return configApiKey;
  }
  
  // Fall back to environment variables for backward compatibility
  return process.env.LIGHTYEAR_API_KEY || process.env.API_KEY;
}
