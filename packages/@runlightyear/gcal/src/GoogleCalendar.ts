import { RestConnector, RestConnectorProps } from "@runlightyear/lightyear";
import { listCalendars, ListCalendarsProps } from "./calendars/listCalendars";
import { listEvents, ListEventsProps } from "./events/listEvents";
import { createEvent, CreateEventProps } from "./events/createEvent";
import {
  createCalendar,
  CreateCalendarProps,
} from "./calendars/createCalendar";
import { deleteEvent, DeleteEventProps } from "./events/deleteEvent";
import { updateEvent, UpdateEventProps } from "./events/updateEvent";
import { watchEvents, WatchEventsProps } from "./notifications/watchEvents";
import { stopChannel, StopChannelProps } from "./notifications/stopChannel";
import {
  defineEventsWebhook,
  DefineEventsWebhookProps,
} from "./events/defineEventsWebhook";
import {
  onNewAndUpdatedEvents,
  OnNewAndUpdatedEventsProps,
} from "./listeners/onNewAndUpdatedEvents";
import { patchEvent, PatchEventProps } from "./events/patchEvent";
import { getEvent, GetEventProps } from "./events/getEvent";
import { onNewEvents, OnNewEventsProps } from "./listeners/onNewEvents";

/**
 * @beta
 */
export interface GoogleCalendarProps extends RestConnectorProps {}

