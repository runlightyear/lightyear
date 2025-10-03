import fs from "fs";
import path from "path";
import os from "os";
import yaml from "js-yaml";

export interface LightyearConfig {
  apiKey?: string;
  baseUrl?: string;
}

/**
 * Get the config directory path based on the operating system
 * - macOS/Linux: ~/.lightyear
 * - Windows: %USERPROFILE%/.lightyear
 */
export function getConfigDir(): string {
  const homeDir = os.homedir();
  return path.join(homeDir, ".lightyear");
}

/**
 * Get the full path to the config file
 */
export function getConfigFilePath(): string {
  return path.join(getConfigDir(), ".lightyear.yaml");
}

/**
 * Ensure the config directory exists
 */
export function ensureConfigDir(): void {
  const configDir = getConfigDir();
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
}

/**
 * Read the config file
 * Returns an empty object if the file doesn't exist
 */
export function readConfig(): LightyearConfig {
  const configPath = getConfigFilePath();

  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    const fileContents = fs.readFileSync(configPath, "utf8");
    const config = yaml.load(fileContents) as LightyearConfig;
    return config || {};
  } catch (error) {
    console.error(`Failed to read config file: ${error}`);
    return {};
  }
}

/**
 * Write the config file
 */
export function writeConfig(config: LightyearConfig): void {
  ensureConfigDir();
  const configPath = getConfigFilePath();

  try {
    const yamlContent = yaml.dump(config);
    fs.writeFileSync(configPath, yamlContent, "utf8");
  } catch (error) {
    throw new Error(`Failed to write config file: ${error}`);
  }
}

/**
 * Get the API key from the config file
 * Returns undefined if not found
 */
export function getApiKeyFromConfig(): string | undefined {
  const config = readConfig();
  return config.apiKey;
}

/**
 * Get the base URL from the config file
 * Returns undefined if not found
 */
export function getBaseUrlFromConfig(): string | undefined {
  const config = readConfig();
  return config.baseUrl;
}

/**
 * Check if the user is authenticated (has an API key)
 */
export function isAuthenticated(): boolean {
  return !!getApiKeyFromConfig();
}
