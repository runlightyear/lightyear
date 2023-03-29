import { EventType } from "../types/EventType";
import { DateTime } from "../types/DateTime";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { EventList } from "../types/EventList";
import { GoogleCalendar } from "../GoogleCalendar";

export interface ListEventsProps {
  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  calendarId: "primary" | string;

  /**
   * Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).
   *
   * @deprecated
   */
  alwaysIncludeEmail?: boolean;

  /**
   * Event types to return. Optional. The default is ["default", "outOfOffice", "focusTime"]. Only the default value is available, unless you're enrolled in the Working Locations developer preview.
   *   Developer Preview?: Available as part of the Google Workspace Developer Preview Program, which grants early access to certain features.
   */
  eventTypes?: Array<EventType>;

  /**
   * Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID.
   */
  iCalUID?: string;

  /**
   * 	The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.
   */
  maxAttendees?: number;

  /**
   * Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events.
   */
  maxResults?: number;

  /**
   * The order of the events returned in the result. Optional. The default is an unspecified, stable order.
   *
   * Acceptable values are?:
   * "startTime"?: Order by the start date/time (ascending). This is only available when querying single events (i.e. the parameter singleEvents is True)
   * "updated"?: Order by last modification time (ascending).
   */
  orderBy?: "startTime" | "updated";

  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;

  /**
   * Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints.
   */
  privateExtendedProperty?: string;

  /**
   * Free text search terms to find events that match these terms in the following fields?: summary, description, location, attendee's displayName, attendee's email. Optional.
   */
  q?: string;

  /**
   * Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints.
   */
  sharedExtendedProperty?: string;

  /**
   * Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False.
   */
  showDeleted?: boolean;

  /**
   * Whether to include hidden invitations in the result. Optional. The default is False.
   */
  showHiddenInvitations?: boolean;

  /**
   * Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False.
   */
  singleEvents?: boolean;

  /**
   * Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.
   *   There are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state.
   *
   *   These are?:
   *     iCalUID
   *     orderBy
   *     privateExtendedProperty
   *     q
   *     sharedExtendedProperty
   *     timeMin
   *     timeMax
   *     updatedMin
   *
   *   If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.
   *   Learn more about incremental synchronization.
   *   Optional. The default is to return all entries.
   */
  syncToken?: string;

  /**
   * Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10?:00?:00-07?:00, 2011-06-03T10?:00?:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.
   */
  timeMax?: DateTime;

  /**
   * Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10?:00?:00-07?:00, 2011-06-03T10?:00?:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.
   */
  timeMin?: DateTime;

  /**
   * Time zone used in the response. Optional. The default is the time zone of the calendar.
   */
  timeZone?: string;

  /**
   * Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time.
   */
  updatedMin?: DateTime;
}

export interface ListEventsResponse extends HttpProxyResponse {
  data: EventList;
}

export const listEvents =
  (self: GoogleCalendar) =>
  async (props: ListEventsProps): Promise<ListEventsResponse> => {
    const {
      calendarId,
      alwaysIncludeEmail,
      eventTypes,
      iCalUID,
      maxAttendees,
      maxResults,
      orderBy,
      pageToken,
      privateExtendedProperty,
      q,
      sharedExtendedProperty,
      showDeleted,
      showHiddenInvitations,
      singleEvents,
      syncToken,
      timeMax,
      timeMin,
      timeZone,
      updatedMin,
    } = props;

    return await self.get({
      url: `/calendars/${calendarId}/events`,
      params: {
        alwaysIncludeEmail,
        eventTypes,
        iCalUID,
        maxAttendees,
        maxResults,
        orderBy,
        pageToken,
        privateExtendedProperty,
        q,
        sharedExtendedProperty,
        showDeleted,
        showHiddenInvitations,
        singleEvents,
        syncToken,
        timeMax,
        timeMin,
        timeZone,
        updatedMin,
      },
    });
  };