/**
 * Google Calendar connector
 *
 * @beta
 *
 * @example Create an event
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * function addHours(date: Date, hours: number) {
 *   return new Date(date.getTime() + hours * 60 * 60 * 1000);
 * }
 *
 * defineAction({
 *   name: "createEvent",
 *   title: "Create Event",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "summary"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const response = await gcal.createEvent({
 *       calendarId: variables.calendarId || "primary",
 *       event: {
 *         summary: variables.summary!,
 *         start: {
 *           dateTime: addHours(new Date(), 1).toISOString(),
 *         },
 *         end: {
 *           dateTime: addHours(new Date(), 2).toISOString(),
 *         },
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Create an event with attendees
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * function addHours(date: Date, hours: number) {
 *   return new Date(date.getTime() + hours * 60 * 60 * 1000);
 * }
 *
 * defineAction({
 *   name: "createEventWithAttendees",
 *   title: "Create Event with Attendees",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "summary", "attendees"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const attendees = variables.attendees!.split(",");
 *
 *     const response = await gcal.createEvent({
 *       calendarId: variables.calendarId || "primary",
 *       event: {
 *         summary: variables.summary!,
 *         start: {
 *           dateTime: addHours(new Date(), 1).toISOString(),
 *         },
 *         end: {
 *           dateTime: addHours(new Date(), 2).toISOString(),
 *         },
 *         attendees: attendees.map((email) => ({
 *           email,
 *         })),
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Create an all-day event
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * function tomorrow() {
 *   const date = new Date();
 *   date.setDate(date.getDate() + 1);
 *   return date.toISOString().split("T")[0];
 * }
 *
 * defineAction({
 *   name: "createAllDayEvent",
 *   title: "Create All Day Event",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "summary"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const response = await gcal.createEvent({
 *       calendarId: variables.calendarId || "primary",
 *       event: {
 *         summary: variables.summary!,
 *         start: {
 *           date: tomorrow(),
 *         },
 *         end: {
 *           date: tomorrow(),
 *         },
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example List upcoming events
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * function addDays(date: Date, days: number) {
 *   return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
 * }
 *
 * defineAction({
 *   name: "listUpcomingEvents",
 *   title: "List Upcoming Events",
 *   apps: ["gcal"],
 *   variables: ["calendarId?"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const response = await gcal.listEvents({
 *       calendarId: variables.calendarId || "primary",
 *       timeMin: new Date().toISOString(),
 *       timeMax: addDays(new Date(), 2).toISOString(),
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Get an event
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * defineAction({
 *   name: "getEvent",
 *   title: "Get Event",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "eventId"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const response = await gcal.getEvent({
 *       calendarId: variables.calendarId || "primary",
 *       eventId: variables.eventId!,
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Patch event summary
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * defineAction({
 *   name: "patchEventSummary",
 *   title: "Patch Event Summary",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "eventId", "summary"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const response = await gcal.patchEvent({
 *       calendarId: variables.calendarId || "primary",
 *       eventId: variables.eventId!,
 *       event: {
 *         summary: variables.summary!,
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Patch event attendees
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * defineAction({
 *   name: "addEventAttendee",
 *   title: "Add Event Attendee",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "eventId", "attendee"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const getEventResponse = await gcal.getEvent({
 *       calendarId: variables.calendarId || "primary",
 *       eventId: variables.eventId!,
 *     });
 *
 *     const event = getEventResponse.data;
 *
 *     const response = await gcal.patchEvent({
 *       calendarId: variables.calendarId || "primary",
 *       eventId: variables.eventId!,
 *       event: {
 *         attendees: [...event.attendees, { email: variables.attendee! }],
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Update event
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * function addHours(date: Date, hours: number) {
 *   return new Date(date.getTime() + hours * 60 * 60 * 1000);
 * }
 *
 * defineAction({
 *   name: "updateEvent",
 *   title: "Update Event",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "eventId", "summary"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const response = await gcal.updateEvent({
 *       calendarId: variables.calendarId || "primary",
 *       eventId: variables.eventId!,
 *       event: {
 *         summary: variables.summary!,
 *         start: {
 *           dateTime: addHours(new Date(), 2).toISOString(),
 *         },
 *         end: {
 *           dateTime: addHours(new Date(), 3).toISOString(),
 *         },
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Delete event
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * defineAction({
 *   name: "deleteEvent",
 *   title: "Delete Event",
 *   apps: ["gcal"],
 *   variables: ["calendarId?", "eventId"],
 *   run: async ({ auths, variables }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *
 *     const response = await gcal.deleteEvent({
 *       calendarId: variables.calendarId || "primary",
 *       eventId: variables.eventId!,
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example On new events
 * ```typescript
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * GoogleCalendar.onNewEvents({
 *   name: "onNewEvents",
 *   title: "On New Events",
 *   run: async ({ data }) => {
 *     console.info("New events", data);
 *   },
 * });
 * ```
 *
 * @example On new and updated events
 * ```typescript
 * import { GoogleCalendar } from "@runlightyear/gcal";
 *
 * GoogleCalendar.onNewAndUpdatedEvents({
 *   name: "onNewAndUpdatedEvents",
 *   title: "On New and Updated Events",
 *   run: async ({ data }) => {
 *     console.info("New and updated events", data);
 *   },
 * });
 * ```
 *
 */
export class GoogleCalendar extends RestConnector {
  constructor(props: GoogleCalendarProps) {
    super(props);
  }

  getBaseUrl(): string {
    return "https://www.googleapis.com/calendar/v3";
  }

