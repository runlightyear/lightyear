export function getApiKey() {
  return process.env.LIGHTYEAR_API_KEY || process.env.API_KEY;
}
