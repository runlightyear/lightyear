let startTimeMs: number | null = null;

export function resetTimeLimit(): void {
  startTimeMs = Date.now();
}

export function isTimeLimitExceeded(limitMs: number = 60000): boolean {
  if (startTimeMs == null) startTimeMs = Date.now();
  return Date.now() - startTimeMs > limitMs;
}
