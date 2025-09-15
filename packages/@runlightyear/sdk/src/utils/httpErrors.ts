/**
 * HTTP error categorization
 *
 * Temporary errors are generally safe to retry (often with backoff):
 * - 408 Request Timeout
 * - 425 Too Early
 * - 429 Too Many Requests
 * - 423 Locked (used for delta locking)
 * - 5xx Server Errors (500..599)
 *
 * Permanent errors should not be retried without changing the request:
 * - All other 4xx, including 400, 401, 403, 404, 405, 406, 409, 410, 411, 412,
 *   413, 414, 415, 416, 417, 422, 426, 428, 431, 451
 */

export type HttpErrorCategory = "temporary" | "permanent";

export function categorizeHttpStatus(
  status: number | undefined | null
): HttpErrorCategory {
  if (!status || status < 400) return "permanent"; // treat unknown/non-error as non-retriable by default

  // 5xx → temporary
  if (status >= 500 && status <= 599) return "temporary";

  // Specific 4xx considered temporary
  if (status === 408) return "temporary"; // Request Timeout
  if (status === 425) return "temporary"; // Too Early
  if (status === 429) return "temporary"; // Too Many Requests (rate limit)
  if (status === 423) return "temporary"; // Locked (transient lock)

  // Everything else in 4xx is permanent
  if (status >= 400 && status <= 499) return "permanent";

  // Fallback (shouldn't be reached)
  return "permanent";
}

export function isTemporaryHttpError(
  status: number | undefined | null
): boolean {
  return categorizeHttpStatus(status) === "temporary";
}

export function isPermanentHttpError(
  status: number | undefined | null
): boolean {
  return categorizeHttpStatus(status) === "permanent";
}
