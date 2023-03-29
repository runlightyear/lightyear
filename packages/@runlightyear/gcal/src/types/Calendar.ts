import { Etag } from "./Etag";
import { ConferenceProperties } from "./ConferenceProperties";

export interface Calendar {
  kind: "calendar#calendar";

  /**
   * ETag of the resource.
   */
  etag: Etag;

  /**
   * Identifier of the calendar.
   */
  id: string;

  /**
   * Title of the calendar.
   */
  summary: string;

  /**
   * Description of the calendar.
   */
  description: string;

  /**
   * Geographic location of the calendar as free-form text.
   */
  location?: string;

  /**
   * The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".)
   */
  timeZone?: string;

  /**
   * Conferencing properties for this calendar, for example what types of conferences are allowed.
   */
  conferenceProperties: ConferenceProperties;
}
