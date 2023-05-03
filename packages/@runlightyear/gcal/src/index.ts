import { GoogleCalendar } from "./GoogleCalendar";
import type { GoogleCalendarProps } from "./GoogleCalendar";

import { GoogleCalendarOAuth } from "./GoogleCalendarOAuth";
import type { GoogleCalendarOAuthProps } from "./GoogleCalendarOAuth";

/** Calendars **/

import type {
  CreateCalendarProps,
  CreateCalendarResponse,
} from "./calendars/createCalendar";

import type {
  ListCalendarsProps,
  ListCalendarsResponse,
} from "./calendars/listCalendars";

/** Events **/

import type {
  CreateEventProps,
  CreateEventResponse,
} from "./events/createEvent";
export type {
  OnUpdatedEventsProps,
  OnUpdatedEventsRunFunc,
  OnUpdatedEventsRunFuncProps,
} from "./listeners/onUpdatedEvents";
import type {
  DeleteEventProps,
  DeleteEventResponse,
} from "./events/deleteEvent";
import type { ListEventsProps, ListEventsResponse } from "./events/listEvents";
import type {
  UpdateEventProps,
  UpdateEventResponse,
} from "./events/updateEvent";

/** Types **/

import type { AccessRole } from "./types/AccessRole";
import type { Attachment } from "./types/Attachment";
import type { Attendee } from "./types/Attendee";
import type { Calendar } from "./types/Calendar";
import type { CalendarList } from "./types/CalendarList";
import type { CalendarListEntry } from "./types/CalendarListEntry";
import type { ConferenceProperties } from "./types/ConferenceProperties";
import type { ConferenceSolutionType } from "./types/ConferenceSolutionType";
import type { DateType } from "./types/DateType";
import type { DateTime } from "./types/DateTime";
import type { Etag } from "./types/Etag";
import type { EventResource } from "./types/EventResource";
import type { EventList } from "./types/EventList";
import type { EventTime } from "./types/EventTime";
import type { EventTransparency } from "./types/EventTransparency";
import type { EventType } from "./types/EventType";
import type { EventVisibility } from "./types/EventVisibility";
import type { ExtendedProperties } from "./types/ExtendedProperties";
import type { Gadget } from "./types/Gadget";
import type { ID } from "./types/ID";
import type { RecurrenceRules } from "./types/RecurrenceRules";
import type { ReminderOverride } from "./types/ReminderOverride";
import type { Reminders } from "./types/Reminders";
import type { Source } from "./types/Source";
import type { Status } from "./types/Status";

export { GoogleCalendar, GoogleCalendarOAuth };
export type {
  GoogleCalendarOAuthProps,
  GoogleCalendarProps,
  CreateCalendarProps,
  CreateCalendarResponse,
  ListCalendarsProps,
  ListCalendarsResponse,
  CreateEventProps,
  CreateEventResponse,
  DeleteEventProps,
  DeleteEventResponse,
  UpdateEventProps,
  UpdateEventResponse,
  ListEventsProps,
  ListEventsResponse,
  AccessRole,
  Attachment,
  Attendee,
  Calendar,
  CalendarList,
  CalendarListEntry,
  ConferenceProperties,
  ConferenceSolutionType,
  DateType,
  DateTime,
  Etag,
  EventResource,
  EventList,
  EventTime,
  EventTransparency,
  EventType,
  EventVisibility,
  ExtendedProperties,
  Gadget,
  ID,
  RecurrenceRules,
  ReminderOverride,
  Reminders,
  Source,
  Status,
};
