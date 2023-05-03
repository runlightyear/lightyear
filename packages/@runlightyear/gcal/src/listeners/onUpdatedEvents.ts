import { EventType } from "../types/EventType";
import { DateTime } from "../types/DateTime";
import {
  dayjsUtc,
  defineAction,
  RunFuncProps,
  setVariable,
  SKIPPED,
} from "@runlightyear/lightyear";
import {
  ActionTrigger,
  AppName,
} from "@runlightyear/lightyear/src/base/action";
import { GoogleCalendar } from "../GoogleCalendar";
import { EventResource } from "../types/EventResource";

export interface OnUpdatedEventsRunFuncProps extends RunFuncProps {
  data: Array<EventResource>;
}

export type OnUpdatedEventsRunFunc = (
  props: OnUpdatedEventsRunFuncProps
) => void;

export interface OnUpdatedEventsProps {
  name: string;
  title: string;
  trigger?: ActionTrigger;
  customAppName?: string;
  authName?: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: OnUpdatedEventsRunFunc;

  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   *
   * Default is "primary"
   */
  calendarId?: "primary" | string;

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
   * Whether to include hidden invitations in the result. Optional. The default is False.
   */
  showHiddenInvitations?: boolean;

  /**
   * Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False.
   */
  singleEvents?: boolean;

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
}

export const onUpdatedEvents = (props: OnUpdatedEventsProps) => {
  const {
    name,
    title,
    trigger,
    customAppName,
    authName = "gcal",
    apps = [],
    customApps = [],
    variables = [],
    secrets = [],
    run,
    calendarId = "primary",
    eventTypes,
    iCalUID,
    maxAttendees,
    maxResults,
    pageToken,
    privateExtendedProperty,
    q,
    sharedExtendedProperty,
    showHiddenInvitations,
    singleEvents,
    timeMax,
    timeMin,
    timeZone,
  } = props;

  const combinedApps: AppName[] = customAppName ? apps : ["gcal", ...apps];
  const combinedCustomApps = customAppName
    ? [customAppName, ...customApps]
    : customApps;

  return defineAction({
    name,
    title,
    apps: combinedApps,
    customApps: combinedCustomApps,
    variables: [...variables, "updatedMin"],
    secrets,
    trigger,
    run: async (runProps) => {
      const { auths, variables } = runProps;

      const gcal = new GoogleCalendar({ auth: auths[authName] });

      const updatedMin = variables.updatedMin || dayjsUtc().toISOString();

      const response = await gcal.listEvents({
        calendarId,
        eventTypes,
        iCalUID,
        maxAttendees,
        maxResults,
        orderBy: "updated",
        pageToken,
        privateExtendedProperty,
        q,
        sharedExtendedProperty,
        showHiddenInvitations,
        singleEvents,
        timeMin,
        timeMax,
        timeZone,
        updatedMin,
      });

      console.debug("listEvents response", response);

      // Filter out the last time returned from the previous call since Google doesn't do this for us.
      const events = response.data.items.filter(
        (event) => event.updated !== updatedMin
      );

      if (events.length > 0) {
        console.info(`Found ${events.length} updated events`);

        await run({ ...runProps, data: events });

        const lastEvent = events[events.length - 1];

        await setVariable("updatedMin", lastEvent.updated);
      } else {
        if (!variables.updatedMin) {
          console.info("Initializing updatedMin variable");
          await setVariable("updatedMin", updatedMin);
        }

        console.info("Found no updated events, skipping");
        throw SKIPPED;
      }
    },
  });
};
