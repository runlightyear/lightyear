/**
 * Get the environment name from environment variable
 * Defaults to "dev" if not set
 */
export function getEnvName(): string {
  return process.env.ENV_NAME || "dev";
}
