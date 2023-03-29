import { Etag } from "./Etag";
import { CalendarListEntry } from "./CalendarListEntry";

export interface CalendarList {
  kind: "calendar#calendarList";
  etag: Etag;
  nextPageToken: string;
  nextSyncToken: string;
  items: Array<CalendarListEntry>;
}