  getDefaultHeaders() {
    const { accessToken } = this.getAuthData();

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  /**
   * Returns the calendars on the user's calendar list.
   *
   * @group Calendar
   *
   * @param props
   */
  async listCalendars(props?: ListCalendarsProps) {
    return listCalendars(this)(props);
  }

  /**
   * Creates a secondary calendar.
   *
   * @group Calendar
   *
   * @param props
   */
  async createCalendar(props: CreateCalendarProps) {
    return createCalendar(this)(props);
  }

  /**
   * Returns events on the specified calendar.
   *
   * @group Event
   *
   * @example List upcoming events
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * function addDays(date: Date, days: number) {
   *   return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
   * }
   *
   * defineAction({
   *   name: "listUpcomingEvents",
   *   title: "List Upcoming Events",
   *   apps: ["gcal"],
   *   variables: ["calendarId?"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const response = await gcal.listEvents({
   *       calendarId: variables.calendarId || "primary",
   *       timeMin: new Date().toISOString(),
   *       timeMax: addDays(new Date(), 2).toISOString(),
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async listEvents(props: ListEventsProps) {
    return listEvents(this)(props);
  }

  /**
   * Creates an event.
   *
   * @group Event
   *
   * @example Create an event
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * function addHours(date: Date, hours: number) {
   *   return new Date(date.getTime() + hours * 60 * 60 * 1000);
   * }
   *
   * defineAction({
   *   name: "createEvent",
   *   title: "Create Event",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "summary"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const response = await gcal.createEvent({
   *       calendarId: variables.calendarId || "primary",
   *       event: {
   *         summary: variables.summary!,
   *         start: {
   *           dateTime: addHours(new Date(), 1).toISOString(),
   *         },
   *         end: {
   *           dateTime: addHours(new Date(), 2).toISOString(),
   *         },
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Create an event with attendees
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * function addHours(date: Date, hours: number) {
   *   return new Date(date.getTime() + hours * 60 * 60 * 1000);
   * }
   *
   * defineAction({
   *   name: "createEventWithAttendees",
   *   title: "Create Event with Attendees",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "summary", "attendees"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const attendees = variables.attendees!.split(",");
   *
   *     const response = await gcal.createEvent({
   *       calendarId: variables.calendarId || "primary",
   *       event: {
   *         summary: variables.summary!,
   *         start: {
   *           dateTime: addHours(new Date(), 1).toISOString(),
   *         },
   *         end: {
   *           dateTime: addHours(new Date(), 2).toISOString(),
   *         },
   *         attendees: attendees.map((email) => ({
   *           email,
   *         })),
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Create an all-day event
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * function tomorrow() {
   *   const date = new Date();
   *   date.setDate(date.getDate() + 1);
   *   return date.toISOString().split("T")[0];
   * }
   *
   * defineAction({
   *   name: "createAllDayEvent",
   *   title: "Create All Day Event",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "summary"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const response = await gcal.createEvent({
   *       calendarId: variables.calendarId || "primary",
   *       event: {
   *         summary: variables.summary!,
   *         start: {
   *           date: tomorrow(),
   *         },
   *         end: {
   *           date: tomorrow(),
   *         },
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async createEvent(props: CreateEventProps) {
    return createEvent(this)(props);
  }

  /**
   * Get an event.
   *
   * @group Event
   *
   * @example Get an event
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * defineAction({
   *   name: "getEvent",
   *   title: "Get Event",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "eventId"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const response = await gcal.getEvent({
   *       calendarId: variables.calendarId || "primary",
   *       eventId: variables.eventId!,
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   */
  async getEvent(props: GetEventProps) {
    return getEvent(this)(props);
  }

  /**
   * Updates an event. This method does not support patch semantics and always updates the entire event resource. To do a partial update, perform a get followed by an update using etags to ensure atomicity.
   *
   * @group Event
   *
   * @example Update event
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * function addHours(date: Date, hours: number) {
   *   return new Date(date.getTime() + hours * 60 * 60 * 1000);
   * }
   *
   * defineAction({
   *   name: "updateEvent",
   *   title: "Update Event",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "eventId", "summary"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const response = await gcal.updateEvent({
   *       calendarId: variables.calendarId || "primary",
   *       eventId: variables.eventId!,
   *       event: {
   *         summary: variables.summary!,
   *         start: {
   *           dateTime: addHours(new Date(), 2).toISOString(),
   *         },
   *         end: {
   *           dateTime: addHours(new Date(), 3).toISOString(),
   *         },
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async updateEvent(props: UpdateEventProps) {
    return updateEvent(this)(props);
  }

  /**
   * Patch an event.
   *
   * @group Event
   *
   * @example Patch event summary
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * defineAction({
   *   name: "patchEventSummary",
   *   title: "Patch Event Summary",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "eventId", "summary"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const response = await gcal.patchEvent({
   *       calendarId: variables.calendarId || "primary",
   *       eventId: variables.eventId!,
   *       event: {
   *         summary: variables.summary!,
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Patch event attendees
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * defineAction({
   *   name: "patchEventAttendees",
   *   title: "Patch Event Attendees",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "eventId", "attendees"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const attendees = variables.attendees!.split(",");
   *
   *     const response = await gcal.patchEvent({
   *       calendarId: variables.calendarId || "primary",
   *       eventId: variables.eventId!,
   *       event: {
   *         attendees: attendees.map((email) => ({ email })),
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Add event attendee
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * defineAction({
   *   name: "addEventAttendee",
   *   title: "Add Event Attendee",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "eventId", "attendee"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const getEventResponse = await gcal.getEvent({
   *       calendarId: variables.calendarId || "primary",
   *       eventId: variables.eventId!,
   *     });
   *
   *     const event = getEventResponse.data;
   *
   *     const response = await gcal.patchEvent({
   *       calendarId: variables.calendarId || "primary",
   *       eventId: variables.eventId!,
   *       event: {
   *         attendees: [...event.attendees, { email: variables.attendee! }],
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   */
  async patchEvent(props: PatchEventProps) {
    return patchEvent(this)(props);
  }

  /**
   * Deletes an event.
   *
   * @group Event
   *
   * @example Delete event
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * defineAction({
   *   name: "deleteEvent",
   *   title: "Delete Event",
   *   apps: ["gcal"],
   *   variables: ["calendarId?", "eventId"],
   *   run: async ({ auths, variables }) => {
   *     const gcal = new GoogleCalendar({
   *       auth: auths.gcal,
   *     });
   *
   *     const response = await gcal.deleteEvent({
   *       calendarId: variables.calendarId || "primary",
   *       eventId: variables.eventId!,
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async deleteEvent(props: DeleteEventProps) {
    return deleteEvent(this)(props);
  }

  /**
   * Watch for events.
   *
   * @group Notification
   */
  async watchEvents(props: WatchEventsProps) {
    return watchEvents(this)(props);
  }

  /**
   * Stop notification channel
   *
   * @group Notification
   */
  async stopChannel(props: StopChannelProps) {
    return stopChannel(this)(props);
  }

  /**
   * Low level interface to define an event webhook.
   *
   * @param props
   */
  static defineEventsWebhook(props: DefineEventsWebhookProps) {
    return defineEventsWebhook(props);
  }

  /**
   * On new events
   *
   * @group Listener
   *
   * @example On new events
   * ```typescript
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * GoogleCalendar.onNewEvents({
   *   name: "onNewEvents",
   *   title: "On New Events",
   *   run: async ({ data }) => {
   *     console.info("New events", data);
   *   },
   * });
   * ```
   *
   * @example On new events with matching title
   * ```typescript
   * import { GoogleCalendar } from "@runlightyear/gcal";
   * import { SKIPPED } from "@runlightyear/lightyear";
   *
   * GoogleCalendar.onNewEvents({
   *   name: "onNewMatchingEvents",
   *   title: "On New Matching Events",
   *   variables: [
   *     { name: "term", description: "Event title must contain this term" },
   *   ],
   *   run: async ({ data, variables }) => {
   *     const testEvents = data.filter((event) =>
   *       event.summary.includes(variables.term!)
   *     );
   *
   *     if (testEvents.length === 0) {
   *       throw SKIPPED;
   *     }
   *
   *     console.log(`New events matching ${variables.term!}:`, testEvents);
   *   },
   * });
   * ```
   */
  static onNewEvents(props: OnNewEventsProps) {
    return onNewEvents(props);
  }

  /**
   * On new and updated events
   *
   * @group Listener
   *
   * @example On new and updated events
   * ```typescript
   * import { GoogleCalendar } from "@runlightyear/gcal";
   *
   * GoogleCalendar.onNewAndUpdatedEvents({
   *   name: "onNewAndUpdatedEvents",
   *   title: "On New and Updated Events",
   *   run: async ({ data }) => {
   *     console.info("New and updated events", data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  static onNewAndUpdatedEvents(props: OnNewAndUpdatedEventsProps) {
    return onNewAndUpdatedEvents(props);
  }
}
