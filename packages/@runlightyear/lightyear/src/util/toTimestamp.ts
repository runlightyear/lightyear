import dayjsUtc from "./dayjsUtc";

export default function toTimestamp(dateTime: any) {
  return dayjsUtc(dateTime).utc().valueOf();
}
