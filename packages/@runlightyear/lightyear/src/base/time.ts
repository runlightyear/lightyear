const TIME_LIMIT_MS = 1000 * 60 * 1;

export function setStartTime() {
  globalThis.startTimeMs = Date.now();
}

export function isTimeLimitExceeded() {
  const result = Date.now() - globalThis.startTimeMs > TIME_LIMIT_MS;
  if (result) {
    console.info("Time limit exceeded");
  }
  return result;
}
