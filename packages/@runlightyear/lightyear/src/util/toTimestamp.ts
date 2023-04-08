import { dayjsUtc } from "./dayjsUtc";

/**
 * @internal
 *
 * @param dateTime
 */
export default function toTimestamp(dateTime: any) {
  return dayjsUtc(dateTime).utc().valueOf();
}
