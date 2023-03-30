import { Etag } from "./Etag";
import { DateTime } from "./DateTime";

export interface EventList {
  kind: "calendar#events";
  etag: Etag;
  summary: string;
  description: string;
  updated: DateTime;
  timeZone: string;
  accessRole: string;
  defaultReminders: [
    {
      method: string;
      minutes: number;
    }
  ];
  nextPageToken: string;
  nextSyncToken: string;
  items: Array<Event>;
}
